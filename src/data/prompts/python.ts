import { Prompt } from "@/lib/types";

export const pythonPrompt: Prompt = {
  slug: "python",
  title: "Python Development",
  description: "CLAUDE.md for Python projects with modern tooling and best practices",
  tags: ["python", "fastapi", "django", "flask"],
  featured: true,
  author: {
    name: "Claude Code Community",
  },
  content: `# Python Project

This is a Python project following modern best practices.

## Environment
- Python 3.11+
- Virtual environment using venv or poetry
- Type hints for all function signatures

## Project Structure
- \`src/\` - Main application code
- \`tests/\` - Test files (pytest)
- \`requirements.txt\` or \`pyproject.toml\` - Dependencies

## Code Style
- Follow PEP 8 style guidelines
- Use type hints for function parameters and return types
- Use dataclasses or Pydantic for data models
- Prefer f-strings for string formatting
- Use pathlib for file paths

## Conventions
- Use snake_case for variables and functions
- Use PascalCase for classes
- Use UPPER_CASE for constants
- Keep functions small and focused
- Write docstrings for public functions

## Testing
- Use pytest for testing
- Write unit tests for all business logic
- Use fixtures for test setup
- Aim for high test coverage

## Commands
- \`python -m pytest\` - Run tests
- \`python -m pip install -r requirements.txt\` - Install dependencies
- \`python -m black .\` - Format code
- \`python -m mypy .\` - Type check
`,
};
