# Repository Map - AI Multimodal Medical Assistant

This document provides a comprehensive overview of the repository structure and the purpose of each folder and file.

## 📁 Root Structure

```
ai-multimodal-medical-assistant/
├── frontend/                 # Next.js 14 frontend application
├── backend/                  # FastAPI backend application
├── docs/                     # Documentation and guides
├── scripts/                  # Development and deployment scripts
├── .env.example             # Environment variables template
├── package.json             # Root package.json for monorepo
└── README.md                # Project overview
```

## 🎨 Frontend Structure (`frontend/`)

```
frontend/
├── app/                     # Next.js 14 App Router
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Dashboard routes
│   ├── patients/           # Patient management
│   ├── encounters/         # Medical encounters
│   ├── imaging/            # DICOM viewer and analysis
│   ├── guidelines/         # Medical guidelines
│   ├── admin/              # Administrative interface
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Form components
│   ├── charts/             # Data visualization
│   ├── medical/            # Medical-specific components
│   └── providers/          # Context providers
├── lib/                    # Utility functions and configurations
│   ├── utils.ts            # General utilities
│   ├── validations.ts      # Zod schemas
│   └── api.ts              # API client
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── styles/                 # Additional stylesheets
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Frontend dependencies
```

## 🔧 Backend Structure (`backend/`)

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
│   │   ├── patient.py     # Patient model
│   │   ├── encounter.py   # Encounter model
│   │   └── ...           # Other models
│   ├── schemas/           # Pydantic schemas
│   ├── services/          # Business logic services
│   │   ├── ai/           # AI analysis services
│   │   ├── medical/      # Medical domain services
│   │   └── storage/      # File storage services
│   ├── utils/            # Utility functions
│   └── dependencies.py   # FastAPI dependencies
├── alembic/              # Database migrations
├── tests/                # Test suite
├── main.py               # FastAPI application entry point
├── requirements.txt      # Python dependencies
└── Dockerfile           # Container configuration
```

## 📚 Documentation Structure (`docs/`)

```
docs/
├── REPO_MAP.md           # This file - repository structure
├── API_SPEC.md           # API documentation and specifications
├── CLAUDE.md             # Claude AI collaboration guide
├── PROMPT_DECLARATION.md # Prompt engineering specifications
├── DEPLOYMENT.md         # Deployment instructions
├── DEVELOPMENT.md        # Development setup guide
└── ARCHITECTURE.md       # System architecture documentation
```

## 🛠️ Scripts Structure (`scripts/`)

```
scripts/
├── dev.sh                # Development environment setup
├── deploy.sh             # Deployment automation
├── test.sh               # Test execution
├── lint.sh               # Code linting
└── db/                   # Database management scripts
    ├── migrate.sh        # Database migrations
    └── seed.sh           # Database seeding
```

## 🎯 Key Components

### Frontend Components
- **Medical Dashboard**: Patient overview, vitals, and AI insights
- **DICOM Viewer**: Medical imaging with AI analysis
- **Chart Summary Canvas**: Timeline visualization of patient data
- **Orders Composer**: Structured order creation with AI assistance
- **Clinician Copilot Chat**: Multimodal AI chat interface
- **Patient Education Studio**: Content creation and management

### Backend Services
- **AI Analysis Service**: Medical image and text analysis
- **FHIR Integration**: Healthcare data standards compliance
- **Real-time Communication**: WebSocket-based collaboration
- **Vector Search**: Semantic search for medical content
- **Audit & Compliance**: HIPAA-compliant logging and tracking

### Database Models
- **Patient**: Demographics, medical history, consent
- **Encounter**: Clinical visits, procedures, outcomes
- **Observation**: Vitals, lab results, measurements
- **Document**: Medical notes, reports, images
- **Order**: Medications, procedures, referrals
- **Care Plan**: Treatment plans and goals

## 🔐 Security & Compliance

- **Authentication**: JWT-based with role-based access control
- **Authorization**: RBAC for clinician/admin/triage roles
- **Data Protection**: PHI redaction and de-identification
- **Audit Trail**: Comprehensive logging for compliance
- **Consent Management**: Patient consent tracking and enforcement

## 🚀 Development Workflow

1. **Setup**: Use `scripts/dev.sh` to initialize development environment
2. **Frontend**: `npm run dev` in `frontend/` directory
3. **Backend**: `uvicorn main:app --reload` in `backend/` directory
4. **Database**: PostgreSQL with pgvector extension
5. **Testing**: Comprehensive test suite for both frontend and backend
6. **Deployment**: Containerized deployment with Docker

## 📋 TODO Markers

Throughout the codebase, you'll find TODO markers indicating areas that need implementation:

- `TODO: Implement AI analysis service`
- `TODO: Add FHIR integration`
- `TODO: Implement real-time collaboration`
- `TODO: Add comprehensive testing`
- `TODO: Implement audit logging`

## 🎨 Design System

The application uses a medical-themed design system with:
- **Colors**: Medical blue, green, amber, and red for status indicators
- **Components**: shadcn/ui with medical-specific customizations
- **Typography**: Inter font for readability
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach

## 🔄 State Management

- **Frontend**: Zustand for global state, React Query for server state
- **Backend**: SQLAlchemy for database state, Redis for caching
- **Real-time**: WebSocket connections for live updates
- **AI State**: LangGraph for deterministic AI workflows

This structure provides a solid foundation for the AI Multimodal Medical Assistant, with clear separation of concerns and scalability in mind.
