import { Prompt } from "@/lib/types";

export const laravelPrompt: Prompt = {
  slug: "laravel",
  title: "PHP / Laravel Development",
  description: "CLAUDE.md for Laravel projects with modern PHP patterns",
  tags: ["php", "laravel", "backend", "web"],
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Code Community",
  },
  content: `# Laravel Project

This is a Laravel project following modern PHP and Laravel conventions.

## Project Structure
- \`app/Http/Controllers/\` - Request handlers
- \`app/Models/\` - Eloquent models
- \`app/Services/\` - Business logic services
- \`app/Repositories/\` - Data access layer
- \`database/migrations/\` - Database migrations
- \`routes/\` - Route definitions
- \`resources/views/\` - Blade templates
- \`tests/\` - Feature and unit tests

## Code Style
- Follow PSR-12 coding standard
- Use PHP 8.2+ features (enums, readonly properties, named arguments)
- Use type declarations for parameters and return types
- Use strict_types declaration in all files

## Conventions
- Use resource controllers for CRUD operations
- Use form requests for validation
- Use Eloquent scopes for reusable query logic
- Use events and listeners for side effects
- Use jobs and queues for async processing

## Database
- Write migrations for all schema changes
- Use Eloquent relationships (hasMany, belongsTo, etc.)
- Use database transactions for multi-step operations
- Seed test data using factories

## Testing
- Write feature tests for HTTP endpoints
- Write unit tests for services and business logic
- Use database transactions in tests for isolation
- Mock external services

## Commands
- \`php artisan serve\` - Start development server
- \`php artisan test\` - Run tests
- \`php artisan migrate\` - Run migrations
- \`composer run lint\` - Run code style checks
`,
};
