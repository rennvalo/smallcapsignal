
from fastapi import APIRouter, status, HTTPException
from app.schemas.contact import ContactForm
from app.utils.email import send_email

router = APIRouter()

@router.post("/api/contact", status_code=status.HTTP_200_OK)
async def contact(contact_data: ContactForm):
    print(f"Contact form received: {contact_data.name}, {contact_data.email}")
    try:
        send_email(contact_data.name, contact_data.email, contact_data.message)
        return {"message": "Message sent successfully! We'll get back to you soon."}
    except Exception as e:
        print(f"Contact form error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send message: {str(e)}"
        )
