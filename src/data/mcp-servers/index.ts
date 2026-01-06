import { MCPServer } from "@/lib/types";
import { braveSearchServer } from "./brave-search";
import { fetchServer } from "./fetch";
import { filesystemServer } from "./filesystem";
import { gitServer } from "./git";
import { githubServer } from "./github";
import { googleDriveServer } from "./google-drive";
import { memoryServer } from "./memory";
import { notionServer } from "./notion";
import { postgresServer } from "./postgres";
import { puppeteerServer } from "./puppeteer";
import { sentryServer } from "./sentry";
import { sequentialThinkingServer } from "./sequential-thinking";
import { slackServer } from "./slack";
import { sqliteServer } from "./sqlite";

export const mcpServers: MCPServer[] = [
  filesystemServer,
  githubServer,
  postgresServer,
  sqliteServer,
  puppeteerServer,
  slackServer,
  braveSearchServer,
  memoryServer,
  fetchServer,
  gitServer,
  notionServer,
  googleDriveServer,
  sentryServer,
  sequentialThinkingServer,
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
