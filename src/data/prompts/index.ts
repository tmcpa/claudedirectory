import { Prompt } from "@/lib/types";
import { nextjsPrompt } from "./nextjs";
import { pythonPrompt } from "./python";
import { typescriptPrompt } from "./typescript";
import { reactNativePrompt } from "./react-native";
import { goPrompt } from "./go";

export const prompts: Prompt[] = [
  nextjsPrompt,
  pythonPrompt,
  typescriptPrompt,
  reactNativePrompt,
  goPrompt,
];

export function getPromptBySlug(slug: string): Prompt | undefined {
  return prompts.find((p) => p.slug === slug);
}

export function getFeaturedPrompts(): Prompt[] {
  return prompts.filter((p) => p.featured);
}

export function getPromptsByTag(tag: string): Prompt[] {
  return prompts.filter((p) => p.tags.includes(tag));
}

export function getAllPromptTags(): string[] {
  const tags = new Set<string>();
  prompts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
