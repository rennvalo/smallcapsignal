
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from app.config import EMAIL_PASSWORD, EMAIL_SENDER, EMAIL_RECIPIENT

def send_email(name: str, sender_email: str, message: str):
    """Send email using Gmail SMTP server"""
    
    if not EMAIL_PASSWORD:
        print("ERROR: EMAIL_PASSWORD environment variable is not set")
        raise HTTPException(
            status_code=500, 
            detail="Email configuration error. Please contact the administrator."
        )
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = DOMAIN_SENDER
    msg['To'] = EMAIL_RECIPIENT
    msg['Subject'] = f"MAGA Signal Contact: {name}"
    
    # Build email body
    body = f"""
    New Contact Form Submission:
    
    Name: {name}
    Email: {sender_email}
    
    Message:
    {message}
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send email
    try:
        print(f"Attempting to send email from {EMAIL_SENDER} to {EMAIL_RECIPIENT}")
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
        print("Sending email...")
        server.sendmail(DOMAIN_SENDER, EMAIL_RECIPIENT, text)
        print("Email sent successfully")
        
        server.quit()
        return True
    except Exception as e:
        print(f"EMAIL ERROR: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to send email: {str(e)}"
        )
