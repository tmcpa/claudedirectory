import { Skill } from "@/lib/types";
import { commitSkill } from "./commit";
import { prSkill } from "./pr";
import { reviewSkill } from "./review";
import { superpowersSkill } from "./superpowers";
import { contextEngineeringSkill } from "./context-engineering";
import { webAssetGeneratorSkill } from "./web-asset-generator";

export const skills: Skill[] = [
  commitSkill,
  prSkill,
  reviewSkill,
  superpowersSkill,
  contextEngineeringSkill,
  webAssetGeneratorSkill,
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
