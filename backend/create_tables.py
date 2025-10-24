from database import engine
from models import Base

def create_tables():
    """Create all tables in the database"""
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    create_tables()
