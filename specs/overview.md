# Todo App – Overview

## Purpose
This project is part of Hackathon II: Spec-Driven Development.
The goal is to evolve a Todo application from a console app into a full-stack web application.

## Current Phase
Phase II – Full-Stack Web Application

## Tech Stack
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- Development Style: Spec-Driven Development using Claude Code + Spec-Kit Plus

## Core Features (Phase II)
- User authentication (signup / signin)
- Task CRUD operations
- Task completion toggle
- User-isolated data (each user sees only their own tasks)

## Constraints
- Code must be generated via Claude Code
- Manual coding is not allowed
- Specs are the single source of truth



## Phase 3 – AI Agent Integration

Phase 3 introduces an AI-powered Todo Assistant using an Agent-based architecture.
The agent allows users to manage tasks through natural language commands.

Key highlights:
- OpenAI Agent SDK–compatible architecture
- Tool-based execution (no direct DB access by AI)
- Secure user-scoped task management
- AI chat integrated with existing Todo system

The agent converts user messages into structured tool calls
to perform CRUD operations on tasks.
