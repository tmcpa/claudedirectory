// Ingest skills from repos containing SKILL.md files.
//
// Strategy:
// 1. For each known repo, fetch the recursive git tree (one API call) to find
//    every path ending in `SKILL.md`.
// 2. Pull each SKILL.md content from `raw.githubusercontent.com` (not rate-limited
//    against the core 5000/hr quota).
// 3. Parse YAML frontmatter (`name`, `description`) and treat the rest as content.

import { gh, ghRepo, fetchText, slugify, dedupeBySlug, writeJson, log, truncate, deriveTags } from "./_lib.mjs";

// (repo, optional path-filter prefix, optional cap)
// path prefix lets us scope to a subdirectory (e.g. `skills/`) when the repo
// also contains unrelated SKILL.md-like files.
const SOURCES = [
  { repo: "anthropics/skills",                              prefix: "skills/",      cap: 100 },
  { repo: "alirezarezvani/claude-skills",                   prefix: null,           cap: 500 },
  { repo: "phuryn/pm-skills",                               prefix: null,           cap: 200 },
  { repo: "secondsky/claude-skills",                        prefix: null,           cap: 200 },
  { repo: "obra/superpowers",                               prefix: null,           cap: 100 },
  { repo: "jeremylongshore/claude-code-plugins-plus-skills", prefix: "skills/",     cap: 600 },
  { repo: "Houseofmvps/ultraship",                          prefix: null,           cap: 100 },
];

// Cap per-skill content to avoid 50KB+ markdown bodies.
const MAX_CONTENT_BYTES = 30_000;

// Concurrency for raw fetches.
const FETCH_CONCURRENCY = 10;

function parseFrontmatter(md) {
  const m = md.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    // Block scalars: `description: |` or `description: >`
    if (val === "|" || val === ">" || val === "|-" || val === ">-") {
      const folded = val[0] === ">";
      const buf = [];
      // Collect indented continuation lines.
      while (i + 1 < lines.length) {
        const next = lines[i + 1];
        if (next.length === 0) { buf.push(""); i++; continue; }
        const indent = next.match(/^(\s+)/);
        if (!indent) break;
        buf.push(next.slice(indent[1].length));
        i++;
      }
      val = folded ? buf.join(" ").replace(/\s+/g, " ").trim() : buf.join("\n").trim();
    } else if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[kv[1].toLowerCase()] = val;
  }
  return { fm, body: m[2] };
}

function listSkillPaths(repo, branch, prefix) {
  const tree = gh(["api", `repos/${repo}/git/trees/${branch}?recursive=1`], { allowFail: true });
  if (!tree?.tree) return [];
  return tree.tree
    .filter((n) => n.type === "blob" && n.path.endsWith("SKILL.md"))
    // mode 120000 = symlink; symlinked SKILL.md files contain only a path, not real content.
    .filter((n) => n.mode !== "120000")
    .filter((n) => !prefix || n.path.startsWith(prefix))
    .map((n) => n.path);
}

async function pmap(items, fn, concurrency) {
  const out = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return out;
}

function deriveSkillFromMd(repo, branch, path, md, hostMeta) {
  const { fm, body } = parseFrontmatter(md);
  const dirName = path.replace(/\/SKILL\.md$/i, "").split("/").pop() || "";
  const name = fm.name || dirName;
  const description = fm.description || "";
  if (!name || !description || description.length < 10) return null;
  const slug = slugify(`${repo.split("/").pop()}-${name}`);
  if (!slug) return null;
  const trimmedBody = body.length > MAX_CONTENT_BYTES
    ? body.slice(0, MAX_CONTENT_BYTES) + "\n\n…\n\n_[truncated — view full skill on GitHub]_"
    : body;
  const tags = deriveTags(name, description, [fm.category, fm.type].filter(Boolean));
  return {
    slug,
    title: titleize(name),
    description: truncate(description, 280),
    content: trimmedBody.trim(),
    tags,
    author: {
      name: hostMeta?.ownerLogin || repo.split("/")[0],
      url: `https://github.com/${repo.split("/")[0]}`,
    },
    repoUrl: `https://github.com/${repo}/tree/${branch}/${path.replace(/\/SKILL\.md$/, "")}`,
    dateAdded: hostMeta?.pushedAt?.slice(0, 10),
    lastUpdated: hostMeta?.pushedAt?.slice(0, 10),
    stars: hostMeta?.stars,
    source: "ingested",
    _sourceRepo: repo,
  };
}

function titleize(name) {
  return String(name)
    .split(/[-_/\s]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ") || name;
}

async function ingestRepo({ repo, prefix, cap }) {
  log(`scanning ${repo}…`);
  const meta = ghRepo(repo);
  if (!meta) { log(`  skip — not found`); return []; }
  const branch = meta.defaultBranch || "main";
  const paths = listSkillPaths(repo, branch, prefix);
  if (paths.length === 0) { log(`  no SKILL.md files`); return []; }
  const limited = paths.slice(0, cap);
  log(`  found ${paths.length} SKILL.md files; fetching ${limited.length}`);

  const fetched = await pmap(limited, async (path) => {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
    const md = await fetchText(url);
    if (!md) return null;
    return deriveSkillFromMd(repo, branch, path, md, meta);
  }, FETCH_CONCURRENCY);

  const items = fetched.filter(Boolean);
  log(`  parsed ${items.length} skills`);
  return items;
}

async function main() {
  const all = [];
  for (const src of SOURCES) {
    try {
      const items = await ingestRepo(src);
      all.push(...items);
    } catch (e) {
      log(`error scanning ${src.repo}: ${e.message}`);
    }
  }
  const deduped = dedupeBySlug(all);
  log(`total: ${all.length} skills, ${deduped.length} after dedupe`);
  writeJson("src/data/_ingested/skills.json", deduped);
  log(`wrote src/data/_ingested/skills.json`);
}

main();
