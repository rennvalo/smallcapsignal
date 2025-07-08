
from pydantic import BaseModel, EmailStr

class SubscriberBase(BaseModel):
    email: EmailStr

class SubscriberResponse(BaseModel):
    email: str
    message: str
