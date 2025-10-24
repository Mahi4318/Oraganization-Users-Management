from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend.database.database import engine, Base, get_db
from models import Organisation, User
from routers import organisations
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Organization & Users Management")

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
