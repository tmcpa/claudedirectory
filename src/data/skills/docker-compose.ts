import { Skill } from "@/lib/types";

export const dockerComposeSkill: Skill = {
  slug: "docker-compose",
  title: "Docker Compose Generator",
  description:
    "Generate and optimize Docker Compose configurations for multi-service applications with networking, volumes, and health checks",
  tags: ["docker", "containers", "compose", "devops", "infrastructure"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Docker Compose Generator Skill

Generate production-ready Docker Compose configurations based on your project's tech stack and requirements.

## Usage
\`\`\`
/docker-compose
\`\`\`

## Behavior
1. Analyze the project structure to detect services (app, database, cache, etc.)
2. Generate a docker-compose.yml with appropriate service definitions
3. Configure networking, volumes, health checks, and dependencies
4. Add environment variable templates with .env.example

## Features

### Service Detection
- Web frameworks (Next.js, Express, Django, Rails, etc.)
- Databases (PostgreSQL, MySQL, MongoDB, Redis)
- Message queues (RabbitMQ, Kafka)
- Search engines (Elasticsearch, Meilisearch)

### Configuration
- Multi-stage build Dockerfiles for production
- Named volumes for data persistence
- Custom networks for service isolation
- Health check definitions with proper intervals
- Dependency ordering with depends_on conditions

### Environment Management
- .env.example with all required variables
- Secret management recommendations
- Per-environment overrides (docker-compose.override.yml)

## Output
- docker-compose.yml with all detected services
- Dockerfile per service (if missing)
- .env.example with documentation
- README section on local development setup

## Example
\`\`\`
/docker-compose
\`\`\`
Analyzes your project and generates a complete Docker Compose setup.
`,
};
