from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID as PG_UUID # Import for PostgreSQL UUID support (optional, but good practice)
import uuid # For generating default UUIDs
from database import Base # Assuming 'Base' is imported from your database setup

# ----------------------------------------------------------------------------------
# Organisation Model (Updated with UUID and Timestamps)
# ----------------------------------------------------------------------------------

class Organisation(Base):
    __tablename__ = "organisation"

    # Changed PK from Integer to String(36) to store a UUID string
    # default=str(uuid.uuid4()) generates a new UUID when a record is created
    org_id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    org_name = Column(String(100), unique=True, nullable=False)
    org_mail = Column(String(100))
    org_contact = Column(String(50))
    org_slug = Column(String(100), unique=True)

    # New: Status (Active, Blocked, Inactive)
    status = Column(String(20), default="Active", nullable=False)

    # New: Pending requests count
    pending_requests = Column(Integer, default=0, nullable=False)

    # New: Primary admin details
    primary_admin_name = Column(String(100))
    primary_admin_mail = Column(String(100))

    # New: Support email
    support_email = Column(String(100))

    # New: Phone numbers
    phone = Column(String(20))
    alt_phone = Column(String(20))

    # New: Max coordinators
    max_coordinators = Column(Integer, default=5)

    # New: Timezone
    timezone_common = Column(String(50), default="India Standard Time")
    timezone_region = Column(String(50), default="Asia/Colombo")

    # New: Language
    language = Column(String(50), default="English")

    # New: Website URL
    website_url = Column(String(200))

    # New: Created Date (sets on insert, never changes)
    created_date = Column(DateTime, default=func.now(), nullable=False)
    # New: Updated Date (sets on insert and updates on every record change)
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    # Defines the 'one' side of the relationship
    users = relationship("User", back_populates="organisation", cascade="all, delete")

# ----------------------------------------------------------------------------------
# User Model (Updated with UUID, Foreign Key Update, and Timestamps)
# ----------------------------------------------------------------------------------

class User(Base):
    __tablename__ = "user"

    # Changed PK from Integer to String(36) to store a UUID string
    user_id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    user_name = Column(String(100), nullable=False)
    user_role = Column(String(50))

    # Updated: The Foreign Key column type must match the PK column type of 'organisation' (String(36))
    # It references the PRIMARY KEY of the 'organisation' table.
    org_id = Column(String(36), ForeignKey("organisation.org_id"))

    # New: Created Date
    created_date = Column(DateTime, default=func.now(), nullable=False)
    # New: Updated Date
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    # Defines the 'many' side of the relationship
    organisation = relationship("Organisation", back_populates="users")