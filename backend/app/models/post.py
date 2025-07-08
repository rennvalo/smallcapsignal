
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.base import Base

class PostModel(Base):
    __tablename__ = "posts"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    author = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    imageUrl = Column(String, nullable=True)
