import { HowTo } from "@/lib/types";
import { gettingStartedHowTo } from "./getting-started";
import { memoryHowTo } from "./memory";
import { slashCommandsHowTo } from "./slash-commands";
import { mcpServersHowTo } from "./mcp-servers";
import { hooksHowTo } from "./hooks";
import { skillsHowTo } from "./skills";
import { pluginsHowTo } from "./plugins";
import { advancedFeaturesHowTo } from "./advanced-features";
import { agentTeamsHowTo } from "./agent-teams";

export const howTos: HowTo[] = [
  gettingStartedHowTo,
  memoryHowTo,
  slashCommandsHowTo,
  mcpServersHowTo,
  hooksHowTo,
  skillsHowTo,
  pluginsHowTo,
  advancedFeaturesHowTo,
  agentTeamsHowTo,
];

export function getHowToBySlug(slug: string): HowTo | undefined {
  return howTos.find((h) => h.slug === slug);
}

export function getFeaturedHowTos(): HowTo[] {
  return howTos.filter((h) => h.featured);
}

export function getHowTosByTag(tag: string): HowTo[] {
  return howTos.filter((h) => h.tags.includes(tag));
}

export function getHowTosByDifficulty(difficulty: HowTo["difficulty"]): HowTo[] {
  return howTos.filter((h) => h.difficulty === difficulty);
}

export function getAllHowToTags(): string[] {
  const tags = new Set<string>();
  howTos.forEach((h) => h.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
