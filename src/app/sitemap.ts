import { MetadataRoute } from "next";
import { prompts, getAllPromptTags } from "@/data/prompts";
import { mcpServers, getAllMCPServerTags } from "@/data/mcp-servers";
import { hooks, getAllHookTags } from "@/data/hooks";
import { skills, getAllSkillTags } from "@/data/skills";
import { plugins, getAllPluginTags } from "@/data/plugins";
import { howTos, getAllHowToTags } from "@/data/how-to";
import { agents, getAllAgentTags } from "@/data/agents";
import { blogPosts, getAllBlogPostTags } from "@/data/blog";
import { useCases } from "@/data/use-cases";
import { getCrossPageParams } from "@/lib/use-cases";
import { getAllComparisonParams } from "@/lib/comparisons";
import { BASE_URL } from "@/lib/constants";

type SitemapId =
  | "static"
  | "prompts"
  | "mcp-servers"
  | "hooks"
  | "skills"
  | "plugins"
  | "how-to"
  | "agents"
  | "blog"
  | "topics"
  | "use-cases"
  | "cross"
  | "compare";

export async function generateSitemaps(): Promise<{ id: SitemapId }[]> {
  return [
    { id: "static" },
    { id: "prompts" },
    { id: "mcp-servers" },
    { id: "hooks" },
    { id: "skills" },
    { id: "plugins" },
    { id: "how-to" },
    { id: "agents" },
    { id: "blog" },
    { id: "topics" },
    { id: "use-cases" },
    { id: "cross" },
    { id: "compare" },
  ];
}

export default async function sitemap({
  id,
}: {
  id: Promise<SitemapId | `${SitemapId}.xml`> | SitemapId | `${SitemapId}.xml`;
}): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const resolved = await Promise.resolve(id);
  const key = (typeof resolved === "string"
    ? resolved.replace(/\.xml$/, "")
    : resolved) as SitemapId;

  switch (key) {
    case "static":
      return [
        {
          url: BASE_URL,
          lastModified: now,
          changeFrequency: "daily",
          priority: 1,
        },
        ...[
          "prompts",
          "mcp-servers",
          "hooks",
          "skills",
          "plugins",
          "how-to",
          "agents",
          "blog",
        ].map((segment) => ({
          url: `${BASE_URL}/${segment}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.9,
        })),
        {
          url: `${BASE_URL}/whats-new`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.8,
        },
        {
          url: `${BASE_URL}/for`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
      ];

    case "prompts":
      return prompts.map((item) => ({
        url: `${BASE_URL}/prompts/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "mcp-servers":
      return mcpServers.map((item) => ({
        url: `${BASE_URL}/mcp-servers/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "hooks":
      return hooks.map((item) => ({
        url: `${BASE_URL}/hooks/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "skills":
      return skills.map((item) => ({
        url: `${BASE_URL}/skills/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "plugins":
      return plugins.map((item) => ({
        url: `${BASE_URL}/plugins/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "how-to":
      return howTos.map((item) => ({
        url: `${BASE_URL}/how-to/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "agents":
      return agents.map((item) => ({
        url: `${BASE_URL}/agents/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "blog":
      return blogPosts.map((item) => ({
        url: `${BASE_URL}/blog/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case "topics":
      return [
        ...getAllPromptTags().map((tag) => ({
          url: `${BASE_URL}/prompts/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllMCPServerTags().map((tag) => ({
          url: `${BASE_URL}/mcp-servers/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllHookTags().map((tag) => ({
          url: `${BASE_URL}/hooks/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllSkillTags().map((tag) => ({
          url: `${BASE_URL}/skills/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllPluginTags().map((tag) => ({
          url: `${BASE_URL}/plugins/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllHowToTags().map((tag) => ({
          url: `${BASE_URL}/how-to/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllAgentTags().map((tag) => ({
          url: `${BASE_URL}/agents/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        ...getAllBlogPostTags().map((tag) => ({
          url: `${BASE_URL}/blog/topic/${tag}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ];

    case "use-cases":
      return useCases.map((u) => ({
        url: `${BASE_URL}/for/${u.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));

    case "cross": {
      const types = [
        "skills",
        "plugins",
        "agents",
        "mcp-servers",
        "prompts",
        "hooks",
        "how-to",
      ] as const;
      return types.flatMap((type) =>
        getCrossPageParams(type).map(({ tag, useCase }) => ({
          url: `${BASE_URL}/${type}/topic/${tag}/for/${useCase}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.65,
        })),
      );
    }

    case "compare":
      return getAllComparisonParams().map(({ type, pair, useCase }) => ({
        url: `${BASE_URL}/compare/${type}/${pair}/for/${useCase}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    default:
      return [];
  }
}
