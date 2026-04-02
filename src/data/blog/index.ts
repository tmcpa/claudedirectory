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

export const blogPosts: BlogPost[] = [
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
