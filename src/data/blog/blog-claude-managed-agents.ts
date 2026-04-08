import { BlogPost } from "@/lib/types";

export const blogClaudeManagedAgents: BlogPost = {
  slug: "blog-claude-managed-agents",
  title:
    "Claude Managed Agents: Deploy Production AI Agents Without the Infrastructure Headaches",
  description:
    "Everything you need to know about Claude Managed Agents — Anthropic's new fully managed platform for running autonomous AI agents in the cloud. Covers architecture, tools, environments, sessions, code examples, and real-world use cases.",
  publishedDate: "2026-04-08",
  tags: [
    "claude-code",
    "agents",
    "managed-agents",
    "automation",
    "enterprise",
    "tutorial",
    "developer-tools",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-agents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-remote-control",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "mcp-servers-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Managed Agents: Deploy Production AI Agents Without the Infrastructure Headaches

Building an AI agent is the easy part. Getting it to run reliably in production — with sandboxing, tool execution, authentication, state management, and observability — is where teams burn months.

**Claude Managed Agents** eliminates that gap. Announced today and now in public beta, it's Anthropic's fully managed platform for running Claude as an autonomous agent in cloud infrastructure. You define the agent — model, system prompt, tools, guardrails — and Anthropic handles the runtime. No agent loop to build. No sandbox to configure. No tool execution layer to maintain.

The pitch is simple: **get to production 10x faster**. Early adopters like Notion, Rakuten, and Asana are already shipping with it.

This guide covers how Managed Agents work, what you can build with them, and how to get started today.

---

## What Are Claude Managed Agents?

Claude Managed Agents is a pre-built, configurable agent harness that runs on Anthropic's managed infrastructure. Instead of building your own agent loop, you get a fully managed environment where Claude can read files, run commands, browse the web, execute code, and connect to external services — all inside secure cloud containers.

Think of it this way: the **Messages API** gives you direct model access for custom agent loops with fine-grained control. **Managed Agents** gives you the complete runtime so you can skip straight to defining *what* your agent does rather than *how* it runs.

| | Messages API | Claude Managed Agents |
|---|---|---|
| **What it is** | Direct model prompting access | Pre-built, configurable agent harness on managed infrastructure |
| **Best for** | Custom agent loops and fine-grained control | Long-running tasks and asynchronous work |
| **Infrastructure** | You manage everything | Anthropic manages the runtime |
| **Time to production** | Weeks to months | Days |

The harness includes built-in prompt caching, context compaction, and other performance optimizations that Anthropic has refined through Claude Code — you get production-grade agent behavior out of the box.

---

## Core Architecture

Claude Managed Agents is built around four concepts that work together:

### 1. Agent

The agent definition is the blueprint. It specifies the model, system prompt, tools, MCP servers, and skills. You create an agent once and reference it by ID across sessions.

\`\`\`python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-sonnet-4-6",
    system="You are a helpful coding assistant. Write clean, well-documented code.",
    tools=[
        {"type": "agent_toolset_20260401"},
    ],
)
\`\`\`

### 2. Environment

An environment defines the container where your agent runs — pre-installed packages, network access rules, and mounted files. Think of it as the agent's workspace.

\`\`\`python
environment = client.beta.environments.create(
    name="python-data-env",
    config={
        "type": "cloud",
        "networking": {"type": "unrestricted"},
    },
)
\`\`\`

You can configure environments with Python, Node.js, Go, or other runtimes pre-installed. Network access can be unrestricted or locked down to specific domains.

### 3. Session

A session is a running agent instance within an environment. It's where the actual work happens — you send messages, the agent executes tools, and results stream back.

\`\`\`python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    title="Data pipeline analysis",
)
\`\`\`

Sessions maintain state across multiple interactions. The file system persists, conversation history is stored server-side, and you can resume where you left off.

### 4. Events

Events are the messages exchanged between your application and the agent. You send user turns and tool results; the agent sends back messages, tool calls, and status updates via server-sent events (SSE).

\`\`\`
Your App ──── user.message ────▶ Agent Session
Your App ◀──── agent.message ──── Agent Session
Your App ◀──── agent.tool_use ─── Agent Session
Your App ◀── session.status_idle ── Agent Session
\`\`\`

You can also steer or interrupt the agent mid-execution by sending additional events.

---

## What Happens When You Send a Message

When a user event hits the session, here's what happens behind the scenes:

1. **Container provisioned** — Your environment configuration determines the runtime setup
2. **Agent loop runs** — Claude decides which tools to use based on your message and system prompt
3. **Tools execute** — File writes, bash commands, web searches, and other tool calls run inside the container
4. **Events stream back** — You receive real-time updates as the agent works
5. **Agent goes idle** — A \`session.status_idle\` event fires when there's nothing left to do

The entire cycle is asynchronous. Your application opens an SSE stream, sends a message, and processes events as they arrive. Long-running tasks that take minutes or hours work exactly the same as quick ones.

---

## Available Tools

Managed Agents ships with a comprehensive built-in toolset. All tools are enabled by default when you include \`agent_toolset_20260401\` in your agent configuration.

| Tool | Name | What It Does |
|---|---|---|
| **Bash** | \`bash\` | Execute shell commands in the container |
| **Read** | \`read\` | Read files from the local filesystem |
| **Write** | \`write\` | Write files to the local filesystem |
| **Edit** | \`edit\` | Perform string replacement in files |
| **Glob** | \`glob\` | Fast file pattern matching |
| **Grep** | \`grep\` | Regex-powered text search |
| **Web Fetch** | \`web_fetch\` | Fetch content from URLs |
| **Web Search** | \`web_search\` | Search the web for information |

### Configuring Tools

You don't have to use everything. Disable specific tools or enable only what you need:

\`\`\`python
# Disable web access entirely
agent = client.beta.agents.create(
    name="Offline Analyst",
    model="claude-sonnet-4-6",
    tools=[
        {
            "type": "agent_toolset_20260401",
            "configs": [
                {"name": "web_fetch", "enabled": False},
                {"name": "web_search", "enabled": False},
            ],
        },
    ],
)
\`\`\`

Or start with everything off and enable only what you need:

\`\`\`json
{
  "type": "agent_toolset_20260401",
  "default_config": { "enabled": false },
  "configs": [
    { "name": "bash", "enabled": true },
    { "name": "read", "enabled": true },
    { "name": "write", "enabled": true }
  ]
}
\`\`\`

This scoping is critical for security and focus — a data analysis agent doesn't need to write files, and a code generator doesn't need web search.

### Custom Tools

Beyond built-in tools, you can define custom tools that your application executes. Claude decides when to call them; your code handles the execution and sends results back.

\`\`\`python
agent = client.beta.agents.create(
    name="Support Agent",
    model="claude-sonnet-4-6",
    tools=[
        {"type": "agent_toolset_20260401"},
        {
            "type": "custom",
            "name": "lookup_customer",
            "description": "Look up a customer by email or ID. Returns account details, subscription status, and recent support tickets.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "identifier": {
                        "type": "string",
                        "description": "Customer email address or account ID",
                    },
                },
                "required": ["identifier"],
            },
        },
    ],
)
\`\`\`

Custom tools let you connect Managed Agents to your internal systems — databases, APIs, CRMs, ticketing systems — without exposing those systems directly.

### MCP Servers

Managed Agents also supports [MCP (Model Context Protocol) servers](/blog/mcp-servers-guide), letting you connect to external tool providers. This means you can reuse existing MCP integrations from the broader ecosystem.

---

## Getting Started: Your First Managed Agent

Here's the complete flow from zero to a working agent, using the Python SDK.

### Prerequisites

\`\`\`bash
pip install anthropic
export ANTHROPIC_API_KEY="your-api-key-here"
\`\`\`

All Managed Agents endpoints require the \`managed-agents-2026-04-01\` beta header. The SDK sets this automatically.

### Step 1: Create the Agent

\`\`\`python
from anthropic import Anthropic

client = Anthropic()

agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-sonnet-4-6",
    system="You are a helpful coding assistant. Write clean, well-documented code.",
    tools=[
        {"type": "agent_toolset_20260401"},
    ],
)

print(f"Agent ID: {agent.id}")
\`\`\`

### Step 2: Create an Environment

\`\`\`python
environment = client.beta.environments.create(
    name="quickstart-env",
    config={
        "type": "cloud",
        "networking": {"type": "unrestricted"},
    },
)

print(f"Environment ID: {environment.id}")
\`\`\`

### Step 3: Start a Session

\`\`\`python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    title="Quickstart session",
)

print(f"Session ID: {session.id}")
\`\`\`

### Step 4: Send a Message and Stream the Response

\`\`\`python
with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(
        session.id,
        events=[
            {
                "type": "user.message",
                "content": [
                    {
                        "type": "text",
                        "text": "Create a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt",
                    },
                ],
            },
        ],
    )

    for event in stream:
        match event.type:
            case "agent.message":
                for block in event.content:
                    print(block.text, end="")
            case "agent.tool_use":
                print(f"\\n[Using tool: {event.name}]")
            case "session.status_idle":
                print("\\n\\nAgent finished.")
                break
\`\`\`

The agent writes the script, runs it inside the container, and verifies the output — all autonomously.

### TypeScript Version

\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const agent = await client.beta.agents.create({
  name: "Coding Assistant",
  model: "claude-sonnet-4-6",
  system: "You are a helpful coding assistant.",
  tools: [{ type: "agent_toolset_20260401" }],
});

const environment = await client.beta.environments.create({
  name: "quickstart-env",
  config: { type: "cloud", networking: { type: "unrestricted" } },
});

const session = await client.beta.sessions.create({
  agent: agent.id,
  environment_id: environment.id,
  title: "Quickstart session",
});

const stream = await client.beta.sessions.events.stream(session.id);

await client.beta.sessions.events.send(session.id, {
  events: [{
    type: "user.message",
    content: [{ type: "text", text: "Create a hello world web server in Node.js" }],
  }],
});

for await (const event of stream) {
  if (event.type === "agent.message") {
    for (const block of event.content) {
      process.stdout.write(block.text);
    }
  } else if (event.type === "agent.tool_use") {
    console.log(\`\\n[Using tool: \${event.name}]\`);
  } else if (event.type === "session.status_idle") {
    console.log("\\n\\nAgent finished.");
    break;
  }
}
\`\`\`

### CLI Quick Start

Anthropic also provides the \`ant\` CLI for quick iteration:

\`\`\`bash
# Install
brew install anthropics/tap/ant

# Create agent
ant beta:agents create \\
  --name "Coding Assistant" \\
  --model claude-sonnet-4-6 \\
  --system "You are a helpful coding assistant." \\
  --tool '{type: agent_toolset_20260401}'

# Create environment
ant beta:environments create \\
  --name "quickstart-env" \\
  --config '{type: cloud, networking: {type: unrestricted}}'
\`\`\`

The CLI also accepts YAML for agent definitions, making it easy to version control your agent configurations.

---

## SDK Support

Managed Agents is available across all Anthropic SDKs:

| Language | Install |
|---|---|
| Python | \`pip install anthropic\` |
| TypeScript | \`npm install @anthropic-ai/sdk\` |
| Go | \`go get github.com/anthropics/anthropic-sdk-go\` |
| Java | \`implementation("com.anthropic:anthropic-java:2.20.0")\` |
| C# | \`dotnet add package Anthropic\` |
| Ruby | \`bundle add anthropic\` |
| PHP | \`composer require anthropic-ai/sdk\` |

Every SDK sets the required beta header automatically. The API surface is consistent across languages — if you know the Python flow, you know the TypeScript flow.

---

## Real-World Use Cases

### 1. Workflow Automation

Define agents that handle multi-step business processes — processing uploads, generating reports, updating databases — without building custom orchestration.

\`\`\`python
agent = client.beta.agents.create(
    name="Report Generator",
    model="claude-sonnet-4-6",
    system="""You generate weekly analytics reports. When given raw data:
    1. Clean and validate the data
    2. Calculate key metrics (DAU, retention, revenue)
    3. Generate visualizations using matplotlib
    4. Create a PDF report with findings and recommendations""",
    tools=[{"type": "agent_toolset_20260401"}],
)
\`\`\`

### 2. Customer Support Copilots

Agents that look up customer records, search knowledge bases, draft responses, and escalate when needed — all connected through custom tools to your existing systems.

### 3. Data Operations

Long-running data pipeline agents that fetch, transform, and load data across sources. The persistent container means your agent can install packages, run scripts, and process files over extended periods.

### 4. Code Review and Analysis

Agents that clone repositories, analyze code, run tests, and produce detailed review reports — leveraging the full container environment with git, language runtimes, and build tools.

### 5. Research and Summarization

Agents that search the web, fetch documents, cross-reference sources, and produce structured research outputs. Web search and fetch tools make this straightforward.

---

## Managed Agents vs. Building Your Own

If you've been building agent systems with the Messages API, here's how Managed Agents compares:

| Aspect | DIY with Messages API | Claude Managed Agents |
|---|---|---|
| **Agent loop** | You build and maintain it | Pre-built and optimized |
| **Tool execution** | You implement sandboxing | Secure containers provided |
| **State management** | You build persistence | Server-side session history |
| **Streaming** | You handle SSE parsing | Built-in SSE with typed events |
| **Context management** | Manual prompt caching, compaction | Automatic caching and compaction |
| **Long-running tasks** | Complex timeout handling | Native support for hours-long sessions |
| **Observability** | Build your own logging | Centralized event history |
| **Time to production** | Weeks to months | Days |

**When to use the Messages API**: You need a custom agent loop with non-standard behavior, fine-grained token-level control, or you're integrating into an existing agent framework.

**When to use Managed Agents**: You want to ship fast, your use case fits the standard agent pattern (prompt → tools → result), and you don't want to maintain infrastructure.

---

## Managed Agents vs. Claude Code Subagents

If you're already using [Claude Code subagents](/blog/claude-code-subagents-guide), you might wonder how Managed Agents fits in.

**Claude Code subagents** are local-first. They run on your machine within Claude Code sessions, spawn during interactive development, and are designed for developer workflows — code exploration, review, architecture, testing.

**Managed Agents** are cloud-first. They run on Anthropic's infrastructure, are designed for production workloads, and are accessed via API. They're what you deploy when you need agents running 24/7, triggered by events, or integrated into your product.

Think of subagents as your development-time agents and Managed Agents as your production-time agents.

---

## Security and Guardrails

Managed Agents runs in sandboxed containers with configurable security controls:

- **Network isolation** — Restrict container networking to specific domains or disable it entirely
- **Tool scoping** — Enable only the tools your agent needs
- **Container isolation** — Each session runs in its own container
- **Centralized observability** — All events are logged and retrievable via API
- **Policy enforcement** — System prompts and tool restrictions are enforced at the platform level

For regulated industries, the managed runtime centralizes compliance overhead — you audit one platform instead of auditing every agent deployment.

---

## Pricing and Rate Limits

Managed Agents is in public beta and available to all API accounts. Rate limits are per organization:

| Operation | Limit |
|---|---|
| Create endpoints (agents, sessions, environments) | 60 requests per minute |
| Read endpoints (retrieve, list, stream) | 600 requests per minute |

Standard organization-level spend limits and tier-based rate limits also apply. Container compute costs are included in the API usage — you pay for the tokens consumed, not the infrastructure.

---

## What's Coming Next

Several features are currently in research preview, available by request:

- **Outcomes** — Define success criteria for agent sessions and measure performance against them
- **Multi-agent** — Coordinate multiple agents within a single workflow, each with specialized roles
- **Memory** — Persistent agent memory that carries across sessions, enabling agents that learn from past interactions

These features signal where Managed Agents is heading: from running individual agent sessions to orchestrating entire agent teams with persistent knowledge and measurable outcomes.

---

## Getting Started Today

1. **Get an API key** from the Anthropic Console
2. **Install the SDK** for your language of choice
3. **Create an agent** with a system prompt and tools
4. **Create an environment** with the packages you need
5. **Start a session** and send your first message

The beta header \`managed-agents-2026-04-01\` is required on all requests. The SDK handles this automatically.

If you're already building with the Messages API, the migration path is straightforward: your system prompts transfer directly, your tool definitions map to the built-in toolset or custom tools, and your application logic stays the same — you just stop managing the agent loop and container infrastructure.

The gap between "I have an agent prototype" and "I have an agent in production" just got a lot smaller.

---

*Learn how to build custom agents with [the complete agents guide](/blog/claude-code-agents-guide), explore [subagent orchestration patterns](/blog/claude-code-subagents-guide), or connect external tools with [MCP servers](/blog/mcp-servers-guide).*
`,
};
