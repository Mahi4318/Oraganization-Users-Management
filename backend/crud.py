from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from models import Organisation, User
from schemas import OrganisationCreate, UserCreate # Assuming UserCreate now includes org_id

# --- Organisation functions remain the same ---

def create_organisation(db: Session, org: OrganisationCreate):
    new_org = Organisation(**org.dict())
    db.add(new_org)
    db.commit()
    db.refresh(new_org)
    return new_org

def get_organizations(db: Session):
    return db.query(Organisation).all()

def get_organization(db: Session, org_id: str):
    return db.query(Organisation).filter(Organisation.org_id == org_id).options(joinedload(Organisation.users)).first()

def delete_organization(db: Session, org_id: str):
    org = db.query(Organisation).filter(Organisation.org_id == org_id).first()
    if org:
        db.delete(org)
        db.commit()
    return org

# ----------------------------------------------
# --- UPDATED User functions ---

def create_user(db: Session, user: UserCreate, org_id: str):
    """
    Creates a new User record, associating it with the provided organisation ID.
    """
    # Create a dictionary of user data, adding the explicit org_id
    user_data = user.dict()
    user_data["org_id"] = org_id # This links the user to the organisation
    
    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_users(db: Session, org_id: str = None):
    """
    Retrieves users. If an org_id is provided, it filters the users 
    to include only those belonging to that organisation.
    """
    query = db.query(User)
    
    # If org_id is passed, apply the filter
    if org_id:
        query = query.filter(User.org_id == org_id)
        
    return query.all()

def delete_user(db: Session, user_id: str):
    user = db.query(User).filter(User.user_id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user

def update_organisation(db: Session, org_id: str, org_update):
    org = db.query(Organisation).filter(Organisation.org_id == org_id).first()
    if org:
        for key, value in org_update.dict(exclude_unset=True).items():
            setattr(org, key, value)
        db.commit()
        db.refresh(org)
    return org

def update_user(db: Session, user_id: str, user_update):
    user = db.query(User).filter(User.user_id == user_id).first()
    if user:
        for key, value in user_update.dict(exclude_unset=True).items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
    return user
