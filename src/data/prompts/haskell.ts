import { Prompt } from "@/lib/types";

export const haskellPrompt: Prompt = {
  slug: "haskell",
  title: "Haskell Development",
  description:
    "CLAUDE.md for Haskell projects with GHC, Cabal/Stack, and functional programming patterns",
  tags: ["haskell", "functional", "ghc", "cabal", "backend"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Haskell Project

This is a Haskell project using GHC and Cabal/Stack.

## Project Structure
- \`app/Main.hs\` - Application entry point
- \`src/\` - Library source modules
- \`test/\` - Test suites
- \`bench/\` - Benchmarks
- \`*.cabal\` or \`package.yaml\` - Package definition

## Code Style
- Follow the Haskell Style Guide
- Use explicit export lists for all modules
- Prefer qualified imports for clarity
- Use hlint suggestions unless they reduce readability
- Keep functions small and composable
- Write type signatures for all top-level definitions

## Type System
- Leverage the type system to eliminate invalid states
- Use newtypes for domain types instead of raw primitives
- Prefer sum types (ADTs) for modeling alternatives
- Use phantom types or GADTs when extra type safety is needed
- Avoid partial functions (head, tail, fromJust) — use safe alternatives

## Error Handling
- Use Either for recoverable errors with typed error values
- Use ExceptT for monadic error handling
- Avoid exceptions for control flow — reserve for truly exceptional cases
- Provide descriptive error types, not just strings

## Performance
- Use strict fields in data types where appropriate
- Profile before optimizing — use +RTS -p
- Prefer Text over String for text processing
- Use ByteString for binary data
- Be mindful of lazy evaluation and space leaks

## Testing
- Use Hspec for unit and integration tests
- Use QuickCheck for property-based testing
- Test pure functions exhaustively — they're easy to test
- Use tasty as the test framework runner

## Commands
- \`cabal build\` - Build the project
- \`cabal run\` - Run the application
- \`cabal test\` - Run all tests
- \`cabal repl\` - Start interactive REPL
- \`hlint src/\` - Run linter
- \`fourmolu -i src/\` - Format source code
- \`ghcid\` - Fast type-checking on file changes
`,
};
