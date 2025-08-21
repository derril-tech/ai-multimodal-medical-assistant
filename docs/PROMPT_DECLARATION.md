# PROMPT DECLARATION - AI Multimodal Medical Assistant

## 🎯 Project Overview

**AI Multimodal Medical Assistant** - A comprehensive healthcare platform that integrates AI-powered analysis, real-time collaboration, and evidence-based clinical decision support for healthcare professionals.

### Core Mission
Streamline patient care workflows, improve diagnostic accuracy, enhance clinical decision-making, and ensure regulatory compliance while maintaining the highest standards of medical practice.

### Target Users
- **Primary**: Physicians, nurses, radiologists, and clinical specialists
- **Secondary**: Healthcare administrators, IT staff, and compliance officers
- **Tertiary**: Medical students and researchers

## 🏗️ Architecture Overview

### Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query (server state) + Zustand (client state)
- **Validation**: Zod schemas
- **Real-time**: Socket.IO client
- **Medical UI**: CornerstoneJS (DICOM), WFDB (ECG), medical terminology

### Backend Architecture
- **Framework**: FastAPI (async/await)
- **Language**: Python 3.11+
- **Database**: PostgreSQL with pgvector (embeddings)
- **ORM**: SQLAlchemy 2.0 (async)
- **Authentication**: JWT with RBAC
- **AI/ML**: LangChain, OpenAI, Anthropic, medical AI models
- **Real-time**: WebSockets, Redis streams
- **Storage**: S3/GCS with DICOM support

## 🔄 Frontend/Backend Boundaries

### Frontend Responsibilities
- **UI/UX**: All user interface components and interactions
- **State Management**: Client-side state, form handling, real-time updates
- **Data Fetching**: React Query for API calls, caching, and synchronization
- **Validation**: Client-side form validation with Zod
- **Medical Viewers**: DICOM, ECG, waveform visualization
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation
- **Internationalization**: ICU-based i18n, unit conversions

### Backend Responsibilities
- **API Endpoints**: RESTful endpoints for all medical data operations
- **Business Logic**: Medical calculations, AI analysis, safety checks
- **Data Persistence**: Database operations, migrations, backup
- **Security**: Authentication, authorization, audit logging
- **AI Integration**: Model orchestration, RAG pipelines, medical AI
- **Real-time**: WebSocket management, presence tracking
- **Compliance**: HIPAA, PHI handling, consent management

### Data Contracts
- **API Responses**: Consistent JSON structure with error handling
- **Real-time Events**: Structured WebSocket messages
- **File Uploads**: Multipart form data with validation
- **Medical Data**: FHIR R4 compliant resources
- **AI Results**: Structured analysis with confidence scores

## 🎨 UX Guidelines & Design System

### Design Principles
- **Medical-Grade**: Professional, trustworthy, accessible
- **Efficiency-First**: Streamlined workflows for busy clinicians
- **Safety-Critical**: Clear alerts, confirmations, error prevention
- **Accessibility**: WCAG 2.1 AA compliance, high contrast support

### Design Tokens
```css
/* Medical Color Palette */
--medical-primary: #2563eb;     /* Professional blue */
--medical-secondary: #059669;   /* Success green */
--medical-warning: #d97706;     /* Caution orange */
--medical-danger: #dc2626;      /* Critical red */
--medical-neutral: #6b7280;     /* Neutral gray */

/* Status Colors */
--status-critical: #dc2626;
--status-warning: #d97706;
--status-stable: #059669;
--status-normal: #2563eb;
```

### Component States
- **Loading**: Skeleton screens, progress indicators
- **Error**: Clear error messages with recovery actions
- **Success**: Confirmation feedback, completion states
- **Empty**: Helpful empty states with next steps
- **Disabled**: Clear visual indication of unavailable actions

### Interaction Patterns
- **Medical Workflows**: Step-by-step guidance with progress tracking
- **Data Entry**: Real-time validation, auto-save, undo/redo
- **Collaboration**: Presence indicators, shared annotations
- **Safety**: Confirmation dialogs for critical actions
- **Accessibility**: Keyboard navigation, screen reader support

## ⚡ Performance Budgets

### Frontend Performance
- **Bundle Size**: < 500KB initial load, < 2MB total
- **Page Load**: < 2 seconds for critical pages
- **Time to Interactive**: < 3 seconds
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service worker for offline support

### Backend Performance
- **API Response**: < 200ms for CRUD operations
- **Real-time Latency**: < 100ms for WebSocket messages
- **Database Queries**: < 50ms for indexed queries
- **File Uploads**: < 5MB/s for medical images
- **AI Processing**: < 30 seconds for complex analysis

### Scalability Targets
- **Concurrent Users**: 1000+ healthcare professionals
- **Data Volume**: 10TB+ medical images and records
- **Real-time Sessions**: 100+ simultaneous consultations
- **AI Requests**: 1000+ daily analysis requests

## 🔒 Security & Compliance

### Authentication & Authorization
- **JWT Tokens**: Access + refresh token rotation
- **RBAC**: Role-based access control (clinician/admin/triage/reader)
- **Session Management**: Secure session handling with timeouts
- **Multi-factor**: Optional MFA for sensitive operations

### Data Protection
- **PHI Handling**: Automatic redaction, tokenization
- **Encryption**: AES-256 for data at rest, TLS 1.3 for transit
- **Audit Logging**: Comprehensive audit trails for all actions
- **Consent Management**: Patient consent tracking and enforcement

### Compliance Requirements
- **HIPAA**: Full compliance with privacy and security rules
- **GDPR**: Data protection and privacy rights
- **SOC 2**: Security controls and monitoring
- **Medical Standards**: FHIR R4, DICOM, HL7 compliance

### Security Headers
```http
Content-Security-Policy: strict-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 🧪 Testing Expectations

### Frontend Testing
- **Unit Tests**: >90% coverage for utility functions and hooks
- **Component Tests**: All UI components with user interactions
- **Integration Tests**: API integration and data flow
- **E2E Tests**: Critical user journeys and workflows
- **Accessibility Tests**: Automated a11y testing with axe-core

### Backend Testing
- **Unit Tests**: >90% coverage for business logic
- **API Tests**: All endpoints with various scenarios
- **Integration Tests**: Database and external service integration
- **Security Tests**: Authentication, authorization, data validation
- **Performance Tests**: Load testing for critical endpoints

### Test Data
- **Mock Data**: Realistic medical scenarios and edge cases
- **Synthetic Patients**: HIPAA-compliant test data
- **Medical Images**: Sample DICOM files for testing
- **Waveform Data**: Sample ECG and vital sign data

## 🚀 Implementation Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode, no `any` types
- **Python**: Type hints, mypy compliance
- **Documentation**: JSDoc for functions, docstrings for Python
- **Error Handling**: Comprehensive error boundaries and logging
- **Code Review**: All changes require peer review

### Development Workflow
- **Git Flow**: Feature branches, pull requests, semantic commits
- **CI/CD**: Automated testing, linting, and deployment
- **Environment**: Development, staging, production environments
- **Monitoring**: Application performance and error tracking

### Medical Domain Rules
- **Data Validation**: Strict validation for medical data
- **Safety Checks**: Drug interactions, contraindications
- **Clinical Guidelines**: Evidence-based decision support
- **Audit Requirements**: Complete audit trail for all changes

## 🎯 Success Criteria

### Functional Requirements
- [ ] Complete patient management workflow
- [ ] Real-time consultation capabilities
- [ ] Medical image viewing and analysis
- [ ] Clinical decision support integration
- [ ] Comprehensive audit logging

### Non-Functional Requirements
- [ ] < 2 second page load times
- [ ] 99.9% uptime for critical systems
- [ ] HIPAA compliance certification
- [ ] Mobile-responsive design
- [ ] WCAG 2.1 AA accessibility

### User Experience Goals
- [ ] Intuitive medical workflow navigation
- [ ] Reduced time for common tasks
- [ ] Clear error messages and recovery
- [ ] Professional medical-grade interface
- [ ] Seamless real-time collaboration

## 🔧 Technical Constraints

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Accessibility**: Screen readers, keyboard navigation, high contrast

### Infrastructure
- **Cloud Platform**: AWS/GCP with container orchestration
- **Database**: PostgreSQL 14+ with pgvector extension
- **Storage**: S3-compatible object storage
- **CDN**: Global content delivery for static assets

### Third-Party Integrations
- **AI Services**: OpenAI, Anthropic, medical AI providers
- **EHR Systems**: FHIR R4 compliant integrations
- **Medical Devices**: DICOM, HL7, device APIs
- **Authentication**: OAuth 2.0, SAML, SMART-on-FHIR

## 📋 Development Priorities

### Phase 1: Core Infrastructure
1. Authentication and user management
2. Basic patient and encounter management
3. Medical data models and validation
4. Real-time communication foundation

### Phase 2: Medical Features
1. DICOM image viewing and analysis
2. ECG waveform analysis
3. Clinical decision support
4. Medical terminology integration

### Phase 3: AI Integration
1. Multimodal AI analysis
2. Natural language processing
3. Predictive analytics
4. Automated clinical insights

### Phase 4: Advanced Features
1. Advanced collaboration tools
2. Mobile applications
3. Advanced analytics and reporting
4. Third-party integrations

---

**This prompt declaration serves as the comprehensive guide for Claude AI collaboration on the AI Multimodal Medical Assistant project. All development should align with these specifications while maintaining the highest standards of medical software development.**
