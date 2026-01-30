# Backend – Claude Code Instructions

## Stack
- FastAPI
- SQLModel
- PostgreSQL (Neon)

## Project Structure
- main.py → FastAPI app entry
- models.py → SQLModel models
- db.py → database connection
- routes/ → API route handlers
- auth.py → JWT verification logic

## API Rules
- All routes start with /api
- All routes require JWT authentication
- Validate user identity from token
- Enforce user ownership in every query

## Authentication
- Extract JWT from Authorization header
- Verify token using BETTER_AUTH_SECRET
- Decode user_id from token

## Database
- Use SQLModel sessions
- Filter tasks by user_id in every query

## Error Handling
- 401 for unauthenticated access
- 403 for unauthorized access
- 404 for missing resources

## Constraints
- Do not write manual SQL
- Use SQLModel ORM only
