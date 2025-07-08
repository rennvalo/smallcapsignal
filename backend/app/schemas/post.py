
from pydantic import BaseModel
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str
    author: str
    imageUrl: Optional[str] = None
    
    class Config:
        extra = "forbid"

class Post(PostBase):
    id: str
    createdAt: str
