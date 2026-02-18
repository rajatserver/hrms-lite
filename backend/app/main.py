from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import employees, attendance
import os

port = int(os.environ.get("PORT", 8000))

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

origins = os.environ.get("origins", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router)
app.include_router(attendance.router)


@app.get("/")
def health_check():
    return {"status": "HRMS Lite API running"}
