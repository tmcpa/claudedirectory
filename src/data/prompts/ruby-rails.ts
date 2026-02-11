import { Prompt } from "@/lib/types";

export const rubyRailsPrompt: Prompt = {
  slug: "ruby-rails",
  title: "Ruby on Rails",
  description: "CLAUDE.md for Ruby on Rails applications with conventions and best practices",
  tags: ["ruby", "rails", "web", "backend", "api"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Ruby on Rails Project

This is a Ruby on Rails application following Rails conventions.

## Project Structure
- \`app/models/\` - ActiveRecord models
- \`app/controllers/\` - Request handlers
- \`app/views/\` - ERB/Haml templates
- \`app/services/\` - Service objects
- \`app/jobs/\` - Background jobs
- \`db/migrate/\` - Database migrations
- \`spec/\` or \`test/\` - Tests

## Conventions
- Follow Rails conventions (CoC)
- Use RESTful routing
- Fat models, skinny controllers
- Extract complex logic to service objects
- Use concerns for shared model behavior

## Database
- Always use migrations for schema changes
- Never edit schema.rb directly
- Use strong_migrations for safe deployments
- Index foreign keys and frequently queried columns

## Testing
- Write request specs for API endpoints
- Write model specs for validations and scopes
- Use FactoryBot for test data
- Use RSpec or Minitest as configured

## Commands
- \`bin/rails server\` - Start development server
- \`bin/rails console\` - Open Rails console
- \`bundle exec rspec\` - Run tests
- \`bin/rails db:migrate\` - Run migrations
- \`bin/rubocop\` - Run linter
`,
};
