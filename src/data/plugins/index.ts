import { Plugin } from "@/lib/types";
import { agentSdkDevPlugin } from "./agent-sdk-dev";
import { bugDetectivePlugin } from "./bug-detective";
import { ccpmPlugin } from "./ccpm";
import { changelogGeneratorPlugin } from "./changelog-generator";
import { claudekitPlugin } from "./claudekit";
import { claudeOpusMigrationPlugin } from "./claude-opus-migration";
import { codebaseDocumenterPlugin } from "./codebase-documenter";
import { codeReviewPlugin } from "./code-review";
import { codexSettingsPlugin } from "./codex-settings";
import { commitCommandsPlugin } from "./commit-commands";
import { compoundingEngineeringPlugin } from "./compounding-engineering";
import { contextkitPlugin } from "./contextkit";
import { deploymentEngineerPlugin } from "./deployment-engineer";
import { documentSkillsPlugin } from "./document-skills";
import { explanatoryOutputPlugin } from "./explanatory-output";
import { featureDevPlugin } from "./feature-dev";
import { frontendDesignPlugin } from "./frontend-design";
import { hookifyPlugin } from "./hookify";
import { n8nWorkflowPlugin } from "./n8n-workflow";
import { openapiExpertPlugin } from "./openapi-expert";
import { pluginDevPlugin } from "./plugin-dev";
import { prReviewToolkitPlugin } from "./pr-review-toolkit";
import { safetyNetPlugin } from "./safety-net";
import { securityGuidancePlugin } from "./security-guidance";
import { superclaudePlugin } from "./superclaude";
import { swiftLspPlugin } from "./swift-lsp";
import { testWriterPlugin } from "./test-writer";
import { ultrathinkPlugin } from "./ultrathink";
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
  documentSkillsPlugin,
  compoundingEngineeringPlugin,
  safetyNetPlugin,
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
  // Community plugins
  ultrathinkPlugin,
  bugDetectivePlugin,
  testWriterPlugin,
  codebaseDocumenterPlugin,
  changelogGeneratorPlugin,
  openapiExpertPlugin,
  n8nWorkflowPlugin,
  deploymentEngineerPlugin,
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
