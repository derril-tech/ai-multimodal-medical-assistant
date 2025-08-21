from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = "AI Multimodal Medical Assistant"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ]
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost/medical_assistant"
    DATABASE_ECHO: bool = False
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    COHERE_API_KEY: Optional[str] = None
    
    # Storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    S3_BUCKET: str = "medical-assistant-storage"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    LOG_LEVEL: str = "INFO"
    
    # Medical Specific
    FHIR_BASE_URL: str = "http://localhost:8080/fhir"
    DICOM_STORE_URL: str = "http://localhost:8042"
    
    # Feature Flags
    ENABLE_AI_ANALYSIS: bool = True
    ENABLE_IMAGING_ANALYSIS: bool = True
    ENABLE_SPEECH_TO_TEXT: bool = True
    ENABLE_REAL_TIME_COLLABORATION: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Global settings instance
settings = Settings()
