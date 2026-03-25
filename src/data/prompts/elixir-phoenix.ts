import { Prompt } from "@/lib/types";

export const elixirPhoenixPrompt: Prompt = {
  slug: "elixir-phoenix",
  title: "Elixir / Phoenix Development",
  description:
    "CLAUDE.md template for Elixir and Phoenix projects with OTP patterns, LiveView, Ecto, and functional programming best practices",
  tags: ["elixir", "phoenix", "functional", "erlang", "otp", "liveview"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Elixir / Phoenix Project

This is an Elixir project using the Phoenix framework.

## Tech Stack
- Elixir with OTP
- Phoenix Framework (LiveView for interactive UIs)
- Ecto for database interactions
- PostgreSQL as the database
- Tailwind CSS for styling

## Project Structure
- \\\`lib/app_name/\\\` - Business logic (contexts)
- \\\`lib/app_name_web/\\\` - Web layer (controllers, views, LiveView)
- \\\`lib/app_name_web/live/\\\` - LiveView modules
- \\\`lib/app_name_web/components/\\\` - Reusable function components
- \\\`priv/repo/migrations/\\\` - Database migrations
- \\\`test/\\\` - Tests mirroring the lib/ structure
- \\\`config/\\\` - Environment-specific configuration

## Commands
- \\\`mix phx.server\\\` - Start the Phoenix development server
- \\\`mix test\\\` - Run the test suite
- \\\`mix test --cover\\\` - Run tests with coverage
- \\\`mix format\\\` - Format code
- \\\`mix credo\\\` - Run static analysis
- \\\`mix dialyzer\\\` - Run type analysis
- \\\`mix ecto.migrate\\\` - Run database migrations
- \\\`mix ecto.rollback\\\` - Rollback last migration
- \\\`mix ecto.reset\\\` - Drop, create, and migrate database
- \\\`iex -S mix phx.server\\\` - Start server with interactive shell

## Conventions

### Elixir Style
- Use pattern matching over conditional logic whenever possible
- Prefer the pipe operator |> for data transformations
- Use guard clauses for function specialization
- Keep functions small — extract private helpers freely
- Use @doc and @spec attributes for public functions
- Prefer immutable data — never mutate; transform and return new data
- Use \\\`with\\\` for chaining operations that may fail
- Return tagged tuples: {:ok, result} or {:error, reason}

### Phoenix Contexts
- Business logic belongs in contexts (lib/app_name/), not controllers
- Contexts are the public API — controllers and LiveView call contexts
- Each context is a bounded module grouping related functionality
- Keep controllers thin — validate input, call context, render response

### Ecto
- Changesets handle all data validation
- Use Ecto.Multi for transactions spanning multiple operations
- Prefer explicit queries over lazy-loading associations
- Use preload for associations needed in the response
- Write migrations that are reversible when possible

### LiveView
- Use function components (Phoenix.Component) for stateless UI
- Use LiveView modules for stateful, interactive pages
- Handle events with handle_event/3 callbacks
- Use assigns and streams for managing state
- Keep socket assigns minimal — derive computed values in render

### Testing
- Use ExUnit for all tests
- Use \\\`async: true\\\` for tests that don't share database state
- Use factories or fixtures (not seeds) for test data
- Test contexts independently from the web layer
- Use ConnTest for controller/LiveView integration tests
- Use DataCase for context unit tests

### Error Handling
- Use {:ok, result} / {:error, reason} tuples for expected failures
- Use \\\`with\\\` to chain failable operations cleanly
- Let unexpected errors crash — the supervisor will restart the process
- Log errors with Logger, include relevant metadata
- Return user-friendly errors from controllers, detailed errors in logs

### OTP Patterns
- Use GenServer for stateful processes
- Use Supervisor trees for fault tolerance
- Use Task for one-off async work
- Use Agent only for simple state wrappers
- Name processes with the Registry when you need dynamic lookup
`,
};
