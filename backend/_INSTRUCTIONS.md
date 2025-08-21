# Backend Instructions

This folder contains the FastAPI backend application for the AI Multimodal Medical Assistant.

## 🎯 Claude Task: Backend Development

### Current Status
- ✅ FastAPI application setup
- ✅ Basic API router structure
- ✅ Configuration management
- ✅ Database connection setup
- ✅ Endpoint stubs with TODO markers

### TODO: Implement Core Features

#### 1. Database Models & Schemas
- [ ] Patient model with demographics
- [ ] Encounter model for clinical visits
- [ ] Observation model for vitals/labs
- [ ] Document model for medical notes
- [ ] Order model for medications/procedures
- [ ] AI analysis model for results
- [ ] Audit log model for compliance

#### 2. Authentication & Authorization
- [ ] JWT token generation and validation
- [ ] Password hashing and verification
- [ ] Role-based access control (RBAC)
- [ ] User management endpoints
- [ ] Session management
- [ ] Password reset functionality

#### 3. Patient Management
- [ ] CRUD operations for patients
- [ ] Patient search and filtering
- [ ] Medical history tracking
- [ ] Consent management
- [ ] PHI redaction utilities

#### 4. AI Analysis Services
- [ ] Medical image analysis integration
- [ ] Text processing and summarization
- [ ] Clinical decision support
- [ ] Drug interaction checking
- [ ] Risk assessment algorithms

#### 5. Medical Data Processing
- [ ] FHIR R4 resource handling
- [ ] DICOM image processing
- [ ] Waveform analysis (ECG, EEG)
- [ ] Lab result interpretation
- [ ] Vital signs monitoring

#### 6. Real-time Communication
- [ ] WebSocket implementation
- [ ] Live consultation support
- [ ] Streaming transcription
- [ ] Presence management
- [ ] Real-time notifications

#### 7. Security & Compliance
- [ ] HIPAA compliance measures
- [ ] Audit logging system
- [ ] Data encryption
- [ ] Access control policies
- [ ] Compliance reporting

### Development Guidelines

#### API Endpoint Structure
```python
@router.get("/")
async def get_resources(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[ResourceResponse]:
    """Get list of resources with pagination and filtering."""
    # Implementation
```

#### Database Operations
```python
# Use async SQLAlchemy 2.0 patterns
async def get_patient(db: Session, patient_id: str) -> Optional[Patient]:
    result = await db.execute(
        select(Patient).where(Patient.id == patient_id)
    )
    return result.scalar_one_or_none()
```

#### Error Handling
```python
from fastapi import HTTPException, status

if not patient:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Patient not found"
    )
```

#### Logging
```python
from app.core.logging import get_logger

logger = get_logger(__name__)

logger.info(
    "Patient retrieved",
    patient_id=patient_id,
    user_id=current_user.id
)
```

### File Organization
- `app/api/v1/endpoints/` - API endpoint implementations
- `app/models/` - SQLAlchemy database models
- `app/schemas/` - Pydantic request/response schemas
- `app/services/` - Business logic services
- `app/core/` - Core application modules
- `tests/` - Test suite

### Security Requirements
- All endpoints must validate user permissions
- PHI data must be properly handled and logged
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Validate all input data

### Testing
- Write unit tests for all endpoints
- Test database operations
- Test authentication and authorization
- Test error handling
- Test performance under load

### Performance
- Use database connection pooling
- Implement caching where appropriate
- Optimize database queries
- Monitor API response times
- Use async operations for I/O

### Compliance
- Log all patient data access
- Implement audit trails
- Ensure data encryption
- Follow HIPAA guidelines
- Maintain data retention policies
