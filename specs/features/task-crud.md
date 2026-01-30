# Feature: Task CRUD Operations

## User Stories
- As a logged-in user, I can create a new task
- As a logged-in user, I can view all my tasks
- As a logged-in user, I can update a task
- As a logged-in user, I can delete a task
- As a logged-in user, I can mark a task as completed or incomplete

## Acceptance Criteria

### Create Task
- Title is required (1–200 characters)
- Description is optional (max 1000 characters)
- Task is associated with the authenticated user

### View Tasks
- Only tasks belonging to the authenticated user are returned
- Each task shows:
  - id
  - title
  - description
  - completed status
  - created_at timestamp

### Update Task
- User can update title and/or description
- User cannot update tasks belonging to other users

### Delete Task
- User can delete only their own tasks

### Mark as Complete
- Completed status can be toggled
- Default completed value is false

## Security Rules
- All operations require authentication
- Task ownership must be enforced at the database query level
