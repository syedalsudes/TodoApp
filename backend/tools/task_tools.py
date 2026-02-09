from typing import List
from sqlmodel import Session, select
from datetime import datetime

from models import Task



def add_task_tool(
    title: str,
    user_id: str,
    session: Session,
) -> str:
    task = Task(
        title=title,
        user_id=user_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    session.add(task)
    session.commit()
    session.refresh(task)

    return f"Task added: {task.title}"


# 🔹 List Tasks
def list_tasks_tool(
    user_id: str,
    session: Session,
) -> str:
    tasks: List[Task] = session.exec(
        select(Task).where(Task.user_id == user_id)
    ).all()

    if not tasks:
        return "You have no tasks."

    lines = []
    for task in tasks:
        status = "completed" if task.completed else "pending"
        lines.append(f"{task.id}. {task.title} ({status})")

    return "\n".join(lines)


# 🔹 Update / Edit Task
def update_task_tool(
    task_id: int,
    new_title: str,
    user_id: str,
    session: Session,
) -> str:
    task = session.exec(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id,
        )
    ).first()

    if not task:
        return "Task not found."

    task.title = new_title
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return f"Task updated: {task.title}"


# 🔹 Complete Task
def complete_task_tool(
    task_id: int,
    user_id: str,
    session: Session,
) -> str:
    task = session.exec(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id,
        )
    ).first()

    if not task:
        return "Task not found."

    task.completed = True
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return f"Task completed: {task.title}"


# 🔹 Delete Task
def delete_task_tool(
    task_id: int,
    user_id: str,
    session: Session,
) -> str:
    task = session.exec(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id,
        )
    ).first()

    if not task:
        return "Task not found."

    session.delete(task)
    session.commit()

    return f"Task deleted: {task.title}"
