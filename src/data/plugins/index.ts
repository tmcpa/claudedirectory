import { Plugin } from "@/lib/types";
import { codeReviewPlugin } from "./code-review";
import { featureDevPlugin } from "./feature-dev";
import { frontendDesignPlugin } from "./frontend-design";
import { swiftLspPlugin } from "./swift-lsp";
import { claudekitPlugin } from "./claudekit";
import { superclaudePlugin } from "./superclaude";
import { codexSettingsPlugin } from "./codex-settings";
import { ccpmPlugin } from "./ccpm";
import { contextkitPlugin } from "./contextkit";

export const plugins: Plugin[] = [
  codeReviewPlugin,
  featureDevPlugin,
  frontendDesignPlugin,
  swiftLspPlugin,
  claudekitPlugin,
  superclaudePlugin,
  codexSettingsPlugin,
  ccpmPlugin,
  contextkitPlugin,
];

export function getPluginBySlug(slug: string): Plugin | undefined {
  return plugins.find((p) => p.slug === slug);
}

export function getFeaturedPlugins(): Plugin[] {
  return plugins.filter((p) => p.featured);
}

export function getPluginsByTag(tag: string): Plugin[] {
  return plugins.filter((p) => p.tags.includes(tag));
}

export function getAllPluginTags(): string[] {
  const tags = new Set<string>();
  plugins.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
