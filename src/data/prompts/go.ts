import { Prompt } from "@/lib/types";

export const goPrompt: Prompt = {
  slug: "go",
  title: "Go Development",
  description: "CLAUDE.md for Go projects with idiomatic patterns",
  tags: ["go", "golang", "backend", "api"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Go Project

This is a Go project following idiomatic Go patterns.

## Project Structure
- \`cmd/\` - Main applications
- \`internal/\` - Private application code
- \`pkg/\` - Public libraries
- \`api/\` - API definitions (OpenAPI, protobuf)

## Code Style
- Follow Effective Go guidelines
- Use gofmt for formatting
- Keep functions short and focused
- Return errors, don't panic

## Conventions
- Use short variable names in small scopes
- Use descriptive names for exported identifiers
- Prefix interface names with -er when appropriate
- Use table-driven tests

## Error Handling
- Always check returned errors
- Wrap errors with context using fmt.Errorf
- Use errors.Is and errors.As for error checking
- Return errors, don't log and continue

## Concurrency
- Use channels for communication
- Use sync.WaitGroup for goroutine coordination
- Be careful with shared state
- Prefer passing data over sharing memory

## Commands
- \`go run ./cmd/...\` - Run the application
- \`go test ./...\` - Run all tests
- \`go build ./...\` - Build all packages
- \`go mod tidy\` - Clean up dependencies
`,
};
