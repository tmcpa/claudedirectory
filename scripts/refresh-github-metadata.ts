#!/usr/bin/env tsx
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

import { prompts } from "../src/data/prompts";
import { mcpServers } from "../src/data/mcp-servers";
import { hooks } from "../src/data/hooks";
import { skills } from "../src/data/skills";
import { plugins } from "../src/data/plugins";
import { howTos } from "../src/data/how-to";
import { agents } from "../src/data/agents";
import { blogPosts } from "../src/data/blog";

interface CacheEntry {
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  defaultBranch: string;
  description?: string;
  language?: string;
  license?: string;
  htmlUrl: string;
  readmeUrl: string;
  readme?: string;
  fetchedAt: string;
}

type Cache = Record<string, CacheEntry>;

const README_MAX_CHARS = 12000;
const CACHE_PATH = path.resolve(
  process.cwd(),
  "src/data/github-metadata.json",
);

const allItems = [
  ...prompts,
  ...mcpServers,
  ...hooks,
  ...skills,
  ...plugins,
  ...howTos,
  ...agents,
  ...blogPosts,
];

function parseRepo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com" && u.hostname !== "www.github.com")
      return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "claudedirectory-metadata-refresh",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchRepo(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    throw new Error(
      `repos/${owner}/${repo} → HTTP ${res.status} (rate-limit remaining: ${remaining ?? "?"})`,
    );
  }
  return (await res.json()) as {
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    default_branch: string;
    description: string | null;
    language: string | null;
    license: { spdx_id?: string | null } | null;
    html_url: string;
  };
}

async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    { headers: { ...authHeaders(), Accept: "application/vnd.github.raw" } },
  );
  if (!res.ok) return null;
  const text = await res.text();
  if (!text) return null;
  return text.length > README_MAX_CHARS
    ? `${text.slice(0, README_MAX_CHARS)}\n\n…`
    : text;
}

async function loadExisting(): Promise<Cache> {
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw) as Cache;
  } catch {
    return {};
  }
}

async function main() {
  const seen = new Set<string>();
  const repos: Array<{ key: string; owner: string; repo: string }> = [];
  for (const item of allItems) {
    if (!("repoUrl" in item) || !item.repoUrl) continue;
    const parsed = parseRepo(item.repoUrl);
    if (!parsed) continue;
    const key = `${parsed.owner}/${parsed.repo}`;
    if (seen.has(key)) continue;
    seen.add(key);
    repos.push({ key, ...parsed });
  }

  console.log(`Refreshing metadata for ${repos.length} unique GitHub repos.`);
  if (!process.env.GITHUB_TOKEN) {
    console.warn(
      "⚠ GITHUB_TOKEN not set — unauthenticated requests are capped at 60/hr.",
    );
  }

  const cache: Cache = await loadExisting();
  const now = new Date().toISOString();
  let ok = 0;
  let failed = 0;

  for (let i = 0; i < repos.length; i++) {
    const { key, owner, repo } = repos[i];
    process.stdout.write(`[${i + 1}/${repos.length}] ${key} … `);
    try {
      const data = await fetchRepo(owner, repo);
      const readme = await fetchReadme(owner, repo);
      cache[key] = {
        owner,
        repo,
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        lastUpdated: data.pushed_at,
        defaultBranch: data.default_branch ?? "main",
        description: data.description ?? undefined,
        language: data.language ?? undefined,
        license: data.license?.spdx_id ?? undefined,
        htmlUrl: data.html_url,
        readmeUrl: `https://github.com/${owner}/${repo}/blob/${data.default_branch ?? "main"}/README.md`,
        readme: readme ?? undefined,
        fetchedAt: now,
      };
      ok++;
      console.log(
        `★ ${data.stargazers_count}  updated ${data.pushed_at.slice(0, 10)}${readme ? "  + README" : ""}`,
      );
    } catch (err) {
      failed++;
      console.log(`✖ ${(err as Error).message}`);
    }
  }

  const sorted: Cache = {};
  for (const key of Object.keys(cache).sort()) sorted[key] = cache[key];

  await writeFile(CACHE_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  console.log(`\n✓ Wrote ${Object.keys(sorted).length} entries to ${CACHE_PATH}`);
  console.log(`  refreshed: ${ok}  failed: ${failed}  kept stale: ${Object.keys(sorted).length - ok}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
