import { Prompt } from "@/lib/types";

export const djangoPrompt: Prompt = {
  slug: "django",
  title: "Django Development",
  description: "CLAUDE.md for Django web applications with REST framework and modern Python patterns",
  tags: ["django", "python", "backend", "rest-api", "web"],
  dateAdded: "2026-03-22",
  author: {
    name: "Claude Code Community",
  },
  content: `# Django Project

This is a Django project using Django REST Framework for API development.

## Project Structure
- \`manage.py\` - Django management script
- \`config/\` - Project settings and root URL config
- \`apps/\` - Django applications
- \`apps/<name>/models.py\` - Database models
- \`apps/<name>/views.py\` - Views and viewsets
- \`apps/<name>/serializers.py\` - DRF serializers
- \`apps/<name>/urls.py\` - URL routing
- \`apps/<name>/tests/\` - App-level tests
- \`templates/\` - Django templates
- \`static/\` - Static files

## Code Style
- Follow PEP 8 and Django coding style
- Use type hints for function signatures
- Use class-based views for complex logic, function-based for simple endpoints
- Keep models lean, use managers and querysets for complex queries
- Write docstrings for models, views, and utility functions

## Conventions
- Use Django ORM for all database operations (no raw SQL unless necessary)
- Use DRF serializers for input validation and output formatting
- Use Django signals sparingly, prefer explicit service functions
- Use \`select_related()\` and \`prefetch_related()\` to avoid N+1 queries
- Use environment variables for secrets (django-environ)
- Use Django migrations for all schema changes

## Commands
- \`python manage.py runserver\` - Start development server
- \`python manage.py test\` - Run tests
- \`python manage.py makemigrations\` - Create new migrations
- \`python manage.py migrate\` - Apply migrations
- \`python manage.py shell_plus\` - Enhanced Django shell
- \`ruff check .\` - Run linter
`,
};
