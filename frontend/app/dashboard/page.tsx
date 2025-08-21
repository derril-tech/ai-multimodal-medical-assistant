'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Activity, 
  FileText, 
  Camera, 
  Mic, 
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Heart,
  Thermometer,
  Droplets,
  Gauge
} from 'lucide-react'

// Mock data for demonstration
const mockPatients = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    age: 34,
    mrn: 'MRN-2024-001',
    status: 'active',
    lastVisit: '2024-01-15',
    vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 98.6, oxygen: 98 }
  },
  {
    id: 'P002',
    name: 'Michael Chen',
    age: 67,
    mrn: 'MRN-2024-002',
    status: 'critical',
    lastVisit: '2024-01-14',
    vitals: { heartRate: 95, bloodPressure: '145/95', temperature: 99.2, oxygen: 92 }
  },
  {
    id: 'P003',
    name: 'Emily Rodriguez',
    age: 28,
    mrn: 'MRN-2024-003',
    status: 'stable',
    lastVisit: '2024-01-13',
    vitals: { heartRate: 68, bloodPressure: '118/75', temperature: 98.4, oxygen: 99 }
  }
]

const mockAlerts = [
  { id: 1, type: 'critical', message: 'Patient P002 showing elevated blood pressure', time: '2 min ago' },
  { id: 2, type: 'warning', message: 'New lab results available for P001', time: '15 min ago' },
  { id: 3, type: 'info', message: 'AI analysis completed for P003 imaging', time: '1 hour ago' }
]

const mockStats = {
  totalPatients: 1,247,
  activeEncounters: 23,
  pendingOrders: 8,
  aiAnalyses: 156
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'stable': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Medical Dashboard</h1>
            </div>
                                    <nav className="flex space-x-4">
                          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                          <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                          <Link href="/patients" className="text-gray-600 hover:text-gray-900">Patients</Link>
                          <Link href="/encounters" className="text-gray-600 hover:text-gray-900">Encounters</Link>
                          <Link href="/consults" className="text-gray-600 hover:text-gray-900">Consults</Link>
                        </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Encounters</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.activeEncounters}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.pendingOrders}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Analyses</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.aiAnalyses}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Patient Overview</CardTitle>
                    <CardDescription>Recent patient encounters and status</CardDescription>
                  </div>
                  <Button size="sm" className="medical">
                    <Plus className="h-4 w-4 mr-2" />
                    New Patient
                  </Button>
                </div>
                <div className="flex space-x-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPatient === patient.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPatient(patient.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            MRN: {patient.mrn} • Age: {patient.age} • Last Visit: {patient.lastVisit}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span className="text-xs text-gray-600">{patient.vitals.heartRate} bpm</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Gauge className="h-3 w-3 text-blue-500" />
                              <span className="text-xs text-gray-600">{patient.vitals.bloodPressure}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Thermometer className="h-3 w-3 text-orange-500" />
                              <span className="text-xs text-gray-600">{patient.vitals.temperature}°F</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Droplets className="h-3 w-3 text-cyan-500" />
                              <span className="text-xs text-gray-600">{patient.vitals.oxygen}%</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Imaging Analysis
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Dictation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Consultation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Clinical Notes
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>System notifications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Recent AI-generated recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Patient P002:</strong> Consider adjusting blood pressure medication based on recent readings.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-900">
                      <strong>Patient P001:</strong> Lab results within normal ranges. No immediate action required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Detail Modal Placeholder */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Patient Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPatient(null)}
                >
                  ×
                </Button>
              </div>
              <p className="text-gray-600">
                Detailed patient information and medical history would be displayed here.
                This is a placeholder for the patient detail modal.
              </p>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                  Close
                </Button>
                <Button className="medical">
                  View Full Record
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
