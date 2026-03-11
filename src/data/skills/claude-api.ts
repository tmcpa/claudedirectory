import { Skill } from "@/lib/types";

export const claudeApiSkill: Skill = {
  slug: "claude-api",
  title: "Claude API Builder",
  description: "Build applications with the Claude API and Anthropic SDK with best practices for tool use, streaming, and prompt engineering",
  tags: ["api", "anthropic", "sdk", "claude", "official"],
  featured: true,
  dateAdded: "2026-03-11",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  content: `# Claude API Builder Skill

Build applications using the Claude API and Anthropic SDK.

## Usage
\`\`\`
/claude-api
\`\`\`

## Overview

This built-in skill helps you build applications that use the Claude API. It provides guidance on:

- **SDK Setup** - Initialize the Anthropic SDK in Python, TypeScript, or other languages
- **Message API** - Construct messages with proper role formatting
- **Tool Use** - Define and handle tool calls in your application
- **Streaming** - Implement streaming responses for real-time output
- **Prompt Engineering** - Structure system prompts and user messages effectively

## Capabilities

### API Integration
- Generate boilerplate for Claude API clients
- Handle authentication and error responses
- Implement retry logic and rate limiting
- Set up streaming with Server-Sent Events

### Tool Use Patterns
- Define tool schemas with JSON Schema
- Handle tool call responses and results
- Implement multi-turn tool use conversations
- Build agentic loops with tool use

### Best Practices
- Token management and context window optimization
- Model selection guidance (Opus, Sonnet, Haiku)
- Cost optimization strategies
- Safety and content filtering

## Example Usage

"Set up a Python script that uses the Claude API to analyze code"
"Build a TypeScript server with streaming Claude responses"
"Create a tool-use agent that can search and summarize documents"

## Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python)
`,
};
