# AI Multimodal Medical Assistant

A comprehensive healthcare AI platform designed to support medical professionals with advanced AI-powered tools for patient care, clinical decision support, and medical data analysis.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **Python** 3.11+
- **PostgreSQL** 14+
- **Redis** 6+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-multimodal-medical-assistant
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   # See .env.example for required variables
   ```

4. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb medical_assistant
   
   # Run database migrations (when implemented)
   cd backend && alembic upgrade head
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:8000
   ```

## 📁 Project Structure

```
ai-multimodal-medical-assistant/
├── frontend/                 # Next.js 14 frontend application
│   ├── app/                 # App Router pages and layouts
│   ├── components/          # React components
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Mock data and fixtures
│   └── lib/                # Utility functions
├── backend/                 # FastAPI backend application
│   ├── app/                # Main application code
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Pydantic models
│   │   └── services/       # Business logic
│   ├── data/               # Mock data and fixtures
│   └── requirements.txt    # Python dependencies
├── docs/                   # Documentation
│   ├── REPO_MAP.md        # Repository structure guide
│   ├── API_SPEC.md        # API documentation
│   └── CLAUDE.md          # AI collaboration guide
└── package.json           # Root package.json for monorepo
```

## 🏥 Key Features

### Frontend Features
- **Patient Management**: Comprehensive patient records and history
- **Clinical Dashboard**: Real-time patient monitoring and alerts
- **AI Analysis Viewer**: Interactive display of AI-generated insights
- **DICOM Viewer**: Medical imaging analysis and annotation
- **Real-time Collaboration**: Live consultations and team communication
- **Responsive Design**: Mobile-first, accessible interface

### Backend Features
- **RESTful API**: Comprehensive medical data endpoints
- **AI Integration**: Multiple AI model support (OpenAI, Anthropic, etc.)
- **FHIR Compliance**: Healthcare data standards integration
- **Real-time Communication**: WebSocket support for live features
- **Security**: JWT authentication, RBAC, HIPAA compliance
- **Monitoring**: Structured logging, metrics, and health checks

### AI Capabilities
- **Multimodal Analysis**: Text, image, audio, and medical data processing
- **Clinical Decision Support**: Evidence-based recommendations
- **Medical Imaging Analysis**: DICOM image interpretation
- **Lab Result Interpretation**: Automated lab value analysis
- **Drug Interaction Detection**: Safety checking and alerts
- **Natural Language Processing**: Clinical note analysis and generation

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **React Query** for data fetching
- **Zustand** for state management

### Backend
- **FastAPI** with Python 3.11
- **SQLAlchemy 2.0** with async support
- **PostgreSQL** with pgvector
- **Redis** for caching and queues
- **Pydantic v2** for data validation
- **Uvicorn/Gunicorn** for serving

### AI/ML
- **OpenAI GPT-4** for text analysis
- **Anthropic Claude** for reasoning
- **LangChain** for agent orchestration
- **Transformers** for custom models
- **pgvector** for embeddings

### Infrastructure
- **Docker** for containerization
- **PostgreSQL** for primary database
- **Redis** for caching and sessions
- **S3/GCS** for file storage
- **Structured logging** with trace IDs

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build           # Build both applications
npm run build:frontend  # Build frontend
npm run build:backend   # Build backend

# Testing
npm run test            # Run all tests
npm run test:frontend   # Run frontend tests
npm run test:backend    # Run backend tests

# Linting
npm run lint            # Lint both applications
npm run lint:frontend   # Lint frontend
npm run lint:backend    # Lint backend
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** and **Prettier** for code formatting
- **Black** and **isort** for Python formatting
- **Pre-commit hooks** for quality checks
- **Unit tests** with Jest and pytest

## 📚 Documentation

- **[Repository Map](docs/REPO_MAP.md)**: Detailed project structure guide
- **[API Specification](docs/API_SPEC.md)**: Complete API documentation
- **[Claude AI Guide](docs/CLAUDE.md)**: AI collaboration guidelines
- **[Frontend README](frontend/README_FRONTEND.md)**: Frontend-specific documentation
- **[Backend README](backend/README_BACKEND.md)**: Backend-specific documentation

## 🔒 Security & Compliance

- **HIPAA Compliance**: Patient data protection
- **JWT Authentication**: Secure API access
- **Role-Based Access Control**: Granular permissions
- **Audit Logging**: Complete activity tracking
- **Data Encryption**: At rest and in transit
- **PHI Protection**: Automated de-identification

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   # Set production environment variables
   ENVIRONMENT=production
   DEBUG=false
   SECRET_KEY=<secure-secret-key>
   DATABASE_URL=<production-db-url>
   ```

2. **Database Migration**
   ```bash
   cd backend
   alembic upgrade head
   ```

3. **Build and Deploy**
   ```bash
   # Build applications
   npm run build
   
   # Deploy using your preferred method
   # (Docker, Kubernetes, Cloud Platform, etc.)
   ```

### Docker Deployment

```bash
# Build images
docker build -f frontend/Dockerfile -t medical-frontend .
docker build -f backend/Dockerfile -t medical-backend .

# Run with docker-compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure HIPAA compliance for medical features
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) directory
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Security**: Report security issues privately

## 🏥 Medical Disclaimer

This software is designed to assist healthcare professionals and should not replace clinical judgment. All AI-generated recommendations should be reviewed by qualified medical personnel before implementation in patient care.

---

**Built with ❤️ for the healthcare community**
