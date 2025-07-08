
from fastapi import APIRouter, Depends, HTTPException
from app.utils.auth import verify_api_key

router = APIRouter()

@router.post("/verify-key")
async def verify_key(auth_result: bool = Depends(verify_api_key)):
    """
    Verify if the provided API key is valid
    This endpoint is used for admin page access verification
    """
    if auth_result:
        return {"status": "success", "message": "API key is valid"}
    # This code should never run because verify_api_key raises an HTTPException if invalid
    raise HTTPException(status_code=401, detail="Invalid API key")

@router.get("/config")
async def get_config():
    """
    Get server configuration details
    This endpoint provides minimal information about the server configuration
    """
    from app.config import API_KEY
    return {
        "apiKeyAvailable": bool(API_KEY),
        "apiKeyLength": len(API_KEY) if API_KEY else 0
    }
