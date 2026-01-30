from fastapi import Depends
from sqlmodel import Session
from db import get_session
from auth import get_current_user

def db_session(session: Session = Depends(get_session)):
    return session

def current_user(user_id: str = Depends(get_current_user)):
    return user_id
