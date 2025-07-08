
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.base import SubscriberBase

class SubscriberModel(SubscriberBase):
    __tablename__ = "subscribers"
    email = Column(String, primary_key=True, index=True)
    subscribed_at = Column(DateTime, default=datetime.utcnow)
