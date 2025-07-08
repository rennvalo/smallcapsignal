
from fastapi import Header, HTTPException, Depends
from app.config import API_KEY
import os

def verify_api_key(authorization: str = Header(...)):
    """Verify the API key for protected routes"""
    if not authorization:
        raise HTTPException(status_code=401, detail="API key is required.")
    
    # Extract the key from "Bearer XYZ" format
    if authorization.startswith("Bearer "):
        provided_key = authorization.replace("Bearer ", "")
    else:
        provided_key = authorization
    
    # Debug output to check what's being received
    print(f"Auth header received: {authorization}")
    print(f"Extracted key: {provided_key}")
    print(f"API_KEY from config: {API_KEY}")
    print(f"API_KEY from env direct: {os.getenv('API_KEY')}")
    print(f"Expected key length: {len(API_KEY) if API_KEY else 0}, Received key length: {len(provided_key)}")
    
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Server API key not configured.")
    
    if provided_key != API_KEY:
        print(f"Key mismatch! Expected: {API_KEY}, Received: {provided_key}")
        raise HTTPException(status_code=401, detail="Invalid API key.")
    
    return True
