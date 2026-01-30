# REST API Specification

## Base URL
- Local: http://localhost:8000

## Authentication
All endpoints require JWT token:
Authorization: Bearer <token>

## Endpoints

### GET /api/{user_id}/tasks
List all tasks for the authenticated user.

Response:
- Array of task objects

---

### POST /api/{user_id}/tasks
Create a new task.

Request Body:
- title: string (required)
- description: string (optional)

Response:
- Created task object

---

### GET /api/{user_id}/tasks/{id}
Get a single task by ID.

Response:
- Task object

---

### PUT /api/{user_id}/tasks/{id}
Update an existing task.

Request Body:
- title: string (optional)
- description: string (optional)

Response:
- Updated task object

---

### DELETE /api/{user_id}/tasks/{id}
Delete a task.

Response:
- Success confirmation

---

### PATCH /api/{user_id}/tasks/{id}/complete
Toggle task completion.

Response:
- Updated task object

## Error Handling
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Accessing another user's task
- 404 Not Found: Task does not exist
