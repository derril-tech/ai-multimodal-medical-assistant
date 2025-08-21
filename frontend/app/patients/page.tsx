'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { mockPatients } from '@/data/mock-data'

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'stable': return 'text-green-600 bg-green-100'
      case 'discharged': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'active': return <Clock className="h-4 w-4 text-blue-500" />
      case 'stable': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'discharged': return <CheckCircle className="h-4 w-4 text-gray-500" />
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
              <Users className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/patients" className="text-blue-600 font-medium">Patients</Link>
              <Link href="/encounters" className="text-gray-600 hover:text-gray-900">Encounters</Link>
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
              <h2 className="text-3xl font-bold text-gray-900">Patients</h2>
              <p className="text-gray-600">Manage patient records and view medical history</p>
            </div>
            <Button className="medical">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search patients by name or MRN..."
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
              <option value="critical">Critical</option>
              <option value="active">Active</option>
              <option value="stable">Stable</option>
              <option value="discharged">Discharged</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card 
              key={patient.id} 
              className="medical-card cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedPatient(patient.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                    <p className="text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
                  </div>
                  {getStatusIcon(patient.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last Visit: {patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{patient.address.city}, {patient.address.state}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{patient.contactInfo.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        New Encounter
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <Card className="medical-card">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by adding your first patient.'
                }
              </p>
              <Button className="medical">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Patient Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPatient(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">Sarah Johnson</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">MRN</label>
                      <p className="text-gray-900">MRN-2024-001</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="text-gray-900">March 15, 1990 (34 years)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gender</label>
                      <p className="text-gray-900">Female</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">(555) 123-4567</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">sarah.johnson@email.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="text-gray-900">123 Main St, Anytown, CA 90210</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>
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
