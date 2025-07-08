
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from app.schemas.subscriber import SubscriberBase, SubscriberResponse
from app.models.subscriber import SubscriberModel
from app.database.base import get_subscriber_db
from app.utils.auth import verify_api_key
from app.utils.newsletter_email import send_newsletter_email

router = APIRouter()

@router.post("/subscribe", response_model=SubscriberResponse, status_code=status.HTTP_201_CREATED)
async def subscribe(subscriber: SubscriberBase, db: Session = Depends(get_subscriber_db)):
    existing = db.query(SubscriberModel).filter(SubscriberModel.email == subscriber.email).first()
    if existing:
        return SubscriberResponse(email=subscriber.email, message="You're already subscribed!")
    
    # Add new subscriber to database
    new_subscriber = SubscriberModel(email=subscriber.email, subscribed_at=datetime.utcnow())
    db.add(new_subscriber)
    db.commit()
    
    # Send welcome email
    try:
        subject = "Welcome to smallCapSIGNAL – Your Edge in the Market Starts Now"
        body = f"""Dear {subscriber.email},

Welcome to smallCapSIGNAL.com — and thank you for joining a growing community of investors who don't just follow the market… they stay ahead of it.

At smallCapSIGNAL, we're laser-focused on giving you real-time trade analysis and actionable insights directly from the most influential posts on Truth Social. Our alerts often beat the mainstream media by more than an hour — so while others are still reading the news, you're already making moves.

How to Stay Ahead:
You can choose how to receive alerts:

Email notifications – Delivered straight to your inbox, the moment new signals go live.

RSS feed – Ideal for real-time updates in your preferred news aggregator.

To set up or customize your alerts, just reply to this email letting us know what works best for you.  
Always welcome your feedback, don't hesitate to introduce yourself and let us know how smallCapSIGNAL is working for you.

This is more than a subscription — it's your signal advantage.
We're excited to help you trade smarter, faster, and with more confidence.

Thank you again for joining smallCapSIGNAL.

Here's to smart trades and strong returns,
The smallCapSIGNAL Team
www.smallCapSIGNAL.com"""
        
        send_newsletter_email(subscriber.email, subject, body)
        print(f"Welcome email sent successfully to {subscriber.email}")
    except Exception as e:
        print(f"Failed to send welcome email to {subscriber.email}: {str(e)}")
        # Don't fail the subscription if email fails
    
    return SubscriberResponse(email=subscriber.email, message="Thank you for subscribing!")

@router.get("/subscribers")
async def get_subscribers(db: Session = Depends(get_subscriber_db)):
    """Get all subscribers"""
    subscribers = db.query(SubscriberModel).all()
    return [{"email": sub.email, "subscribed_at": sub.subscribed_at} for sub in subscribers]

@router.delete("/subscribers/{email}")
async def delete_subscriber(email: str, db: Session = Depends(get_subscriber_db), auth_result: bool = Depends(verify_api_key)):
    """Delete a subscriber by email (requires API key)"""
    try:
        subscriber = db.query(SubscriberModel).filter(SubscriberModel.email == email).first()
        if not subscriber:
            raise HTTPException(status_code=404, detail="Subscriber not found")
        
        db.delete(subscriber)
        db.commit()
        return {"message": f"Subscriber {email} deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting subscriber {email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete subscriber: {str(e)}")
