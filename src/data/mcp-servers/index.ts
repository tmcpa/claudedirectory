import { MCPServer } from "@/lib/types";
import { airtableServer } from "./airtable";
import { apidogServer } from "./apidog";
import { atlassianServer } from "./atlassian";
import { awsServer } from "./aws";
import { bigqueryServer } from "./bigquery";
import { blueskyServer } from "./bluesky";
import { braveSearchServer } from "./brave-search";
import { browserbaseServer } from "./browserbase";
import { cloudflareServer } from "./cloudflare";
import { context7Server } from "./context7";
import { datadogServer } from "./datadog";
import { discordServer } from "./discord";
import { dockerServer } from "./docker";
import { e2bServer } from "./e2b";
import { elasticsearchServer } from "./elasticsearch";
import { exaServer } from "./exa";
import { fetchServer } from "./fetch";
import { figmaServer } from "./figma";
import { filesystemServer } from "./filesystem";
import { firecrawlServer } from "./firecrawl";
import { gitServer } from "./git";
import { githubServer } from "./github";
import { googleDriveServer } from "./google-drive";
import { googleMapsServer } from "./google-maps";
import { grafanaServer } from "./grafana";
import { jiraServer } from "./jira";
import { kubernetesServer } from "./kubernetes";
import { linearServer } from "./linear";
import { memoryServer } from "./memory";
import { mongodbServer } from "./mongodb";
import { neonServer } from "./neon";
import { neo4jServer } from "./neo4j";
import { notionServer } from "./notion";
import { obsidianServer } from "./obsidian";
import { playwrightServer } from "./playwright";
import { postgresServer } from "./postgres";
import { puppeteerServer } from "./puppeteer";
import { raygunServer } from "./raygun";
import { redisServer } from "./redis";
import { resendServer } from "./resend";
import { sentryServer } from "./sentry";
import { sequentialThinkingServer } from "./sequential-thinking";
import { shopifyServer } from "./shopify";
import { slackServer } from "./slack";
import { snowflakeServer } from "./snowflake";
import { sqliteServer } from "./sqlite";
import { stripeServer } from "./stripe";
import { supabaseServer } from "./supabase";
import { taskmasterServer } from "./taskmaster";
import { tavilyServer } from "./tavily";
import { terraformServer } from "./terraform";
import { timeServer } from "./time";
import { tursoServer } from "./turso";
import { upstashServer } from "./upstash";
import { vercelServer } from "./vercel";
import { youtubeServer } from "./youtube";

export const mcpServers: MCPServer[] = [
  // Featured servers first
  filesystemServer,
  githubServer,
  figmaServer,
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
  apidogServer,
  taskmasterServer,
  // Non-featured servers
  fetchServer,
  gitServer,
  notionServer,
  googleDriveServer,
  googleMapsServer,
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
  // Data & Analytics
  snowflakeServer,
  bigqueryServer,
  datadogServer,
  // Social & Communication
  obsidianServer,
  blueskyServer,
  discordServer,
  youtubeServer,
  // Business Tools
  atlassianServer,
  airtableServer,
  shopifyServer,
  raygunServer,
  // Database & Infrastructure
  neonServer,
  tursoServer,
  upstashServer,
  // Developer Tools
  context7Server,
  browserbaseServer,
  resendServer,
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
