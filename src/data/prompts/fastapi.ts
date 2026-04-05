import { Prompt } from "@/lib/types";

export const fastapiPrompt: Prompt = {
  slug: "fastapi",
  title: "FastAPI Development",
  description:
    "Comprehensive CLAUDE.md for FastAPI projects with async patterns, Pydantic models, and SQLAlchemy integration",
  tags: [
    "fastapi",
    "python",
    "api",
    "async",
    "pydantic",
    "sqlalchemy",
    "backend",
  ],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "prompt", slug: "python", relationship: "works-with" },
    { type: "prompt", slug: "django", relationship: "works-with" },
    { type: "agent", slug: "backend-architect", relationship: "recommends" },
    { type: "agent", slug: "api-developer", relationship: "recommends" },
  ],
  content: `# FastAPI Project

## Commands
\`uvicorn app.main:app --reload\` — Start development server on port 8000
\`pytest\` — Run test suite
\`pytest --cov=app\` — Run tests with coverage report
\`alembic upgrade head\` — Apply database migrations
\`alembic revision --autogenerate -m "description"\` — Create new migration
\`ruff check .\` — Run linter
\`ruff format .\` — Format code
\`mypy app/\` — Type check

## Architecture
- **Framework**: FastAPI with async/await throughout
- **Database**: SQLAlchemy 2.0 async with PostgreSQL
- **Migrations**: Alembic for schema migrations
- **Validation**: Pydantic v2 models for request/response schemas
- **Auth**: JWT tokens via python-jose, password hashing with passlib
- **Testing**: pytest with httpx AsyncClient for API tests

## Project Structure
\`\`\`
app/
├── main.py              # FastAPI app factory, middleware, startup/shutdown
├── config.py            # Settings via pydantic-settings (reads .env)
├── dependencies.py      # Shared FastAPI dependencies (get_db, get_current_user)
├── models/              # SQLAlchemy ORM models
├── schemas/             # Pydantic request/response models
├── routers/             # API route modules (one per domain)
├── services/            # Business logic layer (called by routers)
├── repositories/        # Database query layer (called by services)
└── tests/
    ├── conftest.py      # Fixtures: async client, test DB, auth headers
    ├── test_routers/    # API integration tests
    └── test_services/   # Unit tests for business logic
\`\`\`

## Code Conventions
- All database operations use async SQLAlchemy sessions via \`async with\`
- Router functions are thin — delegate business logic to services/
- Use dependency injection for DB sessions: \`db: AsyncSession = Depends(get_db)\`
- Pydantic schemas separate Create, Update, and Response models (e.g., UserCreate, UserUpdate, UserResponse)
- All routes return typed Pydantic response models — never return raw dicts or ORM objects
- Use HTTPException for client errors (4xx), let unhandled exceptions become 500s
- Background tasks via FastAPI's BackgroundTasks, not Celery (unless explicitly needed)

## Error Handling
- Validation errors return 422 with Pydantic's default error format
- Business logic errors raise HTTPException with appropriate status codes
- Use custom exception handlers in main.py for domain-specific error types
- Never catch broad Exception — catch specific exception types

## Database Patterns
- Always use \`select()\` style queries (SQLAlchemy 2.0), not legacy \`query()\`
- Relationships use \`selectinload()\` or \`joinedload()\` to avoid N+1 queries
- Transactions are per-request — the dependency handles commit/rollback
- Use \`Annotated\` types for common column patterns (e.g., \`created_at\`, \`updated_at\`)

## Testing
- Tests use a separate test database (configured in conftest.py)
- Each test runs in a transaction that rolls back — tests don't affect each other
- Use \`httpx.AsyncClient\` with \`app=app\` for integration tests
- Factory functions in conftest.py for creating test data (e.g., \`create_test_user\`)
- Mock external services (email, payment) but hit the real test database

## Things to Avoid
- Do NOT use synchronous database drivers or blocking I/O in async routes
- Do NOT return SQLAlchemy models directly from routes — always use Pydantic schemas
- Do NOT put business logic in router functions — use the service layer
- Do NOT use \`*\` imports
- Do NOT hardcode configuration — use pydantic-settings and environment variables
- Do NOT use global mutable state — use FastAPI's dependency injection system
`,
};
