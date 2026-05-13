// Ingest plugin/skill/agent listings from `.claude-plugin/marketplace.json` files
// across known marketplace repos.
//
// Each entry in the marketplace.json `plugins` array becomes a plugin listing
// on the site. We extract plugin name, description, author, category, source repo.

import { ghContent, ghRepo, gh, slugify, dedupeBySlug, writeJson, log, truncate, deriveTags } from "./_lib.mjs";

const KNOWN_MARKETPLACES = [
  "anthropics/claude-plugins-official",
  "jeremylongshore/claude-code-plugins-plus-skills",
  "alirezarezvani/claude-skills",
  "phuryn/pm-skills",
  "wshobson/agents",
  "ComposioHQ/awesome-claude-plugins",
  "athola/claude-night-market",
  "secondsky/claude-skills",
  "2389-research/claude-plugins",
  "Houseofmvps/ultraship",
  "claude-world/director-mode-lite",
];

const MARKETPLACE_PATHS = [
  ".claude-plugin/marketplace.json",
  "marketplace.json",
];

function parseSourceRepo(source, hostRepo) {
  // `source` can be a string like "./plugins/foo", or an object with .url/.path/.ref
  if (!source) return { repoUrl: `https://github.com/${hostRepo}`, sourceRepo: hostRepo };
  if (typeof source === "string") {
    return { repoUrl: `https://github.com/${hostRepo}`, sourceRepo: hostRepo };
  }
  const url = source.url ?? source.source;
  if (!url) return { repoUrl: `https://github.com/${hostRepo}`, sourceRepo: hostRepo };
  const m = String(url).match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!m) return { repoUrl: url, sourceRepo: null };
  return { repoUrl: `https://github.com/${m[1]}/${m[2]}`, sourceRepo: `${m[1]}/${m[2]}` };
}

function pluginToListing(plugin, hostRepo, hostMeta, marketplaceName) {
  const { repoUrl, sourceRepo } = parseSourceRepo(plugin.source, hostRepo);
  const slug = slugify(plugin.name || plugin.title);
  if (!slug) return null;
  const description = truncate(plugin.description || hostMeta?.description || "", 280);
  const marketplace = marketplaceName || hostRepo.split("/").pop();
  // The official Anthropic marketplace is auto-registered, so no `marketplace add`
  // step is needed for it. All other marketplaces must be added first.
  const installCommand =
    marketplace === "claude-plugins-official"
      ? `/plugin install ${plugin.name}@${marketplace}`
      : `/plugin marketplace add ${hostRepo} && /plugin install ${plugin.name}@${marketplace}`;
  const tags = deriveTags(plugin.name, description, [plugin.category].filter(Boolean));
  return {
    slug,
    title: titleize(plugin.name),
    description,
    installCommand,
    tags,
    author: {
      name: plugin.author?.name || hostMeta?.ownerLogin || "Community",
      url: plugin.homepage || (sourceRepo ? `https://github.com/${sourceRepo}` : undefined),
    },
    repoUrl,
    dateAdded: hostMeta?.pushedAt?.slice(0, 10),
    lastUpdated: hostMeta?.pushedAt?.slice(0, 10),
    stars: hostMeta?.stars,
    source: "ingested",
    _hostMarketplace: hostRepo,
    _category: plugin.category,
  };
}

function titleize(name) {
  if (!name) return "";
  return String(name)
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

async function ingestMarketplace(repo) {
  log(`scanning ${repo}…`);
  const meta = ghRepo(repo);
  if (!meta) {
    log(`  skip — repo not found`);
    return [];
  }
  let raw = null;
  let usedPath = null;
  for (const path of MARKETPLACE_PATHS) {
    raw = ghContent(repo, path, meta.defaultBranch);
    if (raw) { usedPath = path; break; }
  }
  if (!raw) {
    log(`  no marketplace.json found at known paths`);
    return [];
  }
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch (e) { log(`  invalid JSON in ${usedPath}: ${e.message}`); return []; }
  const plugins = parsed.plugins || parsed.items || [];
  log(`  found ${plugins.length} entries in ${usedPath}`);
  const marketplaceName = typeof parsed.name === "string" ? parsed.name : null;
  const out = [];
  for (const p of plugins) {
    const listing = pluginToListing(p, repo, meta, marketplaceName);
    if (listing) out.push(listing);
  }
  return out;
}

async function main() {
  const all = [];
  for (const repo of KNOWN_MARKETPLACES) {
    try {
      const items = await ingestMarketplace(repo);
      all.push(...items);
    } catch (e) {
      log(`error scanning ${repo}: ${e.message}`);
    }
  }
  const deduped = dedupeBySlug(all);
  log(`total: ${all.length} entries, ${deduped.length} after dedupe`);
  writeJson("src/data/_ingested/plugins.json", deduped);
  log(`wrote src/data/_ingested/plugins.json`);
}

main();
