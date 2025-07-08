
# PatriotPulse FastAPI Backend Integration

This document outlines how to implement the FastAPI backend for the PatriotPulse blog.

## Overview

The PatriotPulse frontend is designed to work with a FastAPI backend that:
- Provides blog posts via a REST API
- Allows authenticated users to create new posts with an API key
- Handles basic CRUD operations for blog content

## API Endpoints

### GET /posts
Returns a list of all blog posts, sorted by creation date (newest first).

Response:
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": "string", 
    "createdAt": "string (ISO format)",
    "imageUrl": "string (optional)"
  }
]
```

### POST /posts
Creates a new blog post. Requires API key authentication.

Request:
```json
{
  "title": "string",
  "content": "string",
  "author": "string",
  "imageUrl": "string (optional)"
}
```

Headers:
```
Authorization: Bearer {api_key}
```

Response:
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "author": "string",
  "createdAt": "string (ISO format)",
  "imageUrl": "string (optional)"
}
```

## FastAPI Implementation

Here's a basic implementation of the FastAPI backend:

```python
from fastapi import FastAPI, Depends, HTTPException, Header, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="PatriotPulse API")

# Simple in-memory storage for this example
posts_db = []

# API key validation (in a real app, you'd use a more secure approach)
API_KEY = "your-secret-api-key"

def verify_api_key(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="API key missing")
    
    scheme, _, key = authorization.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    return True

# Data models
class PostBase(BaseModel):
    title: str
    content: str
    author: str
    imageUrl: Optional[str] = None

class Post(PostBase):
    id: str
    createdAt: str

# Routes
@app.get("/posts", response_model=List[Post])
async def get_posts():
    return sorted(posts_db, key=lambda x: x["createdAt"], reverse=True)

@app.post("/posts", response_model=Post, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostBase, authorized: bool = Depends(verify_api_key)):
    new_post = {
        "id": str(uuid.uuid4()),
        "title": post.title,
        "content": post.content,
        "author": post.author,
        "createdAt": datetime.now().isoformat(),
        "imageUrl": post.imageUrl
    }
    
    posts_db.append(new_post)
    return new_post

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Deployment

To deploy the FastAPI backend:

1. Save the code above to a file named `main.py`
2. Install the required packages:
   ```
   pip install fastapi uvicorn
   ```
3. Run the server:
   ```
   uvicorn main:app --reload
   ```

## Security Considerations

In a production environment:
- Store API keys securely (not hardcoded)
- Use HTTPS for all communications
- Implement proper CORS policies
- Consider using OAuth or JWT for more robust authentication
- Add rate limiting to prevent abuse

## Integration with Frontend

To connect the frontend to this backend:

1. Replace the mocked API URL in `BlogContext.tsx` with your actual FastAPI endpoint.
2. Uncomment the fetch calls and replace the mock data with real API calls.
3. Ensure CORS is configured properly on the backend if they are on different domains.
