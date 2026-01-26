import { Skill } from "@/lib/types";
import { commitSkill } from "./commit";
import { prSkill } from "./pr";
import { reviewSkill } from "./review";
import { superpowersSkill } from "./superpowers";
import { contextEngineeringSkill } from "./context-engineering";
import { webAssetGeneratorSkill } from "./web-asset-generator";
import { iosSimulatorSkill } from "./ios-simulator";
import { playwrightSkill } from "./playwright-skill";
import { mcpBuilderSkill } from "./mcp-builder";
import { youtubeTranscriptSkill } from "./youtube-transcript";
import { d3jsVisualizationSkill } from "./d3js-visualization";

export const skills: Skill[] = [
  commitSkill,
  prSkill,
  reviewSkill,
  superpowersSkill,
  contextEngineeringSkill,
  webAssetGeneratorSkill,
  // New community skills
  playwrightSkill,
  mcpBuilderSkill,
  iosSimulatorSkill,
  youtubeTranscriptSkill,
  d3jsVisualizationSkill,
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getFeaturedSkills(): Skill[] {
  return skills.filter((s) => s.featured);
}

export function getSkillsByTag(tag: string): Skill[] {
  return skills.filter((s) => s.tags.includes(tag));
}

export function getAllSkillTags(): string[] {
  const tags = new Set<string>();
  skills.forEach((s) => s.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
