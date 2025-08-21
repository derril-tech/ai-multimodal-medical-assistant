import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Stethoscope, 
  Brain, 
  FileText, 
  Camera, 
  Activity, 
  Users,
  Shield,
  Zap
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Medical Assistant
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/patients" className="text-gray-600 hover:text-blue-600">
                Patients
              </Link>
              <Link href="/encounters" className="text-gray-600 hover:text-blue-600">
                Encounters
              </Link>
              <Link href="/guidelines" className="text-gray-600 hover:text-blue-600">
                Guidelines
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Medical
              <span className="text-blue-600"> Intelligence</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive multimodal AI assistant for healthcare professionals. 
              Streamline patient care with intelligent analysis, real-time insights, 
              and evidence-based recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Patient Assessment
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Medical AI Platform
            </h3>
            <p className="text-xl text-gray-600">
              Everything you need for intelligent patient care and clinical decision support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  Advanced AI models for medical image analysis, text processing, and clinical decision support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Smart Documentation</CardTitle>
                <CardDescription>
                  Automated note-taking, coding assistance, and intelligent form completion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Imaging Analysis</CardTitle>
                <CardDescription>
                  DICOM viewer with AI-powered image interpretation and annotation tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Activity className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Vital Monitoring</CardTitle>
                <CardDescription>
                  Real-time vital signs tracking with AI-powered trend analysis and alerts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Collaboration</CardTitle>
                <CardDescription>
                  Multi-user support with real-time collaboration and consultation features
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  HIPAA-compliant platform with enterprise-grade security and audit trails
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Medical Practice?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals using AI to improve patient outcomes
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Zap className="mr-2 h-5 w-5" />
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Stethoscope className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">AI Medical Assistant</span>
              </div>
              <p className="text-gray-400">
                Empowering healthcare professionals with intelligent AI solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/compliance" className="hover:text-white">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Medical Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
