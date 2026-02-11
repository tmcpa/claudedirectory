import { RelatedItem, ContentType, ContentItem } from "./types";
import { prompts, getPromptBySlug } from "@/data/prompts";
import { mcpServers, getMCPServerBySlug } from "@/data/mcp-servers";
import { hooks, getHookBySlug } from "@/data/hooks";
import { skills, getSkillBySlug } from "@/data/skills";
import { plugins, getPluginBySlug } from "@/data/plugins";
import { howTos, getHowToBySlug } from "@/data/how-to";
import { agents, getAgentBySlug } from "@/data/agents";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

export interface ResolvedRelatedItem {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  href: string;
  relationship?: string;
}

const typeToPath: Record<ContentType, string> = {
  "prompt": "/prompts",
  "mcp-server": "/mcp-servers",
  "hook": "/hooks",
  "skill": "/skills",
  "plugin": "/plugins",
  "agent": "/agents",
  "how-to": "/how-to",
  "blog": "/blog",
};

const typeToLabel: Record<ContentType, string> = {
  "prompt": "Prompts",
  "mcp-server": "MCP Servers",
  "hook": "Hooks",
  "skill": "Skills",
  "plugin": "Plugins",
  "agent": "Agents",
  "how-to": "How To Guides",
  "blog": "Blog",
};

const relationshipLabels: Record<string, string> = {
  "contains": "Contains",
  "part-of": "Part of",
  "requires": "Requires",
  "recommends": "Recommended",
  "documented-by": "Documentation",
  "works-with": "Works with",
};

export function getTypeLabel(type: ContentType): string {
  return typeToLabel[type];
}

export function getRelationshipLabel(relationship?: string): string {
  if (!relationship) return "";
  return relationshipLabels[relationship] || relationship;
}

export function resolveRelatedItem(item: RelatedItem): ResolvedRelatedItem | null {
  let resolved: { title: string; description: string } | undefined;

  switch (item.type) {
    case "prompt":
      resolved = getPromptBySlug(item.slug);
      break;
    case "mcp-server":
      resolved = getMCPServerBySlug(item.slug);
      break;
    case "hook":
      resolved = getHookBySlug(item.slug);
      break;
    case "skill":
      resolved = getSkillBySlug(item.slug);
      break;
    case "plugin":
      resolved = getPluginBySlug(item.slug);
      break;
    case "agent":
      resolved = getAgentBySlug(item.slug);
      break;
    case "how-to":
      resolved = getHowToBySlug(item.slug);
      break;
    case "blog":
      resolved = getBlogPostBySlug(item.slug);
      break;
  }

  if (!resolved) return null;

  return {
    type: item.type,
    slug: item.slug,
    title: resolved.title,
    description: resolved.description,
    href: `${typeToPath[item.type]}/${item.slug}`,
    relationship: item.relationship,
  };
}

export function resolveRelatedItems(items?: RelatedItem[]): ResolvedRelatedItem[] {
  if (!items) return [];
  return items
    .map(resolveRelatedItem)
    .filter((item): item is ResolvedRelatedItem => item !== null);
}

export function groupRelatedItemsByType(items: ResolvedRelatedItem[]): Record<ContentType, ResolvedRelatedItem[]> {
  const grouped: Partial<Record<ContentType, ResolvedRelatedItem[]>> = {};

  for (const item of items) {
    if (!grouped[item.type]) {
      grouped[item.type] = [];
    }
    grouped[item.type]!.push(item);
  }

  return grouped as Record<ContentType, ResolvedRelatedItem[]>;
}

export function groupRelatedItemsByRelationship(items: ResolvedRelatedItem[]): Record<string, ResolvedRelatedItem[]> {
  const grouped: Record<string, ResolvedRelatedItem[]> = {};

  for (const item of items) {
    const key = item.relationship || "related";
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }

  return grouped;
}
