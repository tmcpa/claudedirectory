// Comparison pages: "A vs B for [use case]".
//
// Pages are pre-rendered. To keep the page count and quality both bounded,
// we only pair the top N items per (type, use case) by popularity/featured.
// Within that pool we pair every combination, alphabetized so each pair
// appears exactly once.
//
// A verdict for each comparison is auto-generated from a small heuristic
// (tag overlap with the use case, stars, recency, featured). Editors can
// override the verdict per (type, a, b, useCase) in data/comparisons.ts.

import { skills } from "@/data/skills";
import { plugins } from "@/data/plugins";
import { mcpServers } from "@/data/mcp-servers";
import { agents } from "@/data/agents";
import type { Skill, Plugin, MCPServer, Agent } from "@/lib/types";
import { useCases, type UseCase } from "@/data/use-cases";
import { verdictOverrides } from "@/data/comparisons";

export type ComparableType = "skills" | "plugins" | "mcp-servers" | "agents";

export interface ComparableItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: { name: string; url?: string };
  featured?: boolean;
  stars?: number;
  lastUpdated?: string;
  repoUrl?: string;
  installCommand?: string;
}

// Items per (type, use case) included in the comparison pool. With 4 types
// and 10 use cases that caps generated pages at ~4 * 10 * (12 choose 2) = 2640.
const POOL_SIZE = 12;

const collections: Record<ComparableType, ComparableItem[]> = {
  skills: skills as Skill[],
  plugins: (plugins as Plugin[]).map((p) => ({ ...p })),
  "mcp-servers": (mcpServers as MCPServer[]).map((m) => ({ ...m })),
  agents: agents as Agent[],
};

export function getCollection(type: ComparableType): ComparableItem[] {
  return collections[type];
}

export const COMPARABLE_TYPE_LABELS: Record<
  ComparableType,
  { singular: string; plural: string; path: string }
> = {
  skills: { singular: "Skill", plural: "Skills", path: "/skills" },
  plugins: { singular: "Plugin", plural: "Plugins", path: "/plugins" },
  "mcp-servers": {
    singular: "MCP Server",
    plural: "MCP Servers",
    path: "/mcp-servers",
  },
  agents: { singular: "Agent", plural: "Agents", path: "/agents" },
};

function matchesUseCase(item: ComparableItem, useCase: UseCase): boolean {
  const set = new Set(useCase.tags);
  return item.tags.some((t) => set.has(t));
}

function tagOverlap(item: ComparableItem, useCase: UseCase): number {
  const set = new Set(useCase.tags);
  return item.tags.reduce((n, t) => n + (set.has(t) ? 1 : 0), 0);
}

function recencyBonus(lastUpdated?: string): number {
  if (!lastUpdated) return 0;
  const updated = new Date(lastUpdated).getTime();
  if (Number.isNaN(updated)) return 0;
  const ageMs = Date.now() - updated;
  const sixMonthsMs = 1000 * 60 * 60 * 24 * 30 * 6;
  return ageMs <= sixMonthsMs ? 1 : 0;
}

// Score used for two purposes: pool selection (which items make the cut)
// and verdict tilt (which side the heuristic prefers).
function scoreFor(item: ComparableItem, useCase: UseCase): number {
  const overlap = tagOverlap(item, useCase);
  const stars = Math.min(item.stars ?? 0, 5000); // cap so a viral repo doesn't dwarf fit
  const featured = item.featured ? 1 : 0;
  return overlap * 1000 + featured * 500 + stars * 0.1 + recencyBonus(item.lastUpdated) * 50;
}

export function getPoolForUseCase(
  type: ComparableType,
  useCase: UseCase,
): ComparableItem[] {
  return getCollection(type)
    .filter((item) => matchesUseCase(item, useCase))
    .sort((a, b) => scoreFor(b, useCase) - scoreFor(a, useCase))
    .slice(0, POOL_SIZE);
}

// Alphabetized pair so each comparison has one canonical URL.
export function canonicalPair(aSlug: string, bSlug: string): [string, string] {
  return aSlug < bSlug ? [aSlug, bSlug] : [bSlug, aSlug];
}

export function pairSlug(aSlug: string, bSlug: string): string {
  const [a, b] = canonicalPair(aSlug, bSlug);
  return `${a}-vs-${b}`;
}

export function parsePair(
  pair: string,
): { a: string; b: string } | null {
  // "a-vs-b" — slug can contain hyphens, so split on the literal " vs " marker.
  const idx = pair.indexOf("-vs-");
  if (idx <= 0 || idx >= pair.length - 4) return null;
  const a = pair.slice(0, idx);
  const b = pair.slice(idx + 4);
  if (!a || !b || a === b) return null;
  return { a, b };
}

export interface ComparisonParams {
  type: ComparableType;
  pair: string;
  useCase: string;
}

export function getAllComparisonParams(): ComparisonParams[] {
  const params: ComparisonParams[] = [];
  for (const type of Object.keys(collections) as ComparableType[]) {
    for (const useCase of useCases) {
      const pool = getPoolForUseCase(type, useCase);
      for (let i = 0; i < pool.length; i++) {
        for (let j = i + 1; j < pool.length; j++) {
          const [a, b] = canonicalPair(pool[i].slug, pool[j].slug);
          params.push({ type, pair: `${a}-vs-${b}`, useCase: useCase.slug });
        }
      }
    }
  }
  return params;
}

export interface ResolvedComparison {
  type: ComparableType;
  a: ComparableItem;
  b: ComparableItem;
  useCase: UseCase;
  verdict: Verdict;
}

export interface Verdict {
  source: "override" | "heuristic";
  // One-liner summary.
  summary: string;
  // "Pick A if …" / "Pick B if …" / optional tie-breaker.
  pickA: string;
  pickB: string;
  tieBreaker?: string;
}

export function resolveComparison(
  type: ComparableType,
  pair: string,
  useCaseSlug: string,
): ResolvedComparison | null {
  const parsed = parsePair(pair);
  if (!parsed) return null;
  const useCase = useCases.find((u) => u.slug === useCaseSlug);
  if (!useCase) return null;

  const collection = getCollection(type);
  const a = collection.find((i) => i.slug === parsed.a);
  const b = collection.find((i) => i.slug === parsed.b);
  if (!a || !b) return null;

  // Both must matter for this use case.
  if (!matchesUseCase(a, useCase) || !matchesUseCase(b, useCase)) return null;

  const verdict = buildVerdict(type, a, b, useCase);
  return { type, a, b, useCase, verdict };
}

function buildVerdict(
  type: ComparableType,
  a: ComparableItem,
  b: ComparableItem,
  useCase: UseCase,
): Verdict {
  const key = `${type}|${a.slug}|${b.slug}|${useCase.slug}`;
  const override = verdictOverrides[key];
  if (override) return { source: "override", ...override };

  const aScore = scoreFor(a, useCase);
  const bScore = scoreFor(b, useCase);
  const aTags = new Set(a.tags);
  const bTags = new Set(b.tags);
  const aOnly = a.tags.filter((t) => !bTags.has(t));
  const bOnly = b.tags.filter((t) => !aTags.has(t));

  const aHook = aOnly[0] ?? a.tags[0] ?? useCase.title.toLowerCase();
  const bHook = bOnly[0] ?? b.tags[0] ?? useCase.title.toLowerCase();

  const summary =
    aScore === bScore
      ? `${a.title} and ${b.title} are close to a coin flip for ${useCase.title.toLowerCase()} — pick on stack fit.`
      : aScore > bScore
        ? `${a.title} edges out ${b.title} for ${useCase.title.toLowerCase()} on this site's signals (tag fit, popularity, recency).`
        : `${b.title} edges out ${a.title} for ${useCase.title.toLowerCase()} on this site's signals (tag fit, popularity, recency).`;

  return {
    source: "heuristic",
    summary,
    pickA: `Pick ${a.title} if your project leans on ${aHook}.`,
    pickB: `Pick ${b.title} if you need stronger ${bHook} support.`,
    tieBreaker:
      a.featured && !b.featured
        ? `${a.title} is editor-featured on this site.`
        : b.featured && !a.featured
          ? `${b.title} is editor-featured on this site.`
          : undefined,
  };
}
