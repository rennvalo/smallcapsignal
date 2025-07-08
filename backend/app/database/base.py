
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import DATABASE_URL, SUBSCRIBERS_DATABASE_URL

# Posts DB engine and session
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Subscribers DB engine and session
subscriber_engine = create_engine(SUBSCRIBERS_DATABASE_URL, connect_args={"check_same_thread": False})
SubscriberSessionLocal = sessionmaker(bind=subscriber_engine)
SubscriberBase = declarative_base()

def create_tables():
    """Create all database tables if they don't exist"""
    from app.models.post import PostModel
    from app.models.subscriber import SubscriberModel
    
    Base.metadata.create_all(bind=engine)
    SubscriberBase.metadata.create_all(bind=subscriber_engine)

def get_db():
    """Dependency for getting DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_subscriber_db():
    """Dependency for getting subscriber DB session"""
    db = SubscriberSessionLocal()
    try:
        yield db
    finally:
        db.close()
