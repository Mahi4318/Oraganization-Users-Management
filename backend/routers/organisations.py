from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import crud, schemas

router = APIRouter(prefix="/organisations", tags=["Organisations"])

@router.post("/", response_model=schemas.OrganisationResponse)
def create_org(org: schemas.OrganisationCreate, db: Session = Depends(get_db)):
    return crud.create_organisation(db, org)

@router.get("/", response_model=list[schemas.OrganisationResponse])
def get_orgs(db: Session = Depends(get_db)):
    return crud.get_organizations(db)

@router.get("/{org_id}", response_model=schemas.OrganisationResponse)
def get_org(org_id: str, db: Session = Depends(get_db)):
    db_org = crud.get_organization(db, org_id)
    if db_org is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_org

@router.put("/{org_id}", response_model=schemas.OrganisationResponse)
def update_org(org_id: str, org_update: schemas.OrganisationUpdate, db: Session = Depends(get_db)):
    db_org = crud.update_organisation(db, org_id, org_update)
    if db_org is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_org

@router.put("/{org_id}/status")
def update_org_status(org_id: str, status: str, db: Session = Depends(get_db)):
    if status not in ["Active", "Blocked", "Inactive"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    db_org = crud.update_organisation(db, org_id, schemas.OrganisationUpdate(status=status))
    if db_org is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return {"message": "Status updated successfully", "status": status}

@router.delete("/{org_id}", response_model=schemas.OrganisationResponse)
def delete_org(org_id: str, db: Session = Depends(get_db)):
    db_org = crud.delete_organization(db, org_id)
    if db_org is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_org

# User endpoints under organisations
@router.post("/{org_id}/users", response_model=schemas.UserResponse)
def create_user_for_org(org_id: str, user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if organization exists
    org = crud.get_organization(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return crud.create_user(db, user, org_id)

@router.put("/{org_id}/users/{user_id}", response_model=schemas.UserResponse)
def update_user_in_org(org_id: str, user_id: str, user_update: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user belongs to organization
    user = crud.get_users(db, org_id)
    user = next((u for u in user if u.user_id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found in this organization")
    return crud.update_user(db, user_id, user_update)

@router.delete("/{org_id}/users/{user_id}", response_model=schemas.UserResponse)
def delete_user_from_org(org_id: str, user_id: str, db: Session = Depends(get_db)):
    # Check if user belongs to organization
    user = crud.get_users(db, org_id)
    user = next((u for u in user if u.user_id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found in this organization")
    return crud.delete_user(db, user_id)
