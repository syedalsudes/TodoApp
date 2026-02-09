# Tool Specification

The AI agent uses function tools to interact with the Todo system.

## Tool: add_task
Adds a new task.

Parameters:
- title (string)

---

## Tool: list_tasks
Lists all tasks for the current user.

Parameters:
- none

---

## Tool: update_task
Updates a task title.

Parameters:
- task_id (integer)
- new_title (string)

---

## Tool: complete_task
Marks a task as completed.

Parameters:
- task_id (integer)

---

## Tool: delete_task
Deletes a task.

Parameters:
- task_id (integer)

---

All tools validate:
- Task ownership
- User authentication
