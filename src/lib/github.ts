import metadataCache from "@/data/github-metadata.json";

export interface RepoMetadata {
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
}

interface CacheEntry extends RepoMetadata {
  readme?: string;
  fetchedAt: string;
}

const cache = metadataCache as Record<string, CacheEntry>;

function parseRepo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com" && u.hostname !== "www.github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function lookup(repoUrl: string | undefined): CacheEntry | null {
  if (!repoUrl) return null;
  const parsed = parseRepo(repoUrl);
  if (!parsed) return null;
  const key = `${parsed.owner}/${parsed.repo}`;
  return cache[key] ?? null;
}

export async function getRepoMetadata(
  repoUrl: string | undefined,
): Promise<RepoMetadata | null> {
  const entry = lookup(repoUrl);
  if (!entry) return null;
  return {
    owner: entry.owner,
    repo: entry.repo,
    stars: entry.stars,
    forks: entry.forks,
    lastUpdated: entry.lastUpdated,
    defaultBranch: entry.defaultBranch,
    description: entry.description,
    language: entry.language,
    license: entry.license,
    htmlUrl: entry.htmlUrl,
    readmeUrl: entry.readmeUrl,
  };
}

export async function getRepoReadme(
  repoUrl: string | undefined,
): Promise<string | null> {
  const entry = lookup(repoUrl);
  return entry?.readme ?? null;
}

export function formatStars(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k.toFixed(k >= 10 ? 0 : 1)}k`;
  }
  return String(n);
}

export function formatRelativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `${w} week${w === 1 ? "" : "s"} ago`;
  }
  if (days < 365) {
    const m = Math.floor(days / 30);
    return `${m} month${m === 1 ? "" : "s"} ago`;
  }
  const y = Math.floor(days / 365);
  return `${y} year${y === 1 ? "" : "s"} ago`;
}

export function formatAbsoluteDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
