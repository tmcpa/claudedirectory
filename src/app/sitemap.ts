import { MetadataRoute } from "next";
import { prompts } from "@/data/prompts";
import { mcpServers } from "@/data/mcp-servers";
import { hooks } from "@/data/hooks";
import { skills } from "@/data/skills";
import { plugins } from "@/data/plugins";
import { howTos } from "@/data/how-to";
import { agents } from "@/data/agents";

const BASE_URL = "https://claudedirectory.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/prompts`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mcp-servers`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hooks`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plugins`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/how-to`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/agents`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic pages - Prompts
  const promptPages: MetadataRoute.Sitemap = prompts.map((item) => ({
    url: `${BASE_URL}/prompts/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - MCP Servers
  const mcpPages: MetadataRoute.Sitemap = mcpServers.map((item) => ({
    url: `${BASE_URL}/mcp-servers/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - Hooks
  const hookPages: MetadataRoute.Sitemap = hooks.map((item) => ({
    url: `${BASE_URL}/hooks/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - Skills
  const skillPages: MetadataRoute.Sitemap = skills.map((item) => ({
    url: `${BASE_URL}/skills/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - Plugins
  const pluginPages: MetadataRoute.Sitemap = plugins.map((item) => ({
    url: `${BASE_URL}/plugins/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - How-To Guides
  const howToPages: MetadataRoute.Sitemap = howTos.map((item) => ({
    url: `${BASE_URL}/how-to/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages - Agents
  const agentPages: MetadataRoute.Sitemap = agents.map((item) => ({
    url: `${BASE_URL}/agents/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...promptPages,
    ...mcpPages,
    ...hookPages,
    ...skillPages,
    ...pluginPages,
    ...howToPages,
    ...agentPages,
  ];
}
