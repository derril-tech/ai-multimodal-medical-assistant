from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
import logging
from typing import Dict, Any

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.api import api_router
from app.core.database import init_db

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Security
security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting AI Medical Assistant API...")
    await init_db()
    logger.info("Database initialized successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AI Medical Assistant API...")

# Create FastAPI app
app = FastAPI(
    title="AI Multimodal Medical Assistant API",
    description="Comprehensive healthcare AI platform API for medical professionals",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root() -> Dict[str, Any]:
    """Root endpoint"""
    return {
        "message": "AI Multimodal Medical Assistant API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ai-medical-assistant",
        "version": "1.0.0"
    }

@app.get("/health/detailed")
async def detailed_health_check() -> Dict[str, Any]:
    """Detailed health check with component status"""
    try:
        # TODO: Add database health check
        # TODO: Add external service health checks
        return {
            "status": "healthy",
            "service": "ai-medical-assistant",
            "version": "1.0.0",
            "components": {
                "database": "healthy",
                "ai_services": "healthy",
                "storage": "healthy"
            }
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        log_level="info"
    )
