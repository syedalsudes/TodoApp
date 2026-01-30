from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from db import engine
from routes.tasks import router as task_router

app = FastAPI(title="Hackathon Todo API")

# 🔴 CORS — THIS IS THE KEY
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],   # OPTIONS included
    allow_headers=["*"],   # Authorization allowed
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(task_router, prefix="/api")
