# Claude AI Collaboration Guide - AI Multimodal Medical Assistant

This document provides comprehensive guidelines for Claude AI to effectively collaborate on the AI Multimodal Medical Assistant project.

## 🎯 Project Overview

**Purpose**: Build a comprehensive AI-powered medical assistant platform for healthcare professionals that integrates multimodal data analysis, real-time collaboration, and evidence-based clinical decision support.

**Tech Stack**:
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Python 3.11, SQLAlchemy 2.0, PostgreSQL with pgvector
- **AI/ML**: LangChain, OpenAI, Anthropic, Transformers, Medical AI models
- **Real-time**: WebSockets, Socket.IO
- **Storage**: S3/GCS, DICOM storage
- **Security**: JWT, RBAC, HIPAA compliance

**Target Users**: Healthcare professionals (physicians, nurses, radiologists, administrators)

**Goals**: Streamline patient care, improve diagnostic accuracy, enhance clinical decision-making, ensure compliance

## 📁 Folder & File Structure

### ✅ Editable Files
- `frontend/app/` - Next.js pages and layouts
- `frontend/components/` - React components
- `frontend/lib/` - Utility functions and configurations
- `frontend/hooks/` - Custom React hooks
- `frontend/types/` - TypeScript definitions
- `backend/app/api/v1/endpoints/` - API endpoint implementations
- `backend/app/models/` - Database models
- `backend/app/schemas/` - Pydantic schemas
- `backend/app/services/` - Business logic services
- `backend/app/utils/` - Utility functions
- `tests/` - Test files

### 🔒 Do-Not-Touch Files
- `docs/` - Documentation (read-only for Claude)
- `scripts/` - Deployment and setup scripts
- `package.json` (root) - Monorepo configuration
- `backend/main.py` - FastAPI app entry point
- `backend/app/core/config.py` - Core configuration
- `backend/app/core/database.py` - Database connection setup
- `frontend/next.config.js` - Next.js configuration
- `frontend/tailwind.config.js` - Tailwind configuration
- `frontend/app/globals.css` - Global styles

### 📝 TODO Markers
Look for these markers throughout the codebase:
- `TODO: Implement [feature]`
- `TODO: Add [component]`
- `TODO: Connect to [service]`
- `TODO: Add tests for [module]`

## 🎨 Coding Conventions

### Frontend (TypeScript/React)
```typescript
// File naming: PascalCase for components, camelCase for utilities
// ComponentExample.tsx, useCustomHook.ts

// Component structure
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function ComponentExample({ title, onAction }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="medical-card">
      <h2>{title}</h2>
      {/* JSX */}
    </div>
  );
}
```

### Backend (Python/FastAPI)
```python
# File naming: snake_case
# component_example.py

# Import order: stdlib, third-party, local
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from app.core.database import get_db
from app.schemas.example import ExampleSchema

router = APIRouter()

@router.get("/examples/", response_model=List[ExampleSchema])
async def get_examples(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    """Get list of examples with pagination."""
    # Implementation
    pass
```

### Styling (Tailwind CSS)
```tsx
// Use medical-themed classes
<div className="medical-card bg-white rounded-lg shadow-md p-6">
  <div className="status-critical text-white px-2 py-1 rounded">
    Critical
  </div>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## 🤖 AI Collaboration Rules

### Response Format
1. **Understand the request** - Clarify requirements if unclear
2. **Provide context** - Explain your approach and reasoning
3. **Generate code** - Complete, working code with proper imports
4. **Include tests** - Unit tests for critical functionality
5. **Document changes** - Add comments explaining complex logic

### Edit Rules
- **Full-file edits**: For new files or complete rewrites
- **Patch edits**: For specific function updates
- **Preserve structure**: Maintain existing folder organization
- **Follow patterns**: Use established conventions in the codebase

### Ambiguity Handling
When requirements are unclear:
1. Ask specific questions about functionality
2. Propose multiple approaches with pros/cons
3. Suggest the most medical-appropriate solution
4. Consider HIPAA compliance and security implications

### Medical Domain Knowledge
- **Terminology**: Use standard medical terminology (SNOMED CT, LOINC, ICD-10)
- **Compliance**: Ensure HIPAA compliance in all implementations
- **Safety**: Prioritize patient safety in AI recommendations
- **Evidence**: Base decisions on medical evidence and guidelines

## 🔧 Dependencies & Setup

### Frontend Dependencies
```json
{
  "next": "14.0.4",
  "react": "^18.2.0",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.0",
  "@tanstack/react-query": "^5.17.9",
  "zustand": "^4.4.7",
  "zod": "^3.22.4"
}
```

### Backend Dependencies
```txt
fastapi==0.104.1
sqlalchemy==2.0.23
pydantic==2.5.0
langchain==0.1.0
openai==1.6.1
anthropic==0.7.8
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Backend (.env)
DATABASE_URL=postgresql+asyncpg://user:password@localhost/medical_assistant
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

## 🚀 Workflow & Tools

### Development Commands
```bash
# Root level
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run test         # Run all tests

# Frontend only
cd frontend
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run lint         # Run ESLint

# Backend only
cd backend
uvicorn main:app --reload  # Start FastAPI dev server
pytest                    # Run tests
black .                   # Format code
```

### Frontend/Backend Boundary
- **Frontend**: UI components, state management, API calls
- **Backend**: Business logic, database operations, AI services
- **API Contract**: Defined in `docs/API_SPEC.md`
- **Data Flow**: Frontend → API → Backend → Database/AI Services

### Deployment Notes
- **Frontend**: Vercel/Netlify for static hosting
- **Backend**: Docker containers on cloud platform
- **Database**: Managed PostgreSQL with pgvector extension
- **Storage**: S3/GCS for file storage
- **Monitoring**: Sentry for error tracking, Prometheus for metrics

## 🧠 Contextual Knowledge

### Medical Domain Rules
1. **Patient Privacy**: All PHI must be properly handled and redacted
2. **Audit Trail**: All actions must be logged for compliance
3. **Consent Management**: Patient consent must be tracked and enforced
4. **Clinical Safety**: AI recommendations must include confidence scores and disclaimers
5. **Evidence-Based**: All clinical decisions should reference medical guidelines

### Business Logic Caveats
- **Role-Based Access**: Different user roles have different permissions
- **Real-time Collaboration**: Multiple users can work on same patient simultaneously
- **AI Explainability**: All AI decisions must include rationale and sources
- **Data Integrity**: Medical data must be immutable and version-controlled
- **Compliance**: HIPAA, GDPR, and other healthcare regulations must be followed

### Technical Constraints
- **Performance**: UI must be responsive (< 2s load time)
- **Scalability**: Must handle 1000+ concurrent users
- **Reliability**: 99.9% uptime requirement
- **Security**: End-to-end encryption for all data
- **Compatibility**: Must work on modern browsers and mobile devices

## 📝 Examples

### ✅ Good AI Answer
```typescript
// Clear, well-structured component with proper typing
interface PatientCardProps {
  patient: Patient;
  onSelect: (patientId: string) => void;
  isSelected?: boolean;
}

export function PatientCard({ patient, onSelect, isSelected = false }: PatientCardProps) {
  const handleClick = () => {
    onSelect(patient.id);
  };

  return (
    <div 
      className={`medical-card cursor-pointer transition-colors ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{patient.name}</h3>
          <p className="text-sm text-gray-500">MRN: {patient.mrn}</p>
        </div>
      </div>
    </div>
  );
}
```

### ❌ Bad AI Answer
```typescript
// Poor structure, no typing, hardcoded values
export function PatientCard(props) {
  return (
    <div onClick={() => props.onSelect(props.patient.id)}>
      <h3>{props.patient.name}</h3>
      <p>MRN: {props.patient.mrn}</p>
    </div>
  );
}
```

### ✅ Good Backend Answer
```python
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.patient import PatientCreate, PatientResponse
from app.services.patient_service import PatientService

router = APIRouter()

@router.post("/patients/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(
    patient_data: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> PatientResponse:
    """Create a new patient record with proper validation and audit logging."""
    try:
        patient_service = PatientService(db)
        patient = await patient_service.create_patient(patient_data, current_user.id)
        return PatientResponse.from_orm(patient)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to create patient: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

## 🎯 Success Criteria

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] ESLint and Prettier formatting
- [ ] Comprehensive test coverage (>80%)
- [ ] Proper error handling and logging
- [ ] Accessibility compliance (WCAG 2.1 AA)

### Medical Compliance
- [ ] HIPAA-compliant data handling
- [ ] Proper audit logging
- [ ] Consent management
- [ ] PHI redaction
- [ ] Role-based access control

### Performance
- [ ] < 2 second page load times
- [ ] Optimized bundle sizes
- [ ] Efficient database queries
- [ ] Proper caching strategies
- [ ] Real-time updates < 100ms latency

### User Experience
- [ ] Intuitive medical workflow
- [ ] Mobile-responsive design
- [ ] Clear error messages
- [ ] Loading states and feedback
- [ ] Accessibility features

This guide ensures Claude AI can effectively contribute to building a world-class medical AI platform while maintaining the highest standards of quality, security, and compliance.



