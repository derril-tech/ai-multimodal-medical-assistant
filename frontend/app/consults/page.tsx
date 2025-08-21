'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  MessageSquare,
  Video,
  Phone,
  Mic,
  Send,
  Brain,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Camera,
  FileText,
  Activity
} from 'lucide-react'

// Mock data for consultations
const mockConsults = [
  {
    id: 'CONS-001',
    patientName: 'Sarah Johnson',
    patientId: 'P001',
    type: 'video',
    status: 'active',
    provider: 'Dr. Michael Chen',
    startTime: '2024-01-15T14:30:00Z',
    duration: '25 min',
    aiAssisted: true,
    priority: 'normal'
  },
  {
    id: 'CONS-002',
    patientName: 'Michael Chen',
    patientId: 'P002',
    type: 'audio',
    status: 'scheduled',
    provider: 'Dr. Emily Rodriguez',
    startTime: '2024-01-15T16:00:00Z',
    duration: '30 min',
    aiAssisted: true,
    priority: 'urgent'
  },
  {
    id: 'CONS-003',
    patientName: 'Emily Rodriguez',
    patientId: 'P003',
    type: 'chat',
    status: 'completed',
    provider: 'Dr. Sarah Johnson',
    startTime: '2024-01-15T10:00:00Z',
    duration: '15 min',
    aiAssisted: false,
    priority: 'normal'
  }
]

export default function ConsultsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedConsult, setSelectedConsult] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const filteredConsults = mockConsults.filter(consult => {
    const matchesSearch = consult.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consult.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || consult.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-gray-600 bg-gray-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4 text-blue-500" />
      case 'audio': return <Phone className="h-4 w-4 text-green-500" />
      case 'chat': return <MessageSquare className="h-4 w-4 text-purple-500" />
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'normal': return 'text-blue-600 bg-blue-100'
      case 'low': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // TODO: Send message to backend
      console.log('Sending message:', chatMessage)
      setChatMessage('')
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // TODO: Implement voice recording
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/patients" className="text-gray-600 hover:text-gray-900">Patients</Link>
              <Link href="/encounters" className="text-gray-600 hover:text-gray-900">Encounters</Link>
              <Link href="/consults" className="text-blue-600 font-medium">Consults</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">AI-Powered Consultations</h2>
              <p className="text-gray-600">Real-time medical consultations with AI assistance</p>
            </div>
            <Button className="medical">
              <Plus className="h-4 w-4 mr-2" />
              New Consultation
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search consultations by patient name or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Consultations List */}
          <div className="lg:col-span-1">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Active Consultations</CardTitle>
                <CardDescription>Current and scheduled consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredConsults.map((consult) => (
                    <div
                      key={consult.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedConsult === consult.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedConsult(consult.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(consult.type)}
                          <span className="font-medium text-sm">{consult.patientName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {consult.aiAssisted && <Brain className="h-3 w-3 text-purple-500" />}
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consult.status)}`}>
                            {consult.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Provider: {consult.provider}</div>
                        <div>Duration: {consult.duration}</div>
                        <div className="flex items-center justify-between">
                          <span>Priority: {consult.priority}</span>
                          <span>{new Date(consult.startTime).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Interface */}
          <div className="lg:col-span-2">
            <Card className="medical-card h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Consultation Room</CardTitle>
                    <CardDescription>
                      {selectedConsult ? 'Active consultation with AI assistance' : 'Select a consultation to begin'}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {selectedConsult ? (
                  <>
                    {/* Video/Audio Area */}
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Video consultation in progress</p>
                        <p className="text-sm text-gray-500">Patient: Sarah Johnson</p>
                      </div>
                    </div>

                    {/* AI Assistant Panel */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">AI Assistant</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Patient shows signs of elevated blood pressure. Consider reviewing recent lab results and medication history.
                      </p>
                    </div>

                    {/* Chat Interface */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <div className="bg-blue-600 text-white rounded-lg px-3 py-2 max-w-xs">
                            <p className="text-sm">How are you feeling today, Sarah?</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white border rounded-lg px-3 py-2 max-w-xs">
                            <p className="text-sm">I've been experiencing some chest discomfort and shortness of breath.</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-blue-600 text-white rounded-lg px-3 py-2 max-w-xs">
                            <p className="text-sm">I understand. Let me review your recent vitals and we'll investigate further.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="sm"
                        onClick={toggleRecording}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No consultation selected</h3>
                      <p className="text-gray-600">Choose a consultation from the list to begin</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Features Panel */}
        <div className="mt-8">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>AI-Powered Features</CardTitle>
              <CardDescription>Advanced medical assistance capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Real-time Analysis</h3>
                  <p className="text-sm text-gray-600">
                    AI analyzes patient symptoms, vitals, and medical history in real-time
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Mic className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Voice Transcription</h3>
                  <p className="text-sm text-gray-600">
                    Automatic speech-to-text for clinical notes and documentation
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Clinical Alerts</h3>
                  <p className="text-sm text-gray-600">
                    Intelligent alerts for drug interactions and contraindications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
