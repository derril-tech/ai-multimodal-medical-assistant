# API Specification - AI Multimodal Medical Assistant

This document provides comprehensive API documentation for the AI Multimodal Medical Assistant backend.

## 🔗 Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://api.medical-assistant.com`

## 🔐 Authentication

All API endpoints require authentication using JWT Bearer tokens.

```http
Authorization: Bearer <access_token>
```

### Authentication Endpoints

#### POST `/api/v1/auth/login`
Authenticate user and receive access token.

**Request Body:**
```json
{
  "username": "doctor@hospital.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800,
  "user": {
    "id": "user_123",
    "email": "doctor@hospital.com",
    "role": "clinician",
    "permissions": ["read:patients", "write:encounters"]
  }
}
```

#### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

#### POST `/api/v1/auth/logout`
Invalidate current session.

## 👥 Patients

### GET `/api/v1/patients`
Retrieve list of patients with pagination and filtering.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search by name or ID
- `status`: Filter by patient status

**Response:**
```json
{
  "items": [
    {
      "id": "patient_123",
      "mrn": "MRN001234",
      "name": "John Doe",
      "date_of_birth": "1980-05-15",
      "gender": "male",
      "status": "active",
      "last_encounter": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20,
  "pages": 8
}
```

### GET `/api/v1/patients/{patient_id}`
Retrieve detailed patient information.

### POST `/api/v1/patients`
Create new patient record.

### PUT `/api/v1/patients/{patient_id}`
Update patient information.

### DELETE `/api/v1/patients/{patient_id}`
Deactivate patient record (soft delete).

## 🏥 Encounters

### GET `/api/v1/encounters`
Retrieve patient encounters.

### GET `/api/v1/encounters/{encounter_id}`
Get detailed encounter information.

### POST `/api/v1/encounters`
Create new encounter.

### PUT `/api/v1/encounters/{encounter_id}`
Update encounter details.

### GET `/api/v1/encounters/{encounter_id}/summary`
Get AI-generated encounter summary.

### GET `/api/v1/encounters/{encounter_id}/triage`
Get triage assessment and recommendations.

## 📊 Observations

### GET `/api/v1/observations`
Retrieve patient observations (vitals, labs, etc.).

### POST `/api/v1/observations`
Create new observation.

### GET `/api/v1/observations/{observation_id}/trends`
Get AI-analyzed trends for observation.

## 💊 Medications

### GET `/api/v1/medications`
Retrieve patient medications.

### POST `/api/v1/medications`
Prescribe new medication.

### GET `/api/v1/medications/interactions`
Check for drug interactions.

### GET `/api/v1/medications/{medication_id}/safety`
Get AI safety analysis.

## 🖼️ Imaging

### GET `/api/v1/imaging/studies`
Retrieve imaging studies.

### GET `/api/v1/imaging/studies/{study_id}`
Get study details and DICOM metadata.

### POST `/api/v1/imaging/studies/{study_id}/analyze`
Request AI analysis of imaging study.

### GET `/api/v1/imaging/studies/{study_id}/analysis`
Get AI analysis results.

### GET `/api/v1/imaging/studies/{study_id}/dicom`
Get DICOM files for viewer.

## 📈 Waveforms

### GET `/api/v1/waveforms`
Retrieve waveform data (ECG, EEG, etc.).

### GET `/api/v1/waveforms/{waveform_id}`
Get waveform details and data.

### POST `/api/v1/waveforms/{waveform_id}/analyze`
Request AI analysis of waveform.

### GET `/api/v1/waveforms/{waveform_id}/rhythm`
Get rhythm analysis results.

## 📝 Notes

### GET `/api/v1/notes`
Retrieve clinical notes.

### POST `/api/v1/notes`
Create new note.

### POST `/api/v1/notes/dictation`
Create note from speech-to-text.

### GET `/api/v1/notes/{note_id}/summary`
Get AI-generated note summary.

### POST `/api/v1/notes/{note_id}/code`
Get AI coding suggestions.

## 📋 Orders

### GET `/api/v1/orders`
Retrieve medical orders.

### POST `/api/v1/orders`
Create new order.

### GET `/api/v1/orders/templates`
Get order templates.

### POST `/api/v1/orders/compose`
Get AI-assisted order composition.

## 🧠 AI Analysis

### POST `/api/v1/ai/analyze`
General AI analysis endpoint.

**Request Body:**
```json
{
  "type": "image_analysis",
  "data": {
    "image_url": "https://example.com/image.dcm",
    "modality": "CT",
    "body_part": "chest"
  },
  "options": {
    "include_differential": true,
    "confidence_threshold": 0.8
  }
}
```

### POST `/api/v1/ai/chat`
Multimodal AI chat interface.

### GET `/api/v1/ai/guidelines/search`
Search medical guidelines.

### POST `/api/v1/ai/decision-support`
Get clinical decision support.

## 🔄 Real-time

### WebSocket `/api/v1/realtime/ws`
Real-time communication for:
- Live consultations
- Streaming transcription
- Presence indicators
- Real-time alerts

## 📚 Guidelines

### GET `/api/v1/guidelines`
Retrieve medical guidelines.

### GET `/api/v1/guidelines/{guideline_id}`
Get specific guideline details.

### POST `/api/v1/guidelines/search`
Semantic search in guidelines.

## 🔍 Audit

### GET `/api/v1/audit/logs`
Retrieve audit logs.

### GET `/api/v1/audit/export`
Export audit data for compliance.

## 👨‍💼 Admin

### GET `/api/v1/admin/users`
Manage users and permissions.

### GET `/api/v1/admin/system/health`
System health monitoring.

### POST `/api/v1/admin/system/maintenance`
System maintenance operations.

## 📄 Documents

### GET `/api/v1/documents`
Retrieve medical documents.

### POST `/api/v1/documents/upload`
Upload new document.

### GET `/api/v1/documents/{document_id}/ocr`
Get OCR results.

## 🎯 Tasks

### GET `/api/v1/tasks`
Retrieve clinical tasks.

### POST `/api/v1/tasks`
Create new task.

### PUT `/api/v1/tasks/{task_id}/complete`
Mark task as complete.

## 📋 Care Plans

### GET `/api/v1/care-plans`
Retrieve care plans.

### POST `/api/v1/care-plans`
Create new care plan.

### GET `/api/v1/care-plans/{plan_id}/progress`
Get care plan progress.

## ✅ Consent

### GET `/api/v1/consent`
Retrieve patient consent records.

### POST `/api/v1/consent`
Record new consent.

### GET `/api/v1/consent/{patient_id}/status`
Get consent status for patient.

## 🔒 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_123456"
}
```

### Common Error Codes

- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## 📊 Rate Limiting

- **Standard endpoints**: 1000 requests/hour
- **AI analysis endpoints**: 100 requests/hour
- **File upload endpoints**: 50 requests/hour

## 🔐 Security Headers

All responses include security headers:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## 📈 Monitoring

### Health Check Endpoints

- `GET /health`: Basic health check
- `GET /health/detailed`: Detailed component health
- `GET /metrics`: Prometheus metrics

### Logging

All API requests are logged with:
- Request ID for tracing
- User ID and role
- Request/response data (PHI redacted)
- Performance metrics
- Error details

This API specification provides a comprehensive interface for the AI Multimodal Medical Assistant, ensuring secure, compliant, and efficient healthcare data management.
