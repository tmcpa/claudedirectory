// Ingest MCP servers from curated awesome-mcp-servers README files.
// Each bullet item with a github.com link becomes an MCP server listing.

import { ghContent, ghRepo, slugify, dedupeBySlug, writeJson, log, truncate, deriveTags } from "./_lib.mjs";

const SOURCES = [
  { repo: "punkpeye/awesome-mcp-servers", path: "README.md", category: null },
  { repo: "modelcontextprotocol/servers", path: "README.md", category: "official" },
  { repo: "wong2/awesome-mcp-servers", path: "README.md", category: null },
];

// Match: - [owner/repo](https://github.com/owner/repo) [icons/badges] - description
// or:   * [Name](https://github.com/owner/repo/...) - description
const ITEM_RE = /^[-*]\s+\[([^\]]+)\]\(https:\/\/github\.com\/([^/)\s]+)\/([^/)\s#]+)(?:\/[^)\s]*)?\)([^-]*?)\s+[-–—]\s+(.+?)$/;

function parseAwesomeReadme(markdown, sourceRepo, defaultCategory) {
  const lines = markdown.split("\n");
  const out = [];
  let inServerSection = false;
  let currentCategory = defaultCategory;
  let pastServerImpl = false;

  for (const line of lines) {
    // Track section headers (case-insensitive)
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h2) {
      const title = cleanHeading(h2[1]).toLowerCase();
      if (title.includes("server implementation") || title.includes("servers")) {
        inServerSection = true;
        pastServerImpl = false;
      } else if (inServerSection && (title.includes("framework") || title.includes("client") || title.includes("tutorial") || title.includes("tip") || title.includes("legend"))) {
        // Stop at the next major section after server implementations
        if (pastServerImpl) inServerSection = false;
      }
      pastServerImpl = inServerSection;
      continue;
    }
    if (h3) {
      const cleaned = cleanHeading(h3[1]);
      currentCategory = cleaned.toLowerCase() || defaultCategory;
      continue;
    }

    if (!inServerSection) continue;

    const m = line.trim().match(ITEM_RE);
    if (!m) continue;
    const [, _displayName, owner, repo, _icons, description] = m;
    const cleanDesc = stripBadges(description).trim();
    if (!cleanDesc || cleanDesc.length < 10) continue;
    const repoFull = `${owner}/${repo}`;
    const slug = slugify(`${owner}-${repo}`);
    // Prefer the repo name; if it's generic (just "agent", "server", "mcp"), include owner.
    const repoTitle = titleize(repo);
    const isGeneric = /^(agent|server|servers|mcp|mcp-server|core|client|sdk|tool|tools|api)$/i.test(repo.replace(/[-_](mcp|server|servers)/gi, ""));
    const title = isGeneric ? `${titleize(owner)} ${repoTitle}`.trim() : repoTitle;
    out.push({
      slug,
      title,
      description: truncate(cleanDesc, 280),
      tags: deriveTags(repo, cleanDesc, currentCategory ? [currentCategory] : []),
      author: {
        name: owner,
        url: `https://github.com/${owner}`,
      },
      repoUrl: `https://github.com/${repoFull}`,
      installCommand: guessInstallCommand(repoFull, cleanDesc),
      config: defaultMcpConfig(repo),
      source: "ingested",
      _category: currentCategory,
      _sourceList: sourceRepo,
    });
  }
  return out;
}

function stripBadges(text) {
  // Remove markdown image badges: ![alt](url) and inline link badges with svg score
  return String(text)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, "")
    .replace(/\s+/g, " ");
}

function cleanHeading(text) {
  // Remove HTML tags, emoji, leading symbols, link anchors.
  return String(text)
    .replace(/<a\s+[^>]*>.*?<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu, "")
    .replace(/^[^A-Za-z0-9]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleize(name) {
  return String(name)
    .replace(/^mcp[-_]/i, "")
    .replace(/[-_]mcp(?:[-_]server)?$/i, "")
    .replace(/[-_]server$/i, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ") || name;
}

function guessInstallCommand(repoFull, description) {
  const m = description.match(/`(npx[^`]+|pip install[^`]+|uv[xa-z]?\s+[^`]+)`/i);
  if (m) return m[1].trim();
  // Default to npx pattern using repo name
  const repo = repoFull.split("/")[1];
  return `npx -y ${repo}`;
}

function defaultMcpConfig(repo) {
  return `{
  "mcpServers": {
    "${repo}": {
      "command": "npx",
      "args": ["-y", "${repo}"]
    }
  }
}`;
}

async function main() {
  const all = [];
  for (const { repo, path, category } of SOURCES) {
    log(`fetching ${repo}/${path}…`);
    const meta = ghRepo(repo);
    const branch = meta?.defaultBranch ?? "HEAD";
    const md = ghContent(repo, path, branch);
    if (!md) {
      log(`  not found`);
      continue;
    }
    const items = parseAwesomeReadme(md, repo, category);
    log(`  parsed ${items.length} entries`);
    all.push(...items);
  }
  const deduped = dedupeBySlug(all);
  log(`total: ${all.length} entries, ${deduped.length} after dedupe`);
  writeJson("src/data/_ingested/mcp-servers.json", deduped);
  log(`wrote src/data/_ingested/mcp-servers.json`);
}

main();
