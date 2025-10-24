from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
import backend.controllers.crud as crud, backend.schemas.schemas as schemas

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/users/", response_model=schemas.UserResponse)
def create_user_for_organization(
    org_id: str, user: schemas.UserCreate, db: Session = Depends(get_db)
):
    return crud.create_user(db=db, user=user, org_id=org_id)

@router.delete("/users/{user_id}", response_model=schemas.UserResponse)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.delete_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
