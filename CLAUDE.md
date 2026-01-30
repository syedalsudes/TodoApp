# Hackathon II – Todo App (Root Claude Instructions)

## Project Overview
This is a monorepo project built using Spec-Kit Plus and Claude Code.
The project follows strict Spec-Driven Development.
All implementations notice specs as the single source of truth.

Current Phase: Phase II – Full-Stack Web Application

## Repository Structure
- /specs → All specifications (features, API, database, UI)
- /frontend → Next.js frontend
- /backend → FastAPI backend
- /.spec-kit → Spec-Kit configuration

## Spec Rules (VERY IMPORTANT)
- Do NOT write code manually
- Always read relevant spec files before implementing
- Implement ONLY what is written in the spec
- If something is missing or unclear, STOP and request spec clarification
- Never invent features or fields

## How to Reference Specs
Use Spec-Kit references like:

@specs/overview.md  
@specs/features/task-crud.md  
@specs/features/authentication.md  
@specs/api/rest-endpoints.md  
@specs/database/schema.md  
@specs/ui/pages.md  

## Development Workflow
1. Read spec
2. Generate backend implementation
3. Generate frontend implementation
4. Verify against acceptance criteria
5. Iterate by improving specs (not code)

## Stack Summary
Frontend:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (JWT)

Backend:
- FastAPI
- SQLModel
- PostgreSQL (Neon)
- JWT authentication

## Authentication Contract
- Frontend issues JWT via Better Auth
- JWT sent as Authorization: Bearer <token>
- Backend verifies token using BETTER_AUTH_SECRET
- user_id is extracted from token and enforced in all queries

## Constraints
- Backend is stateless
- Task ownership must be enforced at query level
- Each user can only access their own data

## Execution Priority
1. Database schema
2. Authentication middleware
3. Task CRUD APIs
4. Frontend pages and components
