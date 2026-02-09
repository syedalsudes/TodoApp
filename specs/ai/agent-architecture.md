# Agent Architecture

The system follows a tool-driven agent architecture.

Flow:
User → Frontend Chat UI → /api/chat → AI Agent → Tools → Database

## Key Design Principles
- Stateless agent per request
- Authenticated user context
- Deterministic tool execution
- No hallucinated database operations

Each agent instance is bound to a single authenticated user.
