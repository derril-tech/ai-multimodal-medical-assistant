# Frontend Instructions

This folder contains the Next.js 14 frontend application for the AI Multimodal Medical Assistant.

## 🎯 Claude Task: Frontend Development

### Current Status
- ✅ Basic Next.js 14 setup with App Router
- ✅ Tailwind CSS configuration with medical theme
- ✅ shadcn/ui components setup
- ✅ Landing page with medical features
- ✅ Basic component structure

### TODO: Implement Core Features

#### 1. Authentication System
- [ ] Login/logout pages
- [ ] JWT token management
- [ ] Role-based access control
- [ ] Session management

#### 2. Patient Management
- [ ] Patient list with search and filtering
- [ ] Patient detail pages
- [ ] Patient creation/editing forms
- [ ] Medical record viewer

#### 3. Medical Dashboard
- [ ] Patient overview cards
- [ ] Vital signs monitoring
- [ ] AI insights display
- [ ] Real-time alerts

#### 4. DICOM Viewer
- [ ] Medical image display
- [ ] Zoom and pan controls
- [ ] Measurement tools
- [ ] AI analysis overlay

#### 5. Clinical Notes
- [ ] Note creation/editing
- [ ] Speech-to-text integration
- [ ] Template system
- [ ] AI coding assistance

#### 6. Orders Management
- [ ] Order creation forms
- [ ] Drug interaction checking
- [ ] Template-based orders
- [ ] AI order suggestions

#### 7. Real-time Collaboration
- [ ] WebSocket integration
- [ ] Live chat interface
- [ ] Presence indicators
- [ ] Shared annotations

### Development Guidelines

#### Component Structure
```typescript
// Use this pattern for new components
interface ComponentProps {
  // Define props with proper typing
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Implementation
}
```

#### Styling
- Use Tailwind CSS classes
- Follow medical color palette
- Ensure accessibility (WCAG 2.1 AA)
- Mobile-first responsive design

#### State Management
- Use React Query for server state
- Use Zustand for global UI state
- Use React Hook Form for forms

#### API Integration
- Use the `apiRequest` utility function
- Handle loading and error states
- Implement proper error boundaries

### File Organization
- `app/` - Next.js pages and layouts
- `components/ui/` - Reusable UI components
- `components/medical/` - Medical-specific components
- `lib/` - Utility functions and configurations
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions

### Testing
- Write unit tests for components
- Test user interactions
- Ensure accessibility compliance
- Test responsive design

### Performance
- Optimize bundle size
- Implement code splitting
- Use Next.js Image optimization
- Monitor Core Web Vitals
