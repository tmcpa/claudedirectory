import { BlogPost } from "@/lib/types";
import { claudeCodeVsCursorVsCopilot } from "./claude-code-vs-cursor-vs-copilot";
import { claudeCodeHooksGuide } from "./claude-code-hooks-guide";
import { claudeCodeWorkflows10xProductivity } from "./claude-code-workflows-10x-productivity";
import { clawdbotOpenclawGuide } from "./clawdbot-openclaw-guide";
import { claudeMdGuide } from "./claude-md-guide";
import { mcpServersGuide } from "./mcp-servers-guide";
import { bestClaudeCodePlugins } from "./best-claude-code-plugins";
import { anthropicClaudeCertificationProgram } from "./anthropic-claude-certification-program";
import { howToCreateClaudeSkills } from "./how-to-create-claude-skills";
import { claudeSkillsNonCodingUseCases } from "./claude-skills-non-coding-use-cases";
import { claudeCodeRemoteControl } from "./claude-code-remote-control";
import { isMcpDead } from "./is-mcp-dead";
import { claudeCodeAgentsGuide } from "./claude-code-agents-guide";
import { vibeCodingClaudeCode } from "./vibe-coding-claude-code";
import { claudeCodeSubagentsGuide } from "./claude-code-subagents-guide";
import { contextEngineeringClaudeCode } from "./context-engineering-claude-code";
import { claudeDispatchGuide } from "./claude-dispatch-guide";
import { claudeOpus4MillionTokenEra } from "./claude-opus-4-million-token-era";
import { blogClaudeManagedAgents } from "./blog-claude-managed-agents";
import { claudeCodeAutoMemoryGuide } from "./claude-code-auto-memory-guide";
import { claudeOpus47DeepReasoning } from "./claude-opus-4-7-deep-reasoning";
import { designingWithClaude } from "./designing-with-claude";
import { claudeCodeCheatSheet } from "./claude-code-cheat-sheet";
import { ultrareviewClaudeCodeGuide } from "./ultrareview-claude-code-guide";
import { claudeCoworkForBusinessUsers } from "./claude-cowork-for-business-users";
import { claudeCodeForNonEngineersInEngineeringCodebases } from "./claude-code-for-non-engineers-in-engineering-codebases";
import { claudeCodeWorktreesGuide } from "./claude-code-worktrees-guide";
import { claudeCodePlanModeGuide } from "./claude-code-plan-mode-guide";
import { claudeCodeStatuslineGuide } from "./claude-code-statusline-guide";
import { claudeCodeRoutinesGuide } from "./claude-code-routines-guide";
import { claudeCodeSlashCommandsGuide } from "./claude-code-slash-commands-guide";

export const blogPosts: BlogPost[] = [
  claudeCodeSlashCommandsGuide,
  claudeCodeRoutinesGuide,
  claudeCodeStatuslineGuide,
  claudeCodePlanModeGuide,
  claudeCodeWorktreesGuide,
  claudeCodeForNonEngineersInEngineeringCodebases,
  claudeCoworkForBusinessUsers,
  ultrareviewClaudeCodeGuide,
  claudeCodeCheatSheet,
  designingWithClaude,
  claudeOpus47DeepReasoning,
  claudeCodeAutoMemoryGuide,
  blogClaudeManagedAgents,
  claudeOpus4MillionTokenEra,
  contextEngineeringClaudeCode,
  claudeDispatchGuide,
  vibeCodingClaudeCode,
  claudeCodeSubagentsGuide,
  claudeCodeAgentsGuide,
  isMcpDead,
  claudeCodeRemoteControl,
  claudeSkillsNonCodingUseCases,
  howToCreateClaudeSkills,
  anthropicClaudeCertificationProgram,
  bestClaudeCodePlugins,
  claudeCodeVsCursorVsCopilot,
  claudeCodeHooksGuide,
  claudeCodeWorkflows10xProductivity,
  mcpServersGuide,
  claudeMdGuide,
  clawdbotOpenclawGuide,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.includes(tag));
}

export function getAllBlogPostTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
