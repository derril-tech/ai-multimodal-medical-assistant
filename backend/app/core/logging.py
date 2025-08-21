import logging
import structlog
from typing import Any, Dict
import sys

def setup_logging() -> None:
    """Configure structured logging for the application."""
    
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer()
        ],
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=logging.INFO,
    )

    # Set specific logger levels
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)

def get_logger(name: str) -> structlog.BoundLogger:
    """Get a structured logger instance."""
    return structlog.get_logger(name)

# Medical-specific logging utilities
def log_patient_access(logger: structlog.BoundLogger, patient_id: str, user_id: str, action: str) -> None:
    """Log patient data access for audit purposes."""
    logger.info(
        "patient_access",
        patient_id=patient_id,
        user_id=user_id,
        action=action,
        event_type="patient_access"
    )

def log_ai_analysis(logger: structlog.BoundLogger, analysis_type: str, input_data: Dict[str, Any], result: Dict[str, Any]) -> None:
    """Log AI analysis for audit and monitoring."""
    logger.info(
        "ai_analysis",
        analysis_type=analysis_type,
        input_hash=hash(str(input_data)),  # Hash for privacy
        result_summary=result.get("summary", ""),
        confidence=result.get("confidence", 0.0),
        event_type="ai_analysis"
    )

def log_security_event(logger: structlog.BoundLogger, event_type: str, user_id: str, details: Dict[str, Any]) -> None:
    """Log security events for monitoring."""
    logger.warning(
        "security_event",
        event_type=event_type,
        user_id=user_id,
        details=details,
        event_category="security"
    )
