import { MCPServer } from "@/lib/types";
import { awsServer } from "./aws";
import { braveSearchServer } from "./brave-search";
import { cloudflareServer } from "./cloudflare";
import { dockerServer } from "./docker";
import { e2bServer } from "./e2b";
import { elasticsearchServer } from "./elasticsearch";
import { exaServer } from "./exa";
import { fetchServer } from "./fetch";
import { filesystemServer } from "./filesystem";
import { firecrawlServer } from "./firecrawl";
import { gitServer } from "./git";
import { githubServer } from "./github";
import { googleDriveServer } from "./google-drive";
import { grafanaServer } from "./grafana";
import { jiraServer } from "./jira";
import { kubernetesServer } from "./kubernetes";
import { linearServer } from "./linear";
import { memoryServer } from "./memory";
import { mongodbServer } from "./mongodb";
import { neo4jServer } from "./neo4j";
import { notionServer } from "./notion";
import { playwrightServer } from "./playwright";
import { postgresServer } from "./postgres";
import { puppeteerServer } from "./puppeteer";
import { redisServer } from "./redis";
import { sentryServer } from "./sentry";
import { sequentialThinkingServer } from "./sequential-thinking";
import { slackServer } from "./slack";
import { sqliteServer } from "./sqlite";
import { stripeServer } from "./stripe";
import { supabaseServer } from "./supabase";
import { tavilyServer } from "./tavily";
import { terraformServer } from "./terraform";
import { timeServer } from "./time";
import { vercelServer } from "./vercel";

export const mcpServers: MCPServer[] = [
  // Featured servers first
  filesystemServer,
  githubServer,
  playwrightServer,
  supabaseServer,
  mongodbServer,
  cloudflareServer,
  linearServer,
  awsServer,
  e2bServer,
  postgresServer,
  sqliteServer,
  puppeteerServer,
  slackServer,
  braveSearchServer,
  memoryServer,
  // Non-featured servers
  fetchServer,
  gitServer,
  notionServer,
  googleDriveServer,
  sentryServer,
  sequentialThinkingServer,
  redisServer,
  timeServer,
  stripeServer,
  firecrawlServer,
  dockerServer,
  jiraServer,
  tavilyServer,
  exaServer,
  neo4jServer,
  vercelServer,
  grafanaServer,
  elasticsearchServer,
  kubernetesServer,
  terraformServer,
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
