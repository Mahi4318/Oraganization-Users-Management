from pydantic import BaseModel
from typing import List, Optional, ForwardRef
from datetime import datetime

# --- User Schemas (defined first to avoid circular dependency) ---

class UserBase(BaseModel):
    user_name: str
    user_role: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    user_id: str
    org_id: str
    created_date: datetime
    updated_date: datetime

    class Config:
        from_attributes = True

# --- Organisation Schemas ---

class OrganisationBase(BaseModel):
    org_name: str
    org_mail: Optional[str] = None
    org_contact: Optional[str] = None
    org_slug: Optional[str] = None
    status: Optional[str] = "Active"
    pending_requests: Optional[int] = 0
    primary_admin_name: Optional[str] = None
    primary_admin_mail: Optional[str] = None
    support_email: Optional[str] = None
    phone: Optional[str] = None
    alt_phone: Optional[str] = None
    max_coordinators: Optional[int] = 5
    timezone_common: Optional[str] = "India Standard Time"
    timezone_region: Optional[str] = "Asia/Colombo"
    language: Optional[str] = "English"
    website_url: Optional[str] = None

class OrganisationCreate(OrganisationBase):
    pass

class OrganisationUpdate(BaseModel):
    org_name: Optional[str] = None
    org_mail: Optional[str] = None
    org_contact: Optional[str] = None
    org_slug: Optional[str] = None
    status: Optional[str] = None
    pending_requests: Optional[int] = None
    primary_admin_name: Optional[str] = None
    primary_admin_mail: Optional[str] = None
    support_email: Optional[str] = None
    phone: Optional[str] = None
    alt_phone: Optional[str] = None
    max_coordinators: Optional[int] = None
    timezone_common: Optional[str] = None
    timezone_region: Optional[str] = None
    language: Optional[str] = None
    website_url: Optional[str] = None

class OrganisationResponse(OrganisationBase):
    org_id: str
    created_date: datetime
    updated_date: datetime
    users: List[UserResponse] = []

    class Config:
        from_attributes = True
