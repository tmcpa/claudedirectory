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
// External plugins (official integrations)
import { asanaPlugin } from "./asana";
import { context7Plugin } from "./context7";
import { firebasePlugin } from "./firebase";
import { githubPlugin } from "./github";
import { gitlabPlugin } from "./gitlab";
import { greptilePlugin } from "./greptile";
import { laravelBoostPlugin } from "./laravel-boost";
import { linearPlugin } from "./linear";
import { playwrightPlugin } from "./playwright";
import { serenaPlugin } from "./serena";
import { slackPlugin } from "./slack";
import { stripePlugin } from "./stripe";
import { supabasePlugin } from "./supabase";

export const plugins: Plugin[] = [
  // Featured plugins first
  codeReviewPlugin,
  featureDevPlugin,
  frontendDesignPlugin,
  commitCommandsPlugin,
  pluginDevPlugin,
  securityGuidancePlugin,
  // Featured external plugins
  githubPlugin,
  linearPlugin,
  supabasePlugin,
  playwrightPlugin,
  // Non-featured plugins
  swiftLspPlugin,
  claudekitPlugin,
  superclaudePlugin,
  codexSettingsPlugin,
  ccpmPlugin,
  contextkitPlugin,
  // External plugins
  asanaPlugin,
  context7Plugin,
  firebasePlugin,
  gitlabPlugin,
  greptilePlugin,
  laravelBoostPlugin,
  serenaPlugin,
  slackPlugin,
  stripePlugin,
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
