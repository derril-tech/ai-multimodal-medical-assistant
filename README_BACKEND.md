# Backend - AI Multimodal Medical Assistant

This is the backend API for the AI Multimodal Medical Assistant, built with FastAPI, Python 3.11, SQLAlchemy 2.0, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 14+ with pgvector extension
- Redis 6+
- Docker (optional)

### Installation

1. **Create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database:**
   ```bash
   # Create PostgreSQL database with pgvector extension
   createdb medical_assistant
   psql medical_assistant -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Start development server:**
   ```bash
   uvicorn main:app --reload
   ```

7. **Access API documentation:**
   Navigate to [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
backend/
├── app/                    # Main application package
│   ├── api/               # API endpoints
│   │   └── v1/           # API version 1
│   │       ├── endpoints/ # Individual endpoint modules
│   │       └── api.py     # Main API router
│   ├── core/              # Core application modules
│   │   ├── config.py      # Settings and configuration
│   │   ├── database.py    # Database connection and models
│   │   ├── security.py    # Authentication and authorization
│   │   └── logging.py     # Logging configuration
│   ├── models/            # Database models
│   ├── schemas/           # Pydantic schemas
│   ├── services/          # Business logic services
│   │   ├── ai/           # AI analysis services
│   │   ├── medical/      # Medical domain services
│   │   └── storage/      # File storage services
│   └── utils/            # Utility functions
├── alembic/              # Database migrations
├── tests/                # Test suite
├── main.py               # FastAPI application entry point
└── requirements.txt      # Python dependencies
```

## 🛠️ Available Scripts

- `uvicorn main:app --reload` - Start development server
- `uvicorn main:app --host 0.0.0.0 --port 8000` - Start production server
- `pytest` - Run tests
- `pytest --cov=app` - Run tests with coverage
- `black .` - Format code
- `isort .` - Sort imports
- `flake8 .` - Lint code
- `mypy .` - Type checking

## 🔧 Key Features

### AI Analysis Services
- Medical image analysis (CT, MRI, X-ray)
- Text processing and summarization
- Clinical decision support
- Drug interaction checking

### Medical Data Management
- FHIR R4 compliance
- DICOM image processing
- Waveform analysis (ECG, EEG)
- Patient consent management

### Real-time Communication
- WebSocket-based collaboration
- Live consultation support
- Streaming transcription
- Presence indicators

### Security & Compliance
- JWT authentication
- Role-based access control (RBAC)
- HIPAA compliance
- Audit logging
- PHI redaction

## 🔐 Authentication

The API uses JWT-based authentication:

```bash
# Login to get access token
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "doctor@hospital.com", "password": "password"}'

# Use token in subsequent requests
curl -X GET "http://localhost:8000/api/v1/patients" \
  -H "Authorization: Bearer <access_token>"
```

## 📊 Database Schema

### Core Tables
- `patients` - Patient demographics and history
- `encounters` - Clinical visits and procedures
- `observations` - Vitals, labs, measurements
- `documents` - Medical notes and reports
- `orders` - Medications and procedures
- `care_plans` - Treatment plans and goals

### AI & Analysis Tables
- `ai_analyses` - AI analysis results
- `guidelines` - Medical guidelines and protocols
- `embeddings` - Vector embeddings for search
- `audit_logs` - Compliance audit trail

## 🧪 Testing

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_patients.py

# Run tests with coverage
pytest --cov=app --cov-report=html

# Run integration tests
pytest tests/integration/

# Run performance tests
pytest tests/performance/
```

## 🚀 Deployment

### Docker Deployment

1. **Build image:**
   ```bash
   docker build -t medical-assistant-backend .
   ```

2. **Run container:**
   ```bash
   docker run -p 8000:8000 \
     -e DATABASE_URL=postgresql://user:pass@host/db \
     -e SECRET_KEY=your-secret-key \
     medical-assistant-backend
   ```

### Production Deployment

1. **Set up production environment:**
   ```bash
   export ENVIRONMENT=production
   export DATABASE_URL=postgresql://user:pass@host/db
   export SECRET_KEY=your-secret-key
   ```

2. **Run with Gunicorn:**
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

## 📈 Monitoring

### Health Checks

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed component health
- `GET /metrics` - Prometheus metrics

### Logging

The application uses structured logging with JSON format:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "logger": "app.api.v1.endpoints.patients",
  "message": "Patient retrieved successfully",
  "patient_id": "patient_123",
  "user_id": "user_456"
}
```

### Metrics

Key metrics tracked:
- Request latency
- Error rates
- Database connection pool usage
- AI analysis response times
- Active user sessions

## 🔒 Security

### Environment Variables

Required environment variables:
- `SECRET_KEY` - JWT signing key
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key

### Security Headers

All responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**: Check `DATABASE_URL` and PostgreSQL status
2. **Import errors**: Ensure all dependencies are installed
3. **Permission errors**: Check file permissions and user access
4. **Memory issues**: Monitor memory usage and adjust worker count

### Debug Mode

Enable debug mode for development:
```bash
export DEBUG=true
uvicorn main:app --reload --log-level debug
```

## 📚 API Documentation

- **Interactive docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **OpenAPI spec**: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write tests for new features
4. Update documentation
5. Run linting and type checking

## 📄 License

This project is proprietary and confidential. All rights reserved.
