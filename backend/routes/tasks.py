from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from dependencies import db_session, current_user
from models import Task
from datetime import datetime
from schemas import TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["Tasks"])

# GET all tasks
@router.get("")
def get_tasks(
    session: Session = Depends(db_session),
    user: str = Depends(current_user),
):
    return session.exec(
        select(Task).where(Task.user_id == user)
    ).all()



# CREATE task
@router.post("", response_model=Task)
def create_task(
    data: TaskCreate,
    session: Session = Depends(db_session),
    user: str = Depends(current_user),
):
    task = Task(
        title=data.title,
        user_id=user
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


# UPDATE task
@router.put("/{task_id}")
def update_task(task_id: int, updated: TaskUpdate, session: Session = Depends(db_session), user: str = Depends(current_user)):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.title = updated.title
    task.updated_at = datetime.utcnow()
    
    session.add(task) # Add lazmi hai
    session.commit()
    session.refresh(task)
    return task

# DELETE task
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    session: Session = Depends(db_session),
    user: str = Depends(current_user),
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user)
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return {"success": True}



# TOGGLE complete
@router.patch("/{task_id}/complete")
def toggle_complete(task_id: int, session: Session = Depends(db_session), user: str = Depends(current_user)):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    session.add(task) # State update ke liye zaroori hai
    session.commit()
    session.refresh(task)
    return task