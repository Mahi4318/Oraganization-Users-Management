from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database.database import engine, Base, get_db
from models import Organisation, User
from routers import organisations
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Organization & Users Management")

# Get port from environment variable or use default
port = int(os.environ.get("PORT", 8000))

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_methods=["*"],
allow_headers=["*"],
)

app.include_router(organisations.router)

@app.get("/")
def get_all_organizations(db: Session = Depends(get_db)):
    """
    Returns a list of all organizations available in the database.
    """
    # 1. Query the database for all records in the Organization table
    organizations = db.query(Organisation).all()

    # 2. Return the list (FastAPI/Pydantic handles serialization)
    return organizations

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=port)
