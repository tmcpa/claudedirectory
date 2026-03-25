import { Prompt } from "@/lib/types";
import { nextjsPrompt } from "./nextjs";
import { pythonPrompt } from "./python";
import { typescriptPrompt } from "./typescript";
import { reactNativePrompt } from "./react-native";
import { goPrompt } from "./go";
import { rustPrompt } from "./rust";
import { rubyRailsPrompt } from "./ruby-rails";
import { javaSpringPrompt } from "./java-spring";
import { vuePrompt } from "./vue";
import { swiftPrompt } from "./swift";
import { laravelPrompt } from "./laravel";
import { csharpDotnetPrompt } from "./csharp-dotnet";
import { kotlinAndroidPrompt } from "./kotlin-android";
import { flutterPrompt } from "./flutter";
import { angularPrompt } from "./angular";
import { djangoPrompt } from "./django";
import { sveltekitPrompt } from "./sveltekit";
import { astroPrompt } from "./astro";
import { elixirPhoenixPrompt } from "./elixir-phoenix";
import { remixPrompt } from "./remix";

export const prompts: Prompt[] = [
  nextjsPrompt,
  pythonPrompt,
  typescriptPrompt,
  reactNativePrompt,
  goPrompt,
  rustPrompt,
  rubyRailsPrompt,
  javaSpringPrompt,
  vuePrompt,
  swiftPrompt,
  laravelPrompt,
  csharpDotnetPrompt,
  kotlinAndroidPrompt,
  flutterPrompt,
  angularPrompt,
  djangoPrompt,
  sveltekitPrompt,
  astroPrompt,
  elixirPhoenixPrompt,
  remixPrompt,
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
