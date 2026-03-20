import { MetadataRoute } from "next";
import { prompts, getAllPromptTags } from "@/data/prompts";
import { mcpServers, getAllMCPServerTags } from "@/data/mcp-servers";
import { hooks, getAllHookTags } from "@/data/hooks";
import { skills, getAllSkillTags } from "@/data/skills";
import { plugins, getAllPluginTags } from "@/data/plugins";
import { howTos, getAllHowToTags } from "@/data/how-to";
import { agents, getAllAgentTags } from "@/data/agents";
import { blogPosts, getAllBlogPostTags } from "@/data/blog";
import { BASE_URL } from "@/lib/constants";

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
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/whats-new`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
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

  // Dynamic pages - Blog Posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((item) => ({
    url: `${BASE_URL}/blog/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Topic/tag pages
  const topicPages: MetadataRoute.Sitemap = [
    ...getAllPromptTags().map((tag) => ({ url: `${BASE_URL}/prompts/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllMCPServerTags().map((tag) => ({ url: `${BASE_URL}/mcp-servers/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllHookTags().map((tag) => ({ url: `${BASE_URL}/hooks/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllSkillTags().map((tag) => ({ url: `${BASE_URL}/skills/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllPluginTags().map((tag) => ({ url: `${BASE_URL}/plugins/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllHowToTags().map((tag) => ({ url: `${BASE_URL}/how-to/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllAgentTags().map((tag) => ({ url: `${BASE_URL}/agents/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...getAllBlogPostTags().map((tag) => ({ url: `${BASE_URL}/blog/topic/${tag}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];

  return [
    ...staticPages,
    ...promptPages,
    ...mcpPages,
    ...hookPages,
    ...skillPages,
    ...pluginPages,
    ...howToPages,
    ...agentPages,
    ...blogPages,
    ...topicPages,
  ];
}
