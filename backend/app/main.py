
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import mimetypes

from app.routes.posts import router as posts_router
from app.routes.subscribers import router as subscribers_router
from app.routes.contact import router as contact_router
from app.routes.auth import router as auth_router
from app.routes.newsletter import router as newsletter_router
from app.database.base import create_tables

# ------------------- MIME Types -------------------
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/html", ".html")

# ------------------- App Setup -------------------
app = FastAPI(title="MAGA Signal API", docs_url=None, redoc_url=None, openapi_url=None)

# ------------------- CORS -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.smallcapsignal.com", "https://smallcapsignal.com", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],  # Added DELETE and OPTIONS
    allow_headers=["*"],
)

# Initialize database tables
create_tables()

# Include routers with API prefix to avoid conflicts with static files
app.include_router(posts_router, prefix="/api")
app.include_router(subscribers_router, prefix="/api")
app.include_router(contact_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(newsletter_router, prefix="/api")

# Also include without prefix for backward compatibility
app.include_router(posts_router)
app.include_router(subscribers_router)
app.include_router(contact_router)
app.include_router(auth_router)
app.include_router(newsletter_router)

# ------------------- Static & SPA Setup -------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "..", "static")

# Mount static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/assets", StaticFiles(directory=os.path.join(STATIC_DIR, "assets")), name="assets")

# SPA fallback - only serve index.html for non-API routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Don't serve SPA for API routes
    if full_path.startswith("api/") or full_path.startswith("subscribers") or full_path.startswith("posts") or full_path.startswith("contact") or full_path.startswith("auth") or full_path.startswith("newsletter"):
        return FileResponse(os.path.join(STATIC_DIR, "index.html"), status_code=404)
    
    file_path = os.path.join(STATIC_DIR, full_path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))
