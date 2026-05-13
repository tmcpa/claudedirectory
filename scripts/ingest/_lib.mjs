// Shared helpers for ingest scripts. No external deps.
// Uses the `gh` CLI (must be authenticated) for GitHub API access.

import { execSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const CACHE_DIR = "scripts/ingest/.cache";

export function gh(args, { json = true, allowFail = false } = {}) {
  const res = spawnSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) {
    if (allowFail) return null;
    throw new Error(`gh ${args.join(" ")} failed: ${res.stderr}`);
  }
  return json ? JSON.parse(res.stdout) : res.stdout;
}

export function ghContent(repo, path, ref = "HEAD") {
  // Returns the decoded text content of a file in a repo.
  const cacheKey = `gh-content-${repo}-${ref}-${path}`.replace(/[^a-z0-9-]/gi, "_");
  const cached = readCache(cacheKey);
  if (cached !== null) return cached;
  const data = gh(["api", `repos/${repo}/contents/${path}`, "-q", ".content"], { json: false, allowFail: true });
  if (!data) return null;
  const decoded = Buffer.from(data, "base64").toString("utf8");
  writeCache(cacheKey, decoded);
  return decoded;
}

export function ghRepo(repo) {
  // Fetch repo metadata: stars, pushed_at, description, owner, default_branch.
  const cacheKey = `gh-repo-${repo}`.replace(/[^a-z0-9-]/gi, "_");
  const cached = readCacheJson(cacheKey);
  if (cached) return cached;
  const meta = gh(["api", `repos/${repo}`], { allowFail: true });
  if (!meta) return null;
  const out = {
    fullName: meta.full_name,
    stars: meta.stargazers_count,
    pushedAt: meta.pushed_at,
    description: meta.description,
    ownerLogin: meta.owner?.login,
    ownerUrl: meta.owner?.html_url,
    htmlUrl: meta.html_url,
    defaultBranch: meta.default_branch,
    topics: meta.topics ?? [],
  };
  writeCacheJson(cacheKey, out);
  return out;
}

export function ghCodeSearch(query, perPage = 100) {
  // Code search is heavily rate-limited (10/min). Use sparingly and cache.
  const cacheKey = `gh-search-${query}`.replace(/[^a-z0-9-]/gi, "_");
  const cached = readCacheJson(cacheKey);
  if (cached) return cached;
  const out = gh(["api", "-X", "GET", "search/code", "-f", `q=${query}`, "-f", `per_page=${perPage}`], { allowFail: true });
  if (out) writeCacheJson(cacheKey, out);
  return out;
}

export async function fetchText(url) {
  const cacheKey = `url-${url}`.replace(/[^a-z0-9-]/gi, "_");
  const cached = readCache(cacheKey);
  if (cached !== null) return cached;
  const res = await fetch(url);
  if (!res.ok) return null;
  const text = await res.text();
  writeCache(cacheKey, text);
  return text;
}

function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
}

function readCache(key) {
  ensureCacheDir();
  const path = `${CACHE_DIR}/${key}`;
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function writeCache(key, value) {
  ensureCacheDir();
  writeFileSync(`${CACHE_DIR}/${key}`, value);
}

function readCacheJson(key) {
  const text = readCache(`${key}.json`);
  if (text === null) return null;
  try { return JSON.parse(text); } catch { return null; }
}

function writeCacheJson(key, value) {
  writeCache(`${key}.json`, JSON.stringify(value, null, 2));
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function dedupeBySlug(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item.slug || seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }
  return out;
}

export function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

export function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

export function log(...args) {
  console.error("[ingest]", ...args);
}

export function truncate(s, n) {
  if (!s) return "";
  s = String(s).replace(/\s+/g, " ").trim();
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export function tagFromTopic(topic) {
  return slugify(topic).replace(/-+/g, "-");
}

export function deriveTags(name, description, topics = []) {
  const tags = new Set();
  for (const t of topics) {
    const tag = tagFromTopic(t);
    if (tag) tags.add(tag);
  }
  const text = `${name} ${description ?? ""}`.toLowerCase();
  const KEYWORDS = [
    "python", "typescript", "javascript", "rust", "go", "swift", "kotlin",
    "react", "vue", "nextjs", "node", "django", "flask",
    "postgres", "mysql", "redis", "mongodb", "sqlite",
    "aws", "gcp", "azure", "vercel", "cloudflare", "kubernetes", "docker",
    "github", "gitlab", "linear", "jira", "slack", "discord",
    "security", "testing", "performance", "deployment", "monitoring",
    "browser", "automation", "scraping", "api", "graphql", "rest",
    "ai", "llm", "embedding", "rag", "agent",
  ];
  for (const kw of KEYWORDS) {
    if (text.includes(kw)) tags.add(kw);
  }
  return Array.from(tags).slice(0, 12);
}
