import { Prompt } from "@/lib/types";

export const rustPrompt: Prompt = {
  slug: "rust",
  title: "Rust Development",
  description: "CLAUDE.md for Rust projects with cargo workflows and safety patterns",
  tags: ["rust", "cargo", "systems", "backend"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Rust Project

This is a Rust project using Cargo.

## Project Structure
- \`src/main.rs\` - Binary entry point
- \`src/lib.rs\` - Library root
- \`src/bin/\` - Additional binaries
- \`tests/\` - Integration tests
- \`benches/\` - Benchmarks

## Code Style
- Follow Rust API guidelines
- Use rustfmt for formatting
- Use clippy for linting
- Prefer &str over String for function parameters

## Error Handling
- Use Result<T, E> for recoverable errors
- Use thiserror for library error types
- Use anyhow for application error handling
- Avoid unwrap() in production code

## Ownership & Borrowing
- Prefer borrowing over cloning
- Use Cow<str> when ownership is conditional
- Minimize lifetime annotations where possible
- Use Arc/Mutex only when truly needed

## Commands
- \`cargo run\` - Run the application
- \`cargo test\` - Run all tests
- \`cargo build --release\` - Build optimized binary
- \`cargo clippy\` - Run linter
- \`cargo fmt\` - Format code
- \`cargo doc --open\` - Generate and open docs
`,
};
