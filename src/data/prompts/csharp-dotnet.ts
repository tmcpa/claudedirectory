import { Prompt } from "@/lib/types";

export const csharpDotnetPrompt: Prompt = {
  slug: "csharp-dotnet",
  title: "C# / .NET Development",
  description: "CLAUDE.md for C# and .NET projects with modern patterns",
  tags: ["csharp", "dotnet", "aspnet", "backend", "api"],
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Code Community",
  },
  content: `# C# / .NET Project

This is a .NET project following modern C# conventions and patterns.

## Project Structure
- \`src/\` - Source projects
- \`src/Api/\` - ASP.NET API project
- \`src/Domain/\` - Domain models and interfaces
- \`src/Infrastructure/\` - Data access and external services
- \`tests/\` - Test projects

## Code Style
- Use C# 12+ features (primary constructors, collection expressions)
- Use nullable reference types
- Use file-scoped namespaces
- Follow .NET naming conventions (PascalCase for public, _camelCase for private fields)

## Conventions
- Use dependency injection for all services
- Use minimal APIs or controller-based APIs consistently
- Use records for DTOs and value objects
- Use async/await throughout the stack
- Use IOptions pattern for configuration

## Architecture
- Clean Architecture or Vertical Slice Architecture
- Separate domain logic from infrastructure
- Use MediatR for CQRS patterns when applicable
- Use Entity Framework Core for data access
- Use FluentValidation for input validation

## Error Handling
- Use Result pattern or exceptions with middleware
- Use ProblemDetails for API error responses
- Log with structured logging (Serilog)
- Use global exception handling middleware

## Commands
- \`dotnet run\` - Start the application
- \`dotnet test\` - Run all tests
- \`dotnet build\` - Build the solution
- \`dotnet ef migrations add <Name>\` - Add migration
`,
};
