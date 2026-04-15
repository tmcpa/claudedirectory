import { Prompt } from "@/lib/types";

export const bunHonoPrompt: Prompt = {
  slug: "bun-hono",
  title: "Bun + Hono API",
  description:
    "CLAUDE.md for high-performance TypeScript APIs built with Bun and Hono, including testing, middleware, and deployment conventions",
  tags: [
    "bun",
    "hono",
    "typescript",
    "api",
    "backend",
    "edge",
    "performance",
  ],
  featured: false,
  dateAdded: "2026-04-15",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "prompt", slug: "typescript", relationship: "works-with" },
    { type: "prompt", slug: "fastapi", relationship: "works-with" },
    { type: "agent", slug: "api-developer", relationship: "recommends" },
    { type: "agent", slug: "backend-architect", relationship: "recommends" },
  ],
  content: `# Bun + Hono API Project

## Commands
\`bun dev\` — Start dev server with hot reload on port 3000
\`bun test\` — Run the test suite (uses Bun's built-in test runner)
\`bun test --watch\` — Run tests in watch mode
\`bun run build\` — Build for production (outputs to dist/)
\`bun run lint\` — Run Biome linter and formatter
\`bun run typecheck\` — Run tsc --noEmit for type checking
\`bun run db:migrate\` — Apply database migrations
\`bun run db:generate\` — Generate migrations from schema changes

## Architecture
- **Runtime**: Bun (not Node.js) — use Bun-native APIs where available
- **Framework**: Hono for routing and middleware
- **Database**: PostgreSQL via Drizzle ORM
- **Validation**: Zod for request/response schemas, wired through Hono's validator
- **Testing**: \`bun:test\` — no Jest, no Vitest
- **Linting**: Biome (replaces ESLint + Prettier)
- **Deployment**: Targets both Bun servers and edge runtimes (Cloudflare Workers, Deno Deploy)

## Project Structure
\`\`\`
src/
├── index.ts              # App entry — creates Hono app, mounts routes
├── env.ts                # Typed environment variables via Zod
├── db/
│   ├── schema.ts         # Drizzle table definitions
│   ├── client.ts         # Database client factory
│   └── migrations/       # Generated migrations
├── routes/               # One file per resource (users.ts, posts.ts)
├── middleware/           # Auth, logging, error handling
├── services/             # Business logic (called by routes)
├── lib/                  # Shared utilities
└── __tests__/            # Test files colocated or in __tests__
\`\`\`

## Code Conventions
- Use Hono's \`zValidator\` middleware for request validation — never parse \`c.req.json()\` directly without a schema
- Route handlers are thin — delegate to services for any non-trivial logic
- Prefer \`Bun.file()\`, \`Bun.write()\`, and \`Bun.env\` over Node equivalents
- Use Drizzle's query builder, not raw SQL strings, except for complex reporting queries
- Share types between routes and clients via a \`types.ts\` per route (export request/response inferred from Zod)
- Error handling: let Hono's \`onError\` handle unknown errors, throw \`HTTPException\` for expected ones

## Hono Patterns
\`\`\`typescript
// Good: validated, typed, thin handler
app.post(
  "/users",
  zValidator("json", createUserSchema),
  async (c) => {
    const input = c.req.valid("json");
    const user = await userService.create(input);
    return c.json(user, 201);
  },
);
\`\`\`

- Use \`c.json()\` with explicit status codes for non-200 responses
- Middleware order matters: logger → CORS → auth → routes → errorHandler
- Keep the app composable: build sub-apps per resource and mount them

## Testing
- Use \`bun:test\` — \`import { test, expect, describe } from "bun:test"\`
- Integration tests call Hono apps directly via \`app.request()\` — no HTTP server needed
- Use a test database via Docker Compose or Testcontainers — never mock Drizzle
- Reset database state between tests via transactions that roll back

\`\`\`typescript
import { test, expect } from "bun:test";
import { app } from "../src/index";

test("POST /users creates a user", async () => {
  const res = await app.request("/users", {
    method: "POST",
    body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
    headers: { "Content-Type": "application/json" },
  });
  expect(res.status).toBe(201);
  const body = await res.json();
  expect(body.name).toBe("Alice");
});
\`\`\`

## Environment & Config
- All env vars parsed through Zod in \`env.ts\` — fails fast at startup if anything is missing
- Never read \`process.env\` or \`Bun.env\` outside \`env.ts\`
- \`.env.example\` must stay in sync with the Zod schema

## Performance
- Bun is fast — don't add caching or worker pools until benchmarks justify it
- Use Drizzle's prepared statements for hot-path queries
- Prefer streaming responses for large payloads via \`c.body()\` with a ReadableStream

## Things to Avoid
- Do NOT use Express middleware — Hono has its own ecosystem
- Do NOT use \`node:\` imports unless Bun doesn't provide an alternative
- Do NOT introduce Jest, Vitest, or ts-node — Bun runs TypeScript natively and has a built-in test runner
- Do NOT parse request bodies without a Zod schema
- Do NOT put business logic in route handlers — use services
- Do NOT hardcode configuration — use the typed \`env.ts\` module
`,
};
