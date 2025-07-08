
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from app.config import EMAIL_PASSWORD, EMAIL_SENDER, DOMAIN_SENDER

def send_newsletter_email(subscriber_email: str, subject: str, message: str):
    """Send newsletter email directly to subscriber using Gmail SMTP server"""
    
    if not EMAIL_PASSWORD:
        print("ERROR: EMAIL_PASSWORD environment variable is not set")
        raise HTTPException(
            status_code=500, 
            detail="Email configuration error. Please contact the administrator."
        )
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = DOMAIN_SENDER
    msg['To'] = subscriber_email
    msg['Subject'] = subject
    
    # Build email body
    body = message
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send email
    try:
        print(f"Attempting to send newsletter email from {EMAIL_SENDER} to {subscriber_email}")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.set_debuglevel(1)  # Add debug information
        print("SMTP connection established")
        
        server.ehlo()
        server.starttls()
        print("TLS started")
        
        server.ehlo()
        print(f"Logging in as {EMAIL_SENDER}")
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        print("Login successful")
        
        text = msg.as_string()
        print("Sending newsletter email...")
        server.sendmail(DOMAIN_SENDER, subscriber_email, text)
        print(f"Newsletter email sent successfully to {subscriber_email}")
        
        server.quit()
        return True
    except Exception as e:
        print(f"NEWSLETTER EMAIL ERROR: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to send newsletter email: {str(e)}"
        )
