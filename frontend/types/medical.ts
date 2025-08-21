// Core Medical Domain Types
export interface Patient {
  id: string
  mrn: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'unknown'
  ethnicity?: string
  race?: string
  address: Address
  contact: ContactInfo
  emergencyContact?: ContactInfo
  insurance?: InsuranceInfo
  status: PatientStatus
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface ContactInfo {
  phone: string
  email?: string
  relationship?: string
}

export interface InsuranceInfo {
  provider: string
  policyNumber: string
  groupNumber?: string
  effectiveDate: string
  expirationDate?: string
}

export type PatientStatus = 'active' | 'inactive' | 'deceased' | 'transferred'

export interface Encounter {
  id: string
  patientId: string
  encounterType: EncounterType
  status: EncounterStatus
  startDate: string
  endDate?: string
  provider: Provider
  location: Location
  reason: string
  diagnosis?: Diagnosis[]
  procedures?: Procedure[]
  medications?: Medication[]
  notes?: ClinicalNote[]
  vitals?: VitalSigns[]
  labResults?: LabResult[]
  imaging?: ImagingStudy[]
  createdAt: string
  updatedAt: string
}

export type EncounterType = 'emergency' | 'inpatient' | 'outpatient' | 'urgent_care' | 'telehealth'
export type EncounterStatus = 'planned' | 'in_progress' | 'finished' | 'cancelled'

export interface Provider {
  id: string
  npi: string
  firstName: string
  lastName: string
  specialty: string
  credentials: string
  organization: string
}

export interface Location {
  id: string
  name: string
  type: 'hospital' | 'clinic' | 'office' | 'emergency_room'
  address: Address
}

export interface Diagnosis {
  id: string
  code: string
  system: 'ICD-10-CM' | 'SNOMED-CT'
  display: string
  severity?: 'mild' | 'moderate' | 'severe'
  onsetDate?: string
  status: 'active' | 'resolved' | 'chronic'
}

export interface Procedure {
  id: string
  code: string
  system: 'CPT' | 'SNOMED-CT'
  display: string
  performedDate: string
  performer: Provider
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
}

export interface Medication {
  id: string
  name: string
  rxnormCode?: string
  dosage: string
  frequency: string
  route: string
  startDate: string
  endDate?: string
  status: 'active' | 'discontinued' | 'completed'
  prescribedBy: Provider
  instructions?: string
  allergies?: string[]
  interactions?: DrugInteraction[]
}

export interface DrugInteraction {
  severity: 'high' | 'moderate' | 'low'
  description: string
  interactingDrug: string
  recommendation: string
}

export interface ClinicalNote {
  id: string
  encounterId: string
  author: Provider
  noteType: 'progress' | 'consultation' | 'discharge' | 'operative' | 'pathology'
  content: string
  attachments?: Attachment[]
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: string
  filename: string
  contentType: string
  size: number
  url: string
  uploadedAt: string
}

export interface VitalSigns {
  id: string
  encounterId: string
  recordedAt: string
  recordedBy: Provider
  temperature?: number
  heartRate?: number
  bloodPressure?: {
    systolic: number
    diastolic: number
  }
  respiratoryRate?: number
  oxygenSaturation?: number
  height?: number
  weight?: number
  bmi?: number
  painScale?: number
}

export interface LabResult {
  id: string
  encounterId: string
  testName: string
  loincCode?: string
  value: string
  unit?: string
  referenceRange?: {
    low: number
    high: number
  }
  status: 'normal' | 'high' | 'low' | 'critical'
  performedAt: string
  reportedAt: string
  orderingProvider: Provider
  performingLab: string
}

export interface ImagingStudy {
  id: string
  encounterId: string
  modality: 'CT' | 'MRI' | 'X-RAY' | 'ULTRASOUND' | 'PET' | 'NUCLEAR_MEDICINE'
  bodySite: string
  studyDate: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  radiologist?: Provider
  findings?: string
  impression?: string
  images: DICOMImage[]
  reportUrl?: string
}

export interface DICOMImage {
  id: string
  seriesNumber: number
  imageNumber: number
  url: string
  thumbnailUrl: string
  metadata: DICOMMetadata
}

export interface DICOMMetadata {
  patientName: string
  studyDate: string
  modality: string
  bodyPart: string
  imageComments?: string
}

// AI Analysis Types
export interface AIAnalysis {
  id: string
  patientId: string
  encounterId?: string
  analysisType: AnalysisType
  inputData: any
  results: AIAnalysisResult
  confidence: number
  model: string
  modelVersion: string
  processingTime: number
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

export type AnalysisType = 
  | 'imaging_analysis'
  | 'lab_interpretation'
  | 'clinical_decision_support'
  | 'medication_review'
  | 'risk_assessment'
  | 'diagnosis_suggestion'
  | 'treatment_recommendation'

export interface AIAnalysisResult {
  summary: string
  findings: Finding[]
  recommendations: Recommendation[]
  confidence: number
  sources: Source[]
  warnings?: string[]
}

export interface Finding {
  type: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  location?: string
  measurements?: Record<string, number>
}

export interface Recommendation {
  type: 'medication' | 'procedure' | 'test' | 'consultation' | 'monitoring'
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  rationale: string
  evidence: Source[]
}

export interface Source {
  type: 'guideline' | 'study' | 'textbook' | 'protocol'
  title: string
  url?: string
  citation: string
  relevance: number
}

// Real-time Communication Types
export interface ChatMessage {
  id: string
  senderId: string
  senderType: 'provider' | 'ai' | 'system'
  content: string
  messageType: 'text' | 'image' | 'file' | 'analysis'
  timestamp: string
  attachments?: Attachment[]
  metadata?: Record<string, any>
}

export interface Consultation {
  id: string
  patientId: string
  participants: Provider[]
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  startTime: string
  endTime?: string
  messages: ChatMessage[]
  sharedResources: SharedResource[]
}

export interface SharedResource {
  id: string
  type: 'image' | 'document' | 'analysis' | 'note'
  title: string
  url: string
  sharedBy: Provider
  sharedAt: string
}

// UI State Types
export interface UIState {
  selectedPatient?: Patient
  selectedEncounter?: Encounter
  activeConsultation?: Consultation
  sidebarCollapsed: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  action?: {
    label: string
    url: string
  }
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  errors?: string[]
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface PatientFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  address: Address
  contact: ContactInfo
}

export interface EncounterFormData {
  encounterType: string
  reason: string
  providerId: string
  locationId: string
  startDate: string
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  status?: string[]
  dateRange?: {
    start: string
    end: string
  }
  providerId?: string
  locationId?: string
  encounterType?: string[]
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

// Error Types
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  permissions: Permission[]
  organization: string
  lastLogin?: string
}

export type UserRole = 'admin' | 'clinician' | 'nurse' | 'triage' | 'reader'
export type Permission = 
  | 'read_patients'
  | 'write_patients'
  | 'read_encounters'
  | 'write_encounters'
  | 'ai_analysis'
  | 'admin_users'
  | 'view_audit_logs'

export interface AuthState {
  user?: User
  token?: string
  isAuthenticated: boolean
  isLoading: boolean
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data?: T
  loading: boolean
  error?: string
}

export type StatusIndicator = 'success' | 'warning' | 'error' | 'info' | 'neutral'
