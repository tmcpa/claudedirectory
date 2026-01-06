import { Plugin } from "@/lib/types";
import { agentSdkDevPlugin } from "./agent-sdk-dev";
import { claudeOpusMigrationPlugin } from "./claude-opus-migration";
import { codeReviewPlugin } from "./code-review";
import { commitCommandsPlugin } from "./commit-commands";
import { explanatoryOutputPlugin } from "./explanatory-output";
import { featureDevPlugin } from "./feature-dev";
import { frontendDesignPlugin } from "./frontend-design";
import { hookifyPlugin } from "./hookify";
import { pluginDevPlugin } from "./plugin-dev";
import { prReviewToolkitPlugin } from "./pr-review-toolkit";
import { securityGuidancePlugin } from "./security-guidance";
import { swiftLspPlugin } from "./swift-lsp";
import { claudekitPlugin } from "./claudekit";
import { superclaudePlugin } from "./superclaude";
import { codexSettingsPlugin } from "./codex-settings";
import { ccpmPlugin } from "./ccpm";
import { contextkitPlugin } from "./contextkit";

export const plugins: Plugin[] = [
  // Featured plugins first
  codeReviewPlugin,
  featureDevPlugin,
  frontendDesignPlugin,
  commitCommandsPlugin,
  pluginDevPlugin,
  securityGuidancePlugin,
  // Non-featured plugins
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
