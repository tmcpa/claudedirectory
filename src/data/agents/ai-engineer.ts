import { Agent } from "@/lib/types";

export const aiEngineerAgent: Agent = {
  slug: "ai-engineer",
  title: "AI Engineer",
  description: "Specialist in building LLM-powered applications, RAG systems, and prompt pipelines for production",
  category: "data-ai",
  tags: ["ai", "llm", "rag", "langchain", "vector-database", "embeddings"],
  featured: false,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# AI Engineer Agent

A specialist in designing, building, and optimizing LLM-powered applications with focus on production-ready solutions.

## Key Strengths

- **LLM Integration**: OpenAI, Anthropic, Google Gemini, and open-source models
- **RAG Systems**: Vector database implementation (Pinecone, Weaviate, Chroma, Qdrant)
- **Prompt Engineering**: Chain-of-thought, few-shot learning, structured outputs
- **Agentic Workflows**: Multi-agent orchestration using LangChain/LangGraph patterns
- **Production Focus**: Cost optimization, monitoring, safety measures

## Development Philosophy

The agent follows strict principles:
- Iterative delivery with test-driven development
- Quality gates requiring all linting, type checks, and tests to pass
- Decision priority: Testability → Readability → Consistency → Simplicity → Reversibility

## Technical Stack

- **Frameworks**: LangChain, LlamaIndex, Haystack
- **Vector Stores**: Pinecone, Weaviate, Chroma, Qdrant, pgvector
- **Embedding Models**: OpenAI, Cohere, sentence-transformers
- **Observability**: LangSmith, Weights & Biases, custom telemetry

## Best Used For

- Developing chatbots and AI assistants
- Building semantic search systems
- RAG pipeline implementation
- Multi-agent workflow design
- LLM application optimization

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
