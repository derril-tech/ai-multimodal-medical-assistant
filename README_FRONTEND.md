# Frontend - AI Multimodal Medical Assistant

This is the frontend application for the AI Multimodal Medical Assistant, built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes  
│   ├── patients/          # Patient management
│   ├── encounters/        # Medical encounters
│   ├── imaging/           # DICOM viewer
│   ├── guidelines/        # Medical guidelines
│   ├── admin/             # Administrative interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── charts/           # Data visualization
│   ├── medical/          # Medical-specific components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
└── public/               # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests

## 🎨 Design System

The application uses a medical-themed design system with:

- **Colors**: Medical blue, green, amber, and red for status indicators
- **Components**: shadcn/ui with medical-specific customizations
- **Typography**: Inter font for readability
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach

### Medical Color Palette

```css
--medical-primary: #2563eb    /* Medical blue */
--medical-secondary: #059669  /* Medical green */
--medical-warning: #d97706    /* Medical amber */
--medical-danger: #dc2626     /* Medical red */
--medical-success: #16a34a    /* Success green */
--medical-info: #0891b2       /* Info cyan */
```

## 🔧 Key Features

### Medical Dashboard
- Patient overview with vitals and AI insights
- Real-time monitoring and alerts
- Clinical decision support integration

### DICOM Viewer
- Medical imaging with AI analysis
- Multi-planar reconstruction (MPR)
- Annotation and measurement tools

### Chart Summary Canvas
- Timeline visualization of patient data
- Trend analysis and predictions
- Interactive data exploration

### Orders Composer
- Structured order creation with AI assistance
- Safety checks and drug interactions
- Template-based workflows

### Clinician Copilot Chat
- Multimodal AI chat interface
- Medical knowledge integration
- Real-time collaboration

## 🔐 Security & Compliance

- **Authentication**: JWT-based with role-based access control
- **Authorization**: RBAC for clinician/admin/triage roles
- **Data Protection**: PHI redaction and de-identification
- **Audit Trail**: Comprehensive logging for compliance
- **Consent Management**: Patient consent tracking

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Optimized for tablets and phones
- **Desktop**: Full-featured interface for workstations
- **Touch**: Touch-friendly interactions
- **Accessibility**: Screen reader support and keyboard navigation

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 🔗 API Integration

The frontend communicates with the backend API:

- **Base URL**: Configured via `NEXT_PUBLIC_API_URL`
- **Authentication**: JWT tokens in Authorization header
- **Real-time**: WebSocket connections for live updates
- **Error Handling**: Consistent error responses

## 📊 Performance

- **Bundle Size**: Optimized with code splitting
- **Loading**: < 2 second page load times
- **Caching**: React Query for efficient data fetching
- **Images**: Optimized with Next.js Image component

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `next.config.js`
2. **API connection errors**: Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. **Build errors**: Clear `.next` folder and reinstall dependencies

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
- Consult the [shadcn/ui documentation](https://ui.shadcn.com)

## 📄 License

This project is proprietary and confidential. All rights reserved.
