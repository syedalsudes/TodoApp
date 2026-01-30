# Feature: Authentication

## Overview
Authentication is handled using Better Auth on the frontend.
The backend uses JWT tokens to verify user identity.

## Authentication Flow
1. User signs up or logs in via Better Auth (Next.js frontend)
2. Better Auth issues a JWT token
3. Frontend includes the token in every API request:
   Authorization: Bearer <token>
4. Backend verifies the JWT token
5. Backend extracts user_id from token
6. Backend enforces user-based access control

## Requirements
- JWT verification must be implemented in FastAPI
- Requests without a valid token must return 401 Unauthorized
- User ID from JWT must match the user_id in the API route

## Shared Secret
- JWT signing and verification use the same secret
- Environment variable:
  BETTER_AUTH_SECRET

## Security Guarantees
- Users cannot access other users’ tasks
- Backend is stateless
- Tokens have expiration
