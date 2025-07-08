
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.base import get_subscriber_db
from app.models.subscriber import SubscriberModel
from app.utils.newsletter_email import send_newsletter_email
from app.utils.auth import verify_api_key
from pydantic import BaseModel

router = APIRouter()

class NewsletterRequest(BaseModel):
    subject: str
    message: str

@router.post("/newsletter/send")
async def send_newsletter(
    newsletter: NewsletterRequest,
    db: Session = Depends(get_subscriber_db),
    auth_result: bool = Depends(verify_api_key)
):
    """Send newsletter to all subscribers"""
    try:
        # Get all subscribers
        subscribers = db.query(SubscriberModel).all()
        
        if not subscribers:
            raise HTTPException(status_code=404, detail="No subscribers found")
        
        success_count = 0
        error_count = 0
        
        # Send email to each subscriber
        for subscriber in subscribers:
            try:
                send_newsletter_email(subscriber.email, newsletter.subject, newsletter.message)
                success_count += 1
            except Exception as e:
                print(f"Failed to send newsletter to {subscriber.email}: {str(e)}")
                error_count += 1
        
        return {
            "message": f"Newsletter sent successfully to {success_count} subscribers",
            "success_count": success_count,
            "error_count": error_count,
            "total_subscribers": len(subscribers)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error sending newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send newsletter: {str(e)}")
