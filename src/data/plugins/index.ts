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
// n8n-workflow plugin removed - repository no longer exists
import { openapiExpertPlugin } from "./openapi-expert";
import { pluginDevPlugin } from "./plugin-dev";
import { prReviewToolkitPlugin } from "./pr-review-toolkit";
import { securityGuidancePlugin } from "./security-guidance";
import { superclaudePlugin } from "./superclaude";
import { swiftLspPlugin } from "./swift-lsp";
import { testWriterFixerPlugin } from "./test-writer-fixer";
// ultrathink plugin removed - repository no longer exists
// New community plugins
import { flowNextPlugin } from "./flow-next";
import { ralphPlugin } from "./ralph";
import { skillSeekersPlugin } from "./skill-seekers";
// LSP plugins
import { typescriptLspPlugin } from "./typescript-lsp";
import { pyrightLspPlugin } from "./pyright-lsp";
import { rustAnalyzerLspPlugin } from "./rust-analyzer-lsp";
import { goplsLspPlugin } from "./gopls-lsp";
import { jdtlsLspPlugin } from "./jdtls-lsp";
import { csharpLspPlugin } from "./csharp-lsp";
import { phpLspPlugin } from "./php-lsp";
import { clangdLspPlugin } from "./clangd-lsp";
// External plugins (official integrations)
import { asanaPlugin } from "./asana";
import { awsPlugin } from "./aws";
import { chromeDevtoolsPlugin } from "./chrome-devtools";
import { context7Plugin } from "./context7";
import { datadogPlugin } from "./datadog";
import { dockerPlugin } from "./docker";
import { figmaPlugin } from "./figma";
import { firebasePlugin } from "./firebase";
import { githubPlugin } from "./github";
import { gitlabPlugin } from "./gitlab";
import { greptilePlugin } from "./greptile";
import { jiraPlugin } from "./jira";
import { laravelBoostPlugin } from "./laravel-boost";
import { linearPlugin } from "./linear";
import { notionPlugin } from "./notion";
import { playwrightPlugin } from "./playwright";
import { prismaPlugin } from "./prisma";
import { sentryPlugin } from "./sentry";
import { serenaPlugin } from "./serena";
import { slackPlugin } from "./slack";
import { stripePlugin } from "./stripe";
import { supabasePlugin } from "./supabase";
import { vercelPlugin } from "./vercel";

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
  // Featured external plugins
  githubPlugin,
  linearPlugin,
  supabasePlugin,
  playwrightPlugin,
  vercelPlugin,
  chromeDevtoolsPlugin,
  // LSP plugins
  typescriptLspPlugin,
  pyrightLspPlugin,
  rustAnalyzerLspPlugin,
  goplsLspPlugin,
  jdtlsLspPlugin,
  csharpLspPlugin,
  phpLspPlugin,
  clangdLspPlugin,
  swiftLspPlugin,
  // Non-featured plugins
  claudekitPlugin,
  superclaudePlugin,
  codexSettingsPlugin,
  ccpmPlugin,
  contextkitPlugin,
  prReviewToolkitPlugin,
  // Community plugins
  bugDetectivePlugin,
  testWriterFixerPlugin,
  codebaseDocumenterPlugin,
  changelogGeneratorPlugin,
  openapiExpertPlugin,
  deploymentEngineerPlugin,
  flowNextPlugin,
  ralphPlugin,
  skillSeekersPlugin,
  // External plugins
  asanaPlugin,
  awsPlugin,
  context7Plugin,
  datadogPlugin,
  dockerPlugin,
  figmaPlugin,
  firebasePlugin,
  gitlabPlugin,
  greptilePlugin,
  jiraPlugin,
  laravelBoostPlugin,
  notionPlugin,
  prismaPlugin,
  sentryPlugin,
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
