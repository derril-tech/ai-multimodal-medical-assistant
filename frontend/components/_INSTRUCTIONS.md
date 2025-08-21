# Frontend Components Directory

## CLAUDE_TASK: Component Development Guidelines

This directory contains all React components for the AI Medical Assistant frontend. Follow these guidelines when creating or modifying components:

### Component Structure

1. **Component Organization**
   - Use TypeScript for all components
   - Follow the `components/ui/` pattern for shadcn/ui components
   - Create feature-specific components in subdirectories
   - Use PascalCase for component names

2. **Component Types**
   - **UI Components** (`ui/`): Reusable, generic components (Button, Card, etc.)
   - **Feature Components**: Domain-specific components (PatientCard, EncounterList, etc.)
   - **Layout Components**: Page layouts and navigation
   - **Form Components**: Form inputs and validation

3. **Component Patterns**
   - Use functional components with hooks
   - Implement proper TypeScript interfaces for props
   - Use React.memo() for performance optimization when needed
   - Follow the single responsibility principle

### Styling Guidelines

1. **Tailwind CSS**
   - Use Tailwind utility classes for styling
   - Leverage the medical design system colors
   - Use responsive design patterns
   - Follow accessibility guidelines

2. **Medical Design System**
   - Use `medical-card`, `medical-button` classes
   - Implement status colors (success, warning, error, info)
   - Follow WCAG 2.1 AA compliance
   - Use consistent spacing and typography

### State Management

1. **Local State**: Use `useState` for component-specific state
2. **Global State**: Use Zustand for application-wide state
3. **Server State**: Use React Query for API data
4. **Form State**: Use React Hook Form with Zod validation

### Performance Considerations

1. **Code Splitting**: Use dynamic imports for large components
2. **Memoization**: Use `useMemo` and `useCallback` appropriately
3. **Bundle Size**: Keep components lightweight
4. **Lazy Loading**: Implement for heavy components

### Testing Requirements

1. **Unit Tests**: Test component logic and rendering
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Ensure WCAG compliance
4. **Visual Tests**: Test responsive design

### Medical-Specific Requirements

1. **HIPAA Compliance**: Never log or expose PHI
2. **Error Handling**: Graceful error states for medical data
3. **Loading States**: Clear loading indicators for medical operations
4. **Validation**: Strict validation for medical data inputs

### TODO: Component Development Tasks

- [ ] Create PatientCard component with medical data display
- [ ] Implement EncounterList with filtering and search
- [ ] Build AIAnalysisViewer for displaying AI insights
- [ ] Create DICOMViewer component for medical imaging
- [ ] Implement RealTimeChat for consultations
- [ ] Build ClinicalNoteEditor with rich text support
- [ ] Create VitalSignsChart for patient monitoring
- [ ] Implement MedicationList with drug interaction warnings
- [ ] Build LabResultsViewer with reference ranges
- [ ] Create ProviderSelector with role-based filtering

### File Naming Conventions

- Component files: `ComponentName.tsx`
- Type files: `ComponentName.types.ts`
- Test files: `ComponentName.test.tsx`
- Style files: `ComponentName.module.css` (if needed)

### Import/Export Patterns

```typescript
// Component file structure
import React from 'react'
import { ComponentProps } from './ComponentName.types'
import { cn } from '@/lib/utils'

export const ComponentName: React.FC<ComponentProps> = ({ 
  className, 
  ...props 
}) => {
  return (
    <div className={cn('medical-card', className)} {...props}>
      {/* Component content */}
    </div>
  )
}

export default ComponentName
```

### Accessibility Requirements

1. **ARIA Labels**: Proper labeling for screen readers
2. **Keyboard Navigation**: Full keyboard accessibility
3. **Color Contrast**: Meet WCAG contrast requirements
4. **Focus Management**: Clear focus indicators
5. **Semantic HTML**: Use appropriate HTML elements

### Error Boundaries

Implement error boundaries for critical medical components:

```typescript
class MedicalErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

### Documentation

- Document complex component logic
- Include usage examples
- Document prop interfaces
- Add accessibility notes
- Include performance considerations
