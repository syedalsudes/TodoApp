from agents import Agent
from agents.tool import FunctionTool
from tools.task_tools import (
    add_task_tool,
    list_tasks_tool,
    update_task_tool,
    complete_task_tool,
    delete_task_tool,
)

def create_todo_agent(user_id: str, session):
    
    # 1. Manual Tool Definitions
    
    add_task_tool_obj = FunctionTool(
        name="add_task",
        description="Add a new task to the todo list.",
        params_json_schema={
            "type": "object",
            "properties": {"title": {"type": "string", "description": "The title of the task"}},
            "required": ["title"]
        },
        on_invoke_tool=lambda title: add_task_tool(title=title, user_id=user_id, session=session)
    )

    list_tasks_tool_obj = FunctionTool(
        name="list_tasks",
        description="List all tasks for the current user.",
        params_json_schema={"type": "object", "properties": {}},
        on_invoke_tool=lambda: list_tasks_tool(user_id=user_id, session=session)
    )

    update_task_tool_obj = FunctionTool(
        name="update_task",
        description="Update a task title using its ID.",
        params_json_schema={
            "type": "object",
            "properties": {
                "task_id": {"type": "integer"},
                "new_title": {"type": "string"}
            },
            "required": ["task_id", "new_title"]
        },
        on_invoke_tool=lambda task_id, new_title: update_task_tool(task_id=task_id, new_title=new_title, user_id=user_id, session=session)
    )

    complete_task_tool_obj = FunctionTool(
        name="complete_task",
        description="Mark a task as completed using its ID.",
        params_json_schema={
            "type": "object",
            "properties": {"task_id": {"type": "integer"}},
            "required": ["task_id"]
        },
        on_invoke_tool=lambda task_id: complete_task_tool(task_id=task_id, user_id=user_id, session=session)
    )

    delete_task_tool_obj = FunctionTool(
        name="delete_task",
        description="Delete a task using its ID.",
        params_json_schema={
            "type": "object",
            "properties": {"task_id": {"type": "integer"}},
            "required": ["task_id"]
        },
        on_invoke_tool=lambda task_id: delete_task_tool(task_id=task_id, user_id=user_id, session=session)
    )

    # 2. Agent setup
    agent = Agent(
        name="Todo Assistant",
        model="gemini-1.5-flash",
        instructions="You are a helpful todo assistant. Use the provided tools to manage tasks.",
        tools=[
            add_task_tool_obj,
            list_tasks_tool_obj,
            update_task_tool_obj,
            complete_task_tool_obj,
            delete_task_tool_obj
        ],
    )

    return agent