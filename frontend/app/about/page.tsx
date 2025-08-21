import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Brain, 
  Users, 
  Zap, 
  Lock, 
  Globe,
  Award,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">AI Medical Assistant</h1>
            </div>
                                    <nav className="flex space-x-4">
                          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                          <Link href="/about" className="text-blue-600 font-medium">About</Link>
                          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                          <Link href="/patients" className="text-gray-600 hover:text-gray-900">Patients</Link>
                          <Link href="/encounters" className="text-gray-600 hover:text-gray-900">Encounters</Link>
                          <Link href="/consults" className="text-gray-600 hover:text-gray-900">Consults</Link>
                        </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Revolutionizing Healthcare with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our multimodal AI medical assistant combines cutting-edge technology with 
            clinical expertise to support healthcare professionals in delivering 
            exceptional patient care.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="medical">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Medical AI Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI-powered tools designed specifically for healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="medical-card">
              <CardHeader>
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Multimodal Analysis</CardTitle>
                <CardDescription>
                  Process text, images, audio, and medical data simultaneously
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Advanced AI models analyze medical images, transcribe consultations, 
                  and extract insights from patient records in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Clinical Safety</CardTitle>
                <CardDescription>
                  Built-in safety checks and clinical validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Drug interaction detection, contraindication alerts, and 
                  evidence-based clinical decision support.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Real-time collaboration and communication tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Live consultations, shared annotations, and seamless 
                  communication between healthcare teams.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Real-time Processing</CardTitle>
                <CardDescription>
                  Instant analysis and response capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Stream processing for live consultations, instant 
                  transcription, and immediate clinical insights.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <Lock className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security and privacy protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  End-to-end encryption, audit trails, and compliance 
                  with healthcare privacy regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <Globe className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Global Standards</CardTitle>
                <CardDescription>
                  FHIR integration and international medical standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  FHIR R4 compliance, SNOMED CT terminology, and 
                  support for international healthcare protocols.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Medical Centers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading healthcare institutions in adopting AI-powered 
            medical assistance technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Link href="/">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">AI Medical Assistant</span>
              </div>
              <p className="text-gray-400">
                Advancing healthcare through intelligent AI technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/about" className="hover:text-white">Features</Link></li>
                <li><Link href="/" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/" className="hover:text-white">Terms</Link></li>
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
