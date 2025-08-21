'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Activity,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Camera,
  Mic,
  Brain
} from 'lucide-react'
import { mockEncounters } from '@/data/mock-data'

export default function EncountersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEncounter, setSelectedEncounter] = useState<string | null>(null)

  const filteredEncounters = mockEncounters.filter(encounter => {
    const matchesSearch = encounter.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         encounter.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || encounter.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'scheduled': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'scheduled': return <Calendar className="h-4 w-4 text-yellow-500" />
      case 'cancelled': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getEncounterTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Brain className="h-4 w-4 text-purple-500" />
      case 'imaging': return <Camera className="h-4 w-4 text-blue-500" />
      case 'examination': return <User className="h-4 w-4 text-green-500" />
      case 'procedure': return <Activity className="h-4 w-4 text-orange-500" />
      default: return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Activity className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">Encounters</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/patients" className="text-gray-600 hover:text-gray-900">Patients</Link>
              <Link href="/encounters" className="text-blue-600 font-medium">Encounters</Link>
              <Link href="/consults" className="text-gray-600 hover:text-gray-900">Consults</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Patient Encounters</h2>
              <p className="text-gray-600">View and manage patient encounters and medical visits</p>
            </div>
            <Button className="medical">
              <Plus className="h-4 w-4 mr-2" />
              New Encounter
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search encounters by patient name or ID..."
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
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Encounters List */}
        <div className="space-y-4">
          {filteredEncounters.map((encounter) => (
            <Card 
              key={encounter.id} 
              className="medical-card cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedEncounter(encounter.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getEncounterTypeIcon(encounter.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{encounter.patientName}</h3>
                        <p className="text-sm text-gray-600">Encounter ID: {encounter.id}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(encounter.status)}`}>
                        {encounter.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{encounter.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Dr. {encounter.providerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{encounter.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-700">{encounter.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(encounter.status)}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Clinical Notes
                      </Button>
                      <Button size="sm" variant="outline">
                        Orders
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Duration: {encounter.duration}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEncounters.length === 0 && (
          <Card className="medical-card">
            <CardContent className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No encounters found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by creating your first encounter.'
                }
              </p>
              <Button className="medical">
                <Plus className="h-4 w-4 mr-2" />
                New Encounter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Encounter Detail Modal */}
        {selectedEncounter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Encounter Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEncounter(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Encounter Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Patient</label>
                      <p className="text-gray-900">Sarah Johnson</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Encounter ID</label>
                      <p className="text-gray-900">ENC-2024-001</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <p className="text-gray-900">Consultation</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <p className="text-gray-900">Completed</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Provider & Location</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Provider</label>
                      <p className="text-gray-900">Dr. Michael Chen</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">Cardiology Clinic</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date & Time</label>
                      <p className="text-gray-900">January 15, 2024 at 2:30 PM</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Duration</label>
                      <p className="text-gray-900">45 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedEncounter(null)}>
                    Close
                  </Button>
                  <Button className="medical">
                    View Full Record
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
