
from fastapi import APIRouter, Depends, status, Header, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from datetime import datetime
import os
from fastapi.responses import Response

from app.schemas.post import Post, PostBase
from app.models.post import PostModel
from app.database.base import get_db
from app.utils.auth import verify_api_key
from app.config import API_KEY

router = APIRouter()

@router.get("/posts", response_model=List[Post])
async def get_posts(db: Session = Depends(get_db)):
    posts = db.query(PostModel).order_by(PostModel.createdAt.desc()).all()
    return [
        Post(
            id=post.id,
            title=post.title,
            content=post.content,
            author=post.author,
            createdAt=post.createdAt.isoformat(),
            imageUrl=post.imageUrl
        ) for post in posts
    ]

@router.post("/posts", response_model=Post, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostBase, db: Session = Depends(get_db), authorized: bool = Depends(verify_api_key)):
    # API key successfully verified at this point
    print("API key validation passed for POST request")
    
    new_post = PostModel(
        id=str(uuid.uuid4()),
        title=post.title,
        content=post.content,
        author=post.author,
        createdAt=datetime.utcnow(),
        imageUrl=post.imageUrl
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return Post(
        id=new_post.id,
        title=new_post.title,
        content=new_post.content,
        author=new_post.author,
        createdAt=new_post.createdAt.isoformat(),
        imageUrl=new_post.imageUrl
    )

@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: str, db: Session = Depends(get_db), authorized: bool = Depends(verify_api_key)):
    # API key successfully verified at this point
    print("API key validation passed for DELETE request")
    
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db.delete(post)
    db.commit()
    return {"status": "success", "message": "Post deleted successfully"}

# New endpoint to provide config info to the frontend
@router.get("/config")
async def get_config():
    """Get configuration information that the frontend needs"""
    return {
        "apiKeyAvailable": bool(API_KEY),  # Don't send the actual key, just whether it exists
        #"apiKeyLength": len(API_KEY) if API_KEY else 0  # Send length for debugging
    }

# New endpoint for RSS feed
@router.get("/rss", response_class=Response)
async def get_rss_feed(db: Session = Depends(get_db)):
    """Generate an RSS feed of the latest blog posts"""
    posts = db.query(PostModel).order_by(PostModel.createdAt.desc()).limit(20).all()
    
    # Create RSS feed XML
    rss_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    rss_content += '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">\n'
    rss_content += '<channel>\n'
    rss_content += '<title>SMALLCAP Signal Blog</title>\n'
    rss_content += '<link>https://www.smallcapsignal.com</link>\n'
    rss_content += '<description>Real-time alerts for Trump\'s market-moving posts</description>\n'
    rss_content += '<language>en-us</language>\n'
    rss_content += f'<lastBuildDate>{datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT")}</lastBuildDate>\n'
    rss_content += '<image>\n'
    rss_content += '<url>https://www.smallcapsignal.com/site-uploads/fd97ccba-8dde-4e7a-9a9e-8bed28b27191.png</url>\n'
    rss_content += '<title>SMALLCAP Signal</title>\n'
    rss_content += '<link>https://www.smallcapsignal.com</link>\n'
    rss_content += '</image>\n'
    
    # Add items
    for post in posts:
        rss_content += '<item>\n'
        rss_content += f'<title>{post.title}</title>\n'
        rss_content += f'<link>https://www.smallcapsignal.com/post/{post.id}</link>\n'
        rss_content += f'<guid>https://www.smallcapsignal.com/post/{post.id}</guid>\n'
        rss_content += f'<pubDate>{post.createdAt.strftime("%a, %d %b %Y %H:%M:%S GMT")}</pubDate>\n'
        
        # Escape HTML in content
        content = post.content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        rss_content += f'<description>{content}</description>\n'
        
        if post.author:
            rss_content += f'<author>{post.author}</author>\n'
        
        # Add media:content for the logo
        rss_content += '<media:content url="https://www.smallcapsignal.com/site-uploads/fd97ccba-8dde-4e7a-9a9e-8bed28b27191.png" medium="image" />\n'
        
        rss_content += '</item>\n'
    
    rss_content += '</channel>\n'
    rss_content += '</rss>'
    
    return Response(content=rss_content, media_type="application/rss+xml")
