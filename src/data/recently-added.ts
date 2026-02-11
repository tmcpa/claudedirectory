import { ContentType, ContentItem } from "@/lib/types";
import { prompts } from "./prompts";
import { mcpServers } from "./mcp-servers";
import { hooks } from "./hooks";
import { skills } from "./skills";
import { plugins } from "./plugins";
import { howTos } from "./how-to";
import { agents } from "./agents";

export interface RecentItem {
  item: ContentItem;
  type: ContentType;
  dateAdded: string;
}

export function getRecentlyAdded(limit = 6): RecentItem[] {
  const all: RecentItem[] = [];

  const collections: { items: ContentItem[]; type: ContentType }[] = [
    { items: prompts, type: "prompt" },
    { items: mcpServers, type: "mcp-server" },
    { items: hooks, type: "hook" },
    { items: skills, type: "skill" },
    { items: plugins, type: "plugin" },
    { items: howTos, type: "how-to" },
    { items: agents, type: "agent" },
  ];

  for (const { items, type } of collections) {
    for (const item of items) {
      if (item.dateAdded) {
        all.push({ item, type, dateAdded: item.dateAdded });
      }
    }
  }

  return all
    .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
    .slice(0, limit);
}
