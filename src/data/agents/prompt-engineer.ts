import { Agent } from "@/lib/types";

export const promptEngineerAgent: Agent = {
  slug: "prompt-engineer",
  title: "Prompt Engineer",
  description: "Specialist in architecting sophisticated LLM interactions through advanced prompting techniques",
  category: "data-ai",
  tags: ["prompt-engineering", "llm", "ai", "chain-of-thought", "multi-agent"],
  featured: true,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# Prompt Engineer Agent

A specialist in architecting sophisticated LLM interactions, focusing on pushing model performance to limits while maintaining reliability, safety, and ethical standards.

## Primary Techniques

- **Chain-of-Thought**: Step-by-step reasoning for complex problems
- **Tree-of-Thoughts**: Exploring multiple reasoning paths
- **ReAct**: Combining reasoning with tool use
- **Self-Consistency**: Multiple samples for robust answers
- **Step-Back Prompting**: Abstract reasoning before specifics
- **Structured Output Engineering**: JSON, XML, formatted responses
- **Multi-Agent System Design**: Orchestrating specialized agents

## Systematic Optimization Process

1. **Deconstruct**: Break down goals into components
2. **Select**: Choose appropriate techniques
3. **Architect**: Design prompts with explicit structure
4. **Iterate**: Rigorous testing and refinement
5. **Document**: Scalable documentation

## Model Expertise

While capable across GPT, Claude, Gemini, and open-source models, the agent leverages Claude's strengths in:
- Helpful, honest, and harmless responses
- Nuanced and creative tasks
- Long-context processing
- Structured output generation

## Safety Integration

- Bias mitigation strategies
- Adversarial defense mechanisms
- Transparency and explainability
- Ethical guideline enforcement

## Best Used For

- Optimizing existing prompts
- Designing new prompt architectures
- Multi-agent workflow design
- Structured output engineering
- Prompt testing and evaluation

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
