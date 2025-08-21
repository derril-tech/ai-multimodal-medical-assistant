# Backend API Directory

## CLAUDE_TASK: API Development Guidelines

This directory contains all FastAPI endpoints for the AI Medical Assistant backend. Follow these guidelines when creating or modifying API endpoints:

### API Structure

1. **Versioning**
   - All endpoints are under `/api/v1/`
   - Use semantic versioning for API changes
   - Maintain backward compatibility when possible

2. **Endpoint Organization**
   - Group related endpoints in separate routers
   - Use descriptive endpoint names
   - Follow RESTful conventions
   - Implement proper HTTP methods (GET, POST, PUT, DELETE)

3. **Authentication & Authorization**
   - JWT token validation for all protected endpoints
   - Role-based access control (RBAC)
   - HIPAA compliance for medical data
   - Audit logging for all data access

### Endpoint Patterns

1. **Standard Response Format**
   ```python
   {
     "data": {...},
     "message": "Success message",
     "errors": [],
     "meta": {
       "page": 1,
       "limit": 10,
       "total": 100
     }
   }
   ```

2. **Error Handling**
   - Use appropriate HTTP status codes
   - Provide meaningful error messages
   - Include error codes for client handling
   - Log errors with context

3. **Validation**
   - Use Pydantic models for request/response validation
   - Implement input sanitization
   - Validate medical data formats
   - Check data integrity constraints

### Medical Data Security

1. **PHI Protection**
   - Never log PHI in plain text
   - Implement data masking for logs
   - Use encryption for sensitive data
   - Implement access controls

2. **Audit Requirements**
   - Log all data access attempts
   - Track user actions on medical data
   - Maintain audit trails for compliance
   - Implement break-glass access logging

3. **Data Validation**
   - Validate medical codes (ICD-10, SNOMED-CT, LOINC)
   - Check vital sign ranges
   - Validate medication interactions
   - Ensure data consistency

### Performance Considerations

1. **Database Optimization**
   - Use async database operations
   - Implement proper indexing
   - Use connection pooling
   - Optimize query performance

2. **Caching Strategy**
   - Cache frequently accessed data
   - Use Redis for session storage
   - Implement cache invalidation
   - Cache AI analysis results

3. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Protect against abuse
   - Monitor API usage patterns
   - Implement throttling for heavy operations

### AI Integration

1. **AI Service Endpoints**
   - Implement async AI processing
   - Provide progress tracking
   - Handle AI service failures gracefully
   - Cache AI results appropriately

2. **Model Management**
   - Support multiple AI providers
   - Implement model versioning
   - Track model performance
   - Handle model updates

### TODO: API Development Tasks

- [ ] Implement patient CRUD endpoints with validation
- [ ] Create encounter management endpoints
- [ ] Build AI analysis request/response endpoints
- [ ] Implement real-time WebSocket endpoints
- [ ] Create medical imaging upload/retrieval endpoints
- [ ] Build lab results management endpoints
- [ ] Implement medication interaction checking
- [ ] Create clinical notes CRUD endpoints
- [ ] Build user authentication and authorization
- [ ] Implement audit logging endpoints
- [ ] Create reporting and analytics endpoints
- [ ] Build FHIR integration endpoints

### Endpoint Examples

```python
from fastapi import APIRouter, Depends, HTTPException
from app.models.domain import Patient, PatientCreate
from app.core.auth import get_current_user
from app.services.patient_service import PatientService

router = APIRouter()

@router.get("/patients/{patient_id}", response_model=Patient)
async def get_patient(
    patient_id: str,
    current_user = Depends(get_current_user),
    patient_service: PatientService = Depends()
):
    """Get patient by ID with proper authorization"""
    try:
        patient = await patient_service.get_patient(patient_id, current_user)
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        return patient
    except Exception as e:
        # Log error without exposing PHI
        logger.error(f"Error retrieving patient {patient_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/patients", response_model=Patient)
async def create_patient(
    patient_data: PatientCreate,
    current_user = Depends(get_current_user),
    patient_service: PatientService = Depends()
):
    """Create new patient with validation"""
    try:
        patient = await patient_service.create_patient(patient_data, current_user)
        return patient
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### Testing Requirements

1. **Unit Tests**
   - Test endpoint logic
   - Mock external dependencies
   - Test error conditions
   - Validate response formats

2. **Integration Tests**
   - Test database operations
   - Test authentication flows
   - Test AI service integration
   - Test real-time features

3. **Security Tests**
   - Test authorization controls
   - Validate input sanitization
   - Test rate limiting
   - Check audit logging

### Documentation

1. **OpenAPI/Swagger**
   - Document all endpoints
   - Include request/response examples
   - Document error codes
   - Add authentication requirements

2. **Code Documentation**
   - Document complex business logic
   - Include usage examples
   - Document security considerations
   - Add performance notes

### Monitoring & Observability

1. **Logging**
   - Structured logging with trace IDs
   - Log performance metrics
   - Track error rates
   - Monitor API usage

2. **Metrics**
   - Response time tracking
   - Error rate monitoring
   - Throughput measurement
   - Resource utilization

3. **Health Checks**
   - Database connectivity
   - External service status
   - AI service availability
   - System resource checks

### Deployment Considerations

1. **Environment Configuration**
   - Use environment variables
   - Support multiple environments
   - Secure configuration management
   - Feature flag support

2. **Scaling**
   - Horizontal scaling support
   - Load balancing considerations
   - Database connection management
   - Cache distribution

### Compliance Requirements

1. **HIPAA Compliance**
   - Data encryption at rest and in transit
   - Access control implementation
   - Audit trail maintenance
   - Data backup and recovery

2. **FHIR Compliance**
   - FHIR R4 resource support
   - Standard FHIR endpoints
   - FHIR validation
   - FHIR terminology support
