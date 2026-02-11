import { Skill } from "@/lib/types";

export const apiDocsSkill: Skill = {
  slug: "api-docs",
  title: "API Documentation Generator",
  description: "Analyze API endpoints in your codebase and generate OpenAPI/Swagger documentation automatically",
  tags: ["api", "openapi", "swagger", "documentation", "rest"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# API Documentation Generator

Automatically generate OpenAPI 3.0 specifications from your API codebase.

## Overview

This skill scans your API routes, controllers, and handlers to produce:

- **OpenAPI 3.0 Spec** - Complete YAML/JSON specification
- **Endpoint Catalog** - All routes with methods, parameters, and responses
- **Schema Definitions** - Request/response body schemas from types
- **Authentication Docs** - Security scheme documentation

## Supported Frameworks

- Express.js / Fastify / Hono
- Next.js API Routes / Route Handlers
- Django REST Framework
- Flask / FastAPI
- Spring Boot
- Ruby on Rails

## Usage

Invoke with: "Generate API documentation for this project"

Options:
- "Generate OpenAPI spec in YAML format"
- "Document the /api/users endpoints"
- "Create a Swagger spec with example responses"

## Output

Generates an \`openapi.yaml\` or \`openapi.json\` file at your project root that can be used with Swagger UI, Redoc, or any OpenAPI-compatible tool.
`,
};
