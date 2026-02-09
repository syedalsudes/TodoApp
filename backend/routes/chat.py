import os
from dotenv import load_dotenv

# 1. Environment variables load karein
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("GEMINI_API_KEY", "") 
os.environ["OPENAI_BASE_URL"] = "https://generativelanguage.googleapis.com/v1beta/openai/"

# 3. Ab baaki imports karein
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session
from agents import Runner
from dependencies import db_session, current_user
from ai_agents.todo_agent import create_todo_agent

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("", response_model=ChatResponse)
async def chat(
    data: ChatRequest,
    session: Session = Depends(db_session),
    user_id: str = Depends(current_user),
):
    # Agent load karein (ensure karein todo_agent.py mein model "gemini-1.5-flash" ho)
    agent = create_todo_agent(user_id=user_id, session=session)

    try:
        # Runner ko ab default settings milengi jo humne upar force ki hain
        result = await Runner.run(agent, data.message)
        return {"reply": result.final_output}
    except Exception as e:
        print(f"Error logic: {e}")
        return {"reply": f"Sorry, I'm having trouble connecting to my brain. Error: {str(e)}"}