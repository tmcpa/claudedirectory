import { MCPServer } from "@/lib/types";
import { filesystemServer } from "./filesystem";
import { githubServer } from "./github";
import { postgresServer } from "./postgres";
import { puppeteerServer } from "./puppeteer";

export const mcpServers: MCPServer[] = [
  filesystemServer,
  githubServer,
  postgresServer,
  puppeteerServer,
];

export function getMCPServerBySlug(slug: string): MCPServer | undefined {
  return mcpServers.find((s) => s.slug === slug);
}

export function getFeaturedMCPServers(): MCPServer[] {
  return mcpServers.filter((s) => s.featured);
}

export function getMCPServersByTag(tag: string): MCPServer[] {
  return mcpServers.filter((s) => s.tags.includes(tag));
}

export function getAllMCPServerTags(): string[] {
  const tags = new Set<string>();
  mcpServers.forEach((s) => s.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
