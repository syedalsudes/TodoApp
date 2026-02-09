# Chat API Specification

## Endpoint
POST /api/chat

## Request Body
{
  "message": "Add buy groceries"
}

## Response
{
  "reply": "Task added: buy groceries"
}

## Notes
- User must be authenticated
- The agent determines the appropriate tool
- Only text responses are returned
