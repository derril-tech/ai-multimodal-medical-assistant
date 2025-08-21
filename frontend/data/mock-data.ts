import { 
  Patient, 
  Encounter, 
  Provider, 
  Location, 
  VitalSigns, 
  LabResult, 
  ImagingStudy, 
  ClinicalNote, 
  Medication, 
  Diagnosis,
  AIAnalysis,
  Notification,
  User
} from '@/types/medical'

// Mock Providers
export const mockProviders: Provider[] = [
  {
    id: '1',
    npi: '1234567890',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    specialty: 'Internal Medicine',
    credentials: 'MD',
    organization: 'City General Hospital'
  },
  {
    id: '2',
    npi: '0987654321',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    specialty: 'Cardiology',
    credentials: 'MD, FACC',
    organization: 'City General Hospital'
  },
  {
    id: '3',
    npi: '1122334455',
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    specialty: 'Emergency Medicine',
    credentials: 'MD',
    organization: 'City General Hospital'
  },
  {
    id: '4',
    npi: '5566778899',
    firstName: 'Dr. James',
    lastName: 'Wilson',
    specialty: 'Radiology',
    credentials: 'MD',
    organization: 'City General Hospital'
  }
]

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Emergency Department',
    type: 'emergency_room',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    }
  },
  {
    id: '2',
    name: 'Cardiology Clinic',
    type: 'clinic',
    address: {
      street: '456 Oak Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    }
  },
  {
    id: '3',
    name: 'Radiology Department',
    type: 'hospital',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    }
  }
]

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'P001',
    mrn: 'MRN-2024-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1990-03-15',
    gender: 'female',
    ethnicity: 'Caucasian',
    race: 'White',
    address: {
      street: '789 Pine St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    },
    contact: {
      phone: '217-555-0101',
      email: 'sarah.johnson@email.com'
    },
    emergencyContact: {
      phone: '217-555-0102',
      email: 'john.johnson@email.com',
      relationship: 'Spouse'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS123456',
      groupNumber: 'GRP789',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'P002',
    mrn: 'MRN-2024-002',
    firstName: 'Michael',
    lastName: 'Chen',
    dateOfBirth: '1957-08-22',
    gender: 'male',
    ethnicity: 'Asian',
    race: 'Asian',
    address: {
      street: '456 Elm St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    },
    contact: {
      phone: '217-555-0201',
      email: 'michael.chen@email.com'
    },
    emergencyContact: {
      phone: '217-555-0202',
      email: 'lisa.chen@email.com',
      relationship: 'Daughter'
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AET789012',
      groupNumber: 'GRP456',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 'P003',
    mrn: 'MRN-2024-003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    dateOfBirth: '1996-12-05',
    gender: 'female',
    ethnicity: 'Hispanic',
    race: 'Hispanic',
    address: {
      street: '321 Maple Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US'
    },
    contact: {
      phone: '217-555-0301',
      email: 'emily.rodriguez@email.com'
    },
    emergencyContact: {
      phone: '217-555-0302',
      email: 'carlos.rodriguez@email.com',
      relationship: 'Father'
    },
    insurance: {
      provider: 'UnitedHealth',
      policyNumber: 'UHC345678',
      groupNumber: 'GRP123',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
]

// Mock Encounters
export const mockEncounters: Encounter[] = [
  {
    id: 'E001',
    patientId: 'P001',
    encounterType: 'outpatient',
    status: 'finished',
    startDate: '2024-01-15T09:00:00Z',
    endDate: '2024-01-15T10:30:00Z',
    provider: mockProviders[0],
    location: mockLocations[1],
    reason: 'Annual physical examination',
    diagnosis: [
      {
        id: 'D001',
        code: 'Z00.00',
        system: 'ICD-10-CM',
        display: 'Encounter for general adult medical examination without abnormal findings',
        status: 'active'
      }
    ],
    procedures: [],
    medications: [],
    notes: [],
    vitals: [
      {
        id: 'V001',
        encounterId: 'E001',
        recordedAt: '2024-01-15T09:15:00Z',
        recordedBy: mockProviders[0],
        temperature: 98.6,
        heartRate: 72,
        bloodPressure: { systolic: 120, diastolic: 80 },
        respiratoryRate: 16,
        oxygenSaturation: 98,
        height: 165,
        weight: 60,
        bmi: 22.0,
        painScale: 0
      }
    ],
    labResults: [
      {
        id: 'L001',
        encounterId: 'E001',
        testName: 'Complete Blood Count',
        loincCode: '58410-2',
        value: '12.5',
        unit: '10^9/L',
        referenceRange: { low: 4.5, high: 11.0 },
        status: 'high',
        performedAt: '2024-01-15T08:00:00Z',
        reportedAt: '2024-01-15T09:30:00Z',
        orderingProvider: mockProviders[0],
        performingLab: 'City General Hospital Lab'
      }
    ],
    imaging: [],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'E002',
    patientId: 'P002',
    encounterType: 'emergency',
    status: 'in_progress',
    startDate: '2024-01-14T14:00:00Z',
    endDate: null,
    provider: mockProviders[2],
    location: mockLocations[0],
    reason: 'Chest pain and shortness of breath',
    diagnosis: [
      {
        id: 'D002',
        code: 'I21.9',
        system: 'ICD-10-CM',
        display: 'Acute myocardial infarction, unspecified',
        severity: 'severe',
        status: 'active'
      }
    ],
    procedures: [
      {
        id: 'P001',
        code: '92928',
        system: 'CPT',
        display: 'Percutaneous transcatheter placement of intracoronary stent(s)',
        performedDate: '2024-01-14T15:30:00Z',
        performer: mockProviders[1],
        status: 'completed'
      }
    ],
    medications: [
      {
        id: 'M001',
        name: 'Aspirin',
        rxnormCode: '1191',
        dosage: '325 mg',
        frequency: 'Once daily',
        route: 'oral',
        startDate: '2024-01-14',
        status: 'active',
        prescribedBy: mockProviders[1],
        instructions: 'Take with food to prevent stomach upset'
      }
    ],
    notes: [
      {
        id: 'N001',
        encounterId: 'E002',
        author: mockProviders[2],
        noteType: 'progress',
        content: 'Patient presented with acute chest pain. ECG showed ST elevation. Immediate cardiac catheterization performed with stent placement.',
        attachments: [],
        tags: ['cardiac', 'emergency'],
        createdAt: '2024-01-14T16:00:00Z',
        updatedAt: '2024-01-14T16:00:00Z'
      }
    ],
    vitals: [
      {
        id: 'V002',
        encounterId: 'E002',
        recordedAt: '2024-01-14T14:15:00Z',
        recordedBy: mockProviders[2],
        temperature: 99.2,
        heartRate: 95,
        bloodPressure: { systolic: 145, diastolic: 95 },
        respiratoryRate: 22,
        oxygenSaturation: 92,
        height: 175,
        weight: 80,
        bmi: 26.1,
        painScale: 8
      }
    ],
    labResults: [
      {
        id: 'L002',
        encounterId: 'E002',
        testName: 'Troponin I',
        loincCode: '10839-9',
        value: '15.2',
        unit: 'ng/mL',
        referenceRange: { low: 0.0, high: 0.04 },
        status: 'critical',
        performedAt: '2024-01-14T14:30:00Z',
        reportedAt: '2024-01-14T15:00:00Z',
        orderingProvider: mockProviders[2],
        performingLab: 'City General Hospital Lab'
      }
    ],
    imaging: [
      {
        id: 'I001',
        encounterId: 'E002',
        modality: 'CT',
        bodySite: 'Chest',
        studyDate: '2024-01-14T14:45:00Z',
        status: 'completed',
        radiologist: mockProviders[3],
        findings: 'No evidence of pulmonary embolism. Heart size normal.',
        impression: 'Normal chest CT',
        images: [
          {
            id: 'IMG001',
            seriesNumber: 1,
            imageNumber: 1,
            url: '/api/imaging/IMG001',
            thumbnailUrl: '/api/imaging/IMG001/thumbnail',
            metadata: {
              patientName: 'Michael Chen',
              studyDate: '2024-01-14',
              modality: 'CT',
              bodyPart: 'Chest'
            }
          }
        ],
        reportUrl: '/api/reports/I001',
        createdAt: '2024-01-14T14:45:00Z',
        updatedAt: '2024-01-14T15:30:00Z'
      }
    ],
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  }
]

// Mock AI Analyses
export const mockAIAnalyses: AIAnalysis[] = [
  {
    id: 'AI001',
    patientId: 'P002',
    encounterId: 'E002',
    analysisType: 'imaging_analysis',
    inputData: {
      imageId: 'IMG001',
      modality: 'CT',
      bodySite: 'Chest'
    },
    results: {
      summary: 'AI analysis of chest CT scan reveals normal cardiac and pulmonary findings with no evidence of acute pathology.',
      findings: [
        {
          type: 'cardiac',
          description: 'Normal cardiac silhouette and chamber sizes',
          severity: 'low',
          confidence: 0.95,
          location: 'heart'
        },
        {
          type: 'pulmonary',
          description: 'Clear lung fields with no evidence of infiltrates or effusions',
          severity: 'low',
          confidence: 0.92,
          location: 'lungs'
        }
      ],
      recommendations: [
        {
          type: 'monitoring',
          description: 'Continue cardiac monitoring for 24 hours post-procedure',
          priority: 'medium',
          rationale: 'Standard protocol following cardiac intervention',
          evidence: [
            {
              type: 'guideline',
              title: 'ACC/AHA Guidelines for STEMI Management',
              url: 'https://www.acc.org/guidelines',
              citation: 'ACC/AHA 2021 STEMI Guidelines',
              relevance: 0.9
            }
          ]
        }
      ],
      confidence: 0.89,
      sources: [
        {
          type: 'guideline',
          title: 'Radiological Society of North America Guidelines',
          url: 'https://www.rsna.org/guidelines',
          citation: 'RSNA 2023 Chest CT Guidelines',
          relevance: 0.85
        }
      ],
      warnings: [
        'AI analysis should be reviewed by qualified radiologist',
        'Clinical correlation required for final interpretation'
      ]
    },
    confidence: 0.89,
    model: 'chest-ct-analyzer-v2.1',
    modelVersion: '2.1.0',
    processingTime: 2.3,
    createdAt: '2024-01-14T15:00:00Z',
    status: 'completed'
  },
  {
    id: 'AI002',
    patientId: 'P001',
    encounterId: 'E001',
    analysisType: 'lab_interpretation',
    inputData: {
      labResultId: 'L001',
      testName: 'Complete Blood Count',
      value: '12.5',
      unit: '10^9/L'
    },
    results: {
      summary: 'Elevated white blood cell count suggests possible infection or inflammatory process.',
      findings: [
        {
          type: 'hematology',
          description: 'Leukocytosis with WBC count of 12.5 x 10^9/L',
          severity: 'medium',
          confidence: 0.88,
          location: 'blood'
        }
      ],
      recommendations: [
        {
          type: 'test',
          description: 'Consider additional testing for infection markers (CRP, ESR)',
          priority: 'medium',
          rationale: 'Elevated WBC count may indicate underlying infection',
          evidence: [
            {
              type: 'guideline',
              title: 'Clinical Laboratory Standards Institute Guidelines',
              url: 'https://clsi.org/guidelines',
              citation: 'CLSI 2023 Hematology Guidelines',
              relevance: 0.82
            }
          ]
        }
      ],
      confidence: 0.88,
      sources: [
        {
          type: 'textbook',
          title: 'Harrison\'s Principles of Internal Medicine',
          url: 'https://accessmedicine.com',
          citation: 'Harrison\'s 21st Edition, Chapter 15',
          relevance: 0.85
        }
      ],
      warnings: [
        'Clinical correlation required',
        'Consider patient history and symptoms'
      ]
    },
    confidence: 0.88,
    model: 'lab-interpreter-v1.5',
    modelVersion: '1.5.2',
    processingTime: 1.8,
    createdAt: '2024-01-15T09:45:00Z',
    status: 'completed'
  }
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    title: 'Critical Lab Result',
    message: 'Patient P002 - Troponin I: 15.2 ng/mL (Critical High)',
    timestamp: '2024-01-14T15:00:00Z',
    read: false,
    action: {
      label: 'View Patient',
      url: '/dashboard/patients/P002'
    }
  },
  {
    id: 'N002',
    type: 'warning',
    title: 'AI Analysis Complete',
    message: 'Chest CT analysis completed for Patient P002',
    timestamp: '2024-01-14T15:05:00Z',
    read: false,
    action: {
      label: 'View Results',
      url: '/dashboard/analysis/AI001'
    }
  },
  {
    id: 'N003',
    type: 'info',
    title: 'New Patient Admitted',
    message: 'Patient P003 admitted to Emergency Department',
    timestamp: '2024-01-13T09:15:00Z',
    read: true
  }
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'U001',
    email: 'dr.johnson@hospital.com',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    role: 'clinician',
    permissions: ['read_patients', 'write_patients', 'read_encounters', 'write_encounters', 'ai_analysis'],
    organization: 'City General Hospital',
    lastLogin: '2024-01-15T08:00:00Z'
  },
  {
    id: 'U002',
    email: 'admin@hospital.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    permissions: ['read_patients', 'write_patients', 'read_encounters', 'write_encounters', 'ai_analysis', 'admin_users', 'view_audit_logs'],
    organization: 'City General Hospital',
    lastLogin: '2024-01-15T07:30:00Z'
  }
]

// Mock Dashboard Stats
export const mockDashboardStats = {
  totalPatients: 1247,
  activeEncounters: 23,
  pendingOrders: 8,
  aiAnalyses: 156,
  criticalAlerts: 3,
  todayEncounters: 12,
  weeklyGrowth: 5.2,
  monthlyGrowth: 12.8
}

// Mock Search Results
export const mockSearchResults = {
  patients: mockPatients,
  encounters: mockEncounters,
  providers: mockProviders,
  totalResults: 15
}

// Mock Chart Data
export const mockChartData = {
  patientEncounters: [
    { date: '2024-01-10', count: 45 },
    { date: '2024-01-11', count: 52 },
    { date: '2024-01-12', count: 48 },
    { date: '2024-01-13', count: 61 },
    { date: '2024-01-14', count: 58 },
    { date: '2024-01-15', count: 67 }
  ],
  aiAnalyses: [
    { date: '2024-01-10', count: 23 },
    { date: '2024-01-11', count: 28 },
    { date: '2024-01-12', count: 25 },
    { date: '2024-01-13', count: 32 },
    { date: '2024-01-14', count: 29 },
    { date: '2024-01-15', count: 35 }
  ],
  encounterTypes: [
    { type: 'Emergency', count: 156 },
    { type: 'Outpatient', count: 892 },
    { type: 'Inpatient', count: 234 },
    { type: 'Urgent Care', count: 89 },
    { type: 'Telehealth', count: 67 }
  ]
}

// Utility functions for mock data
export const getPatientById = (id: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === id)
}

export const getEncountersByPatientId = (patientId: string): Encounter[] => {
  return mockEncounters.filter(encounter => encounter.patientId === patientId)
}

export const getAIAnalysesByPatientId = (patientId: string): AIAnalysis[] => {
  return mockAIAnalyses.filter(analysis => analysis.patientId === patientId)
}

export const getUnreadNotifications = (): Notification[] => {
  return mockNotifications.filter(notification => !notification.read)
}

export const getNotificationsByType = (type: string): Notification[] => {
  return mockNotifications.filter(notification => notification.type === type)
}
