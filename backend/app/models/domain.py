"""
Domain Models for AI Medical Assistant

This module contains Pydantic models representing the core medical domain entities.
These models are used for API request/response validation, database operations, and
business logic throughout the application.
"""

from datetime import datetime, date
from typing import List, Optional, Dict, Any, Union
from enum import Enum
from pydantic import BaseModel, Field, validator, root_validator
from pydantic.types import UUID4
import uuid

# Enums
class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    UNKNOWN = "unknown"

class PatientStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    DECEASED = "deceased"
    TRANSFERRED = "transferred"

class EncounterType(str, Enum):
    EMERGENCY = "emergency"
    INPATIENT = "inpatient"
    OUTPATIENT = "outpatient"
    URGENT_CARE = "urgent_care"
    TELEHEALTH = "telehealth"

class EncounterStatus(str, Enum):
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    FINISHED = "finished"
    CANCELLED = "cancelled"

class LocationType(str, Enum):
    HOSPITAL = "hospital"
    CLINIC = "clinic"
    OFFICE = "office"
    EMERGENCY_ROOM = "emergency_room"

class DiagnosisStatus(str, Enum):
    ACTIVE = "active"
    RESOLVED = "resolved"
    CHRONIC = "chronic"

class ProcedureStatus(str, Enum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class MedicationStatus(str, Enum):
    ACTIVE = "active"
    DISCONTINUED = "discontinued"
    COMPLETED = "completed"

class NoteType(str, Enum):
    PROGRESS = "progress"
    CONSULTATION = "consultation"
    DISCHARGE = "discharge"
    OPERATIVE = "operative"
    PATHOLOGY = "pathology"

class ImagingModality(str, Enum):
    CT = "CT"
    MRI = "MRI"
    X_RAY = "X-RAY"
    ULTRASOUND = "ULTRASOUND"
    PET = "PET"
    NUCLEAR_MEDICINE = "NUCLEAR_MEDICINE"

class LabResultStatus(str, Enum):
    NORMAL = "normal"
    HIGH = "high"
    LOW = "low"
    CRITICAL = "critical"

class AnalysisType(str, Enum):
    IMAGING_ANALYSIS = "imaging_analysis"
    LAB_INTERPRETATION = "lab_interpretation"
    CLINICAL_DECISION_SUPPORT = "clinical_decision_support"
    MEDICATION_REVIEW = "medication_review"
    RISK_ASSESSMENT = "risk_assessment"
    DIAGNOSIS_SUGGESTION = "diagnosis_suggestion"
    TREATMENT_RECOMMENDATION = "treatment_recommendation"

class AnalysisStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class UserRole(str, Enum):
    ADMIN = "admin"
    CLINICIAN = "clinician"
    NURSE = "nurse"
    TRIAGE = "triage"
    READER = "reader"

# Base Models
class TimestampedModel(BaseModel):
    """Base model with created/updated timestamps"""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @validator('updated_at', pre=True, always=True)
    def set_updated_at(cls, v):
        return datetime.utcnow()

class Address(BaseModel):
    """Address information"""
    street: str = Field(..., min_length=1, max_length=255)
    city: str = Field(..., min_length=1, max_length=100)
    state: str = Field(..., min_length=2, max_length=2)
    zip_code: str = Field(..., min_length=5, max_length=10)
    country: str = Field(default="US", max_length=100)

class ContactInfo(BaseModel):
    """Contact information"""
    phone: str = Field(..., min_length=10, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    relationship: Optional[str] = Field(None, max_length=100)

class InsuranceInfo(BaseModel):
    """Insurance information"""
    provider: str = Field(..., max_length=255)
    policy_number: str = Field(..., max_length=100)
    group_number: Optional[str] = Field(None, max_length=100)
    effective_date: date
    expiration_date: Optional[date] = None

class Provider(BaseModel):
    """Healthcare provider information"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    npi: str = Field(..., min_length=10, max_length=10)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    specialty: str = Field(..., max_length=255)
    credentials: str = Field(..., max_length=50)
    organization: str = Field(..., max_length=255)

class Location(BaseModel):
    """Healthcare facility location"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    name: str = Field(..., max_length=255)
    type: LocationType
    address: Address

# Core Domain Models
class Patient(BaseModel, TimestampedModel):
    """Patient information"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    mrn: str = Field(..., min_length=1, max_length=50, description="Medical Record Number")
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    date_of_birth: date
    gender: Gender
    ethnicity: Optional[str] = Field(None, max_length=100)
    race: Optional[str] = Field(None, max_length=100)
    address: Address
    contact: ContactInfo
    emergency_contact: Optional[ContactInfo] = None
    insurance: Optional[InsuranceInfo] = None
    status: PatientStatus = PatientStatus.ACTIVE

    @validator('mrn')
    def validate_mrn(cls, v):
        if not v.strip():
            raise ValueError('MRN cannot be empty')
        return v.upper()

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @property
    def age(self) -> int:
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )

class Diagnosis(BaseModel):
    """Medical diagnosis"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    code: str = Field(..., max_length=20)
    system: str = Field(..., description="Coding system (ICD-10-CM, SNOMED-CT)")
    display: str = Field(..., max_length=500)
    severity: Optional[str] = Field(None, max_length=20)
    onset_date: Optional[date] = None
    status: DiagnosisStatus = DiagnosisStatus.ACTIVE

class Procedure(BaseModel):
    """Medical procedure"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    code: str = Field(..., max_length=20)
    system: str = Field(..., description="Coding system (CPT, SNOMED-CT)")
    display: str = Field(..., max_length=500)
    performed_date: datetime
    performer: Provider
    status: ProcedureStatus = ProcedureStatus.SCHEDULED

class DrugInteraction(BaseModel):
    """Drug interaction information"""
    severity: str = Field(..., max_length=20)
    description: str = Field(..., max_length=1000)
    interacting_drug: str = Field(..., max_length=255)
    recommendation: str = Field(..., max_length=1000)

class Medication(BaseModel):
    """Medication information"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    name: str = Field(..., max_length=255)
    rxnorm_code: Optional[str] = Field(None, max_length=20)
    dosage: str = Field(..., max_length=100)
    frequency: str = Field(..., max_length=100)
    route: str = Field(..., max_length=50)
    start_date: date
    end_date: Optional[date] = None
    status: MedicationStatus = MedicationStatus.ACTIVE
    prescribed_by: Provider
    instructions: Optional[str] = Field(None, max_length=1000)
    allergies: Optional[List[str]] = Field(default_factory=list)
    interactions: Optional[List[DrugInteraction]] = Field(default_factory=list)

class Attachment(BaseModel):
    """File attachment"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    filename: str = Field(..., max_length=255)
    content_type: str = Field(..., max_length=100)
    size: int = Field(..., gt=0)
    url: str = Field(..., max_length=500)
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class ClinicalNote(BaseModel, TimestampedModel):
    """Clinical note"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    encounter_id: UUID4
    author: Provider
    note_type: NoteType
    content: str = Field(..., min_length=1)
    attachments: Optional[List[Attachment]] = Field(default_factory=list)
    tags: Optional[List[str]] = Field(default_factory=list)

class VitalSigns(BaseModel):
    """Vital signs measurements"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    encounter_id: UUID4
    recorded_at: datetime = Field(default_factory=datetime.utcnow)
    recorded_by: Provider
    temperature: Optional[float] = Field(None, ge=30, le=45)
    heart_rate: Optional[int] = Field(None, ge=0, le=300)
    blood_pressure_systolic: Optional[int] = Field(None, ge=0, le=300)
    blood_pressure_diastolic: Optional[int] = Field(None, ge=0, le=200)
    respiratory_rate: Optional[int] = Field(None, ge=0, le=100)
    oxygen_saturation: Optional[float] = Field(None, ge=0, le=100)
    height: Optional[float] = Field(None, ge=0, le=300)
    weight: Optional[float] = Field(None, ge=0, le=1000)
    bmi: Optional[float] = Field(None, ge=0, le=100)
    pain_scale: Optional[int] = Field(None, ge=0, le=10)

    @property
    def blood_pressure(self) -> Optional[str]:
        if self.blood_pressure_systolic and self.blood_pressure_diastolic:
            return f"{self.blood_pressure_systolic}/{self.blood_pressure_diastolic}"
        return None

class LabResult(BaseModel):
    """Laboratory test result"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    encounter_id: UUID4
    test_name: str = Field(..., max_length=255)
    loinc_code: Optional[str] = Field(None, max_length=20)
    value: str = Field(..., max_length=100)
    unit: Optional[str] = Field(None, max_length=50)
    reference_range_low: Optional[float] = None
    reference_range_high: Optional[float] = None
    status: LabResultStatus = LabResultStatus.NORMAL
    performed_at: datetime
    reported_at: datetime = Field(default_factory=datetime.utcnow)
    ordering_provider: Provider
    performing_lab: str = Field(..., max_length=255)

    @property
    def reference_range(self) -> Optional[str]:
        if self.reference_range_low and self.reference_range_high:
            return f"{self.reference_range_low}-{self.reference_range_high}"
        return None

class DICOMMetadata(BaseModel):
    """DICOM image metadata"""
    patient_name: str = Field(..., max_length=255)
    study_date: str = Field(..., max_length=20)
    modality: str = Field(..., max_length=20)
    body_part: str = Field(..., max_length=100)
    image_comments: Optional[str] = Field(None, max_length=500)

class DICOMImage(BaseModel):
    """DICOM image"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    series_number: int = Field(..., ge=0)
    image_number: int = Field(..., ge=0)
    url: str = Field(..., max_length=500)
    thumbnail_url: str = Field(..., max_length=500)
    metadata: DICOMMetadata

class ImagingStudy(BaseModel, TimestampedModel):
    """Medical imaging study"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    encounter_id: UUID4
    modality: ImagingModality
    body_site: str = Field(..., max_length=100)
    study_date: datetime
    status: ProcedureStatus = ProcedureStatus.SCHEDULED
    radiologist: Optional[Provider] = None
    findings: Optional[str] = Field(None, max_length=5000)
    impression: Optional[str] = Field(None, max_length=5000)
    images: List[DICOMImage] = Field(default_factory=list)
    report_url: Optional[str] = Field(None, max_length=500)

class Encounter(BaseModel, TimestampedModel):
    """Patient encounter"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    patient_id: UUID4
    encounter_type: EncounterType
    status: EncounterStatus = EncounterStatus.PLANNED
    start_date: datetime
    end_date: Optional[datetime] = None
    provider: Provider
    location: Location
    reason: str = Field(..., max_length=1000)
    diagnosis: Optional[List[Diagnosis]] = Field(default_factory=list)
    procedures: Optional[List[Procedure]] = Field(default_factory=list)
    medications: Optional[List[Medication]] = Field(default_factory=list)
    notes: Optional[List[ClinicalNote]] = Field(default_factory=list)
    vitals: Optional[List[VitalSigns]] = Field(default_factory=list)
    lab_results: Optional[List[LabResult]] = Field(default_factory=list)
    imaging: Optional[List[ImagingStudy]] = Field(default_factory=list)

# AI Analysis Models
class Source(BaseModel):
    """Evidence source for AI analysis"""
    type: str = Field(..., max_length=50)
    title: str = Field(..., max_length=500)
    url: Optional[str] = Field(None, max_length=500)
    citation: str = Field(..., max_length=1000)
    relevance: float = Field(..., ge=0, le=1)

class Finding(BaseModel):
    """AI analysis finding"""
    type: str = Field(..., max_length=100)
    description: str = Field(..., max_length=1000)
    severity: str = Field(..., max_length=20)
    confidence: float = Field(..., ge=0, le=1)
    location: Optional[str] = Field(None, max_length=100)
    measurements: Optional[Dict[str, float]] = None

class Recommendation(BaseModel):
    """AI-generated recommendation"""
    type: str = Field(..., max_length=50)
    description: str = Field(..., max_length=1000)
    priority: str = Field(..., max_length=20)
    rationale: str = Field(..., max_length=1000)
    evidence: List[Source] = Field(default_factory=list)

class AIAnalysisResult(BaseModel):
    """AI analysis results"""
    summary: str = Field(..., max_length=2000)
    findings: List[Finding] = Field(default_factory=list)
    recommendations: List[Recommendation] = Field(default_factory=list)
    confidence: float = Field(..., ge=0, le=1)
    sources: List[Source] = Field(default_factory=list)
    warnings: Optional[List[str]] = Field(default_factory=list)

class AIAnalysis(BaseModel, TimestampedModel):
    """AI analysis record"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    patient_id: UUID4
    encounter_id: Optional[UUID4] = None
    analysis_type: AnalysisType
    input_data: Dict[str, Any] = Field(default_factory=dict)
    results: AIAnalysisResult
    confidence: float = Field(..., ge=0, le=1)
    model: str = Field(..., max_length=100)
    model_version: str = Field(..., max_length=50)
    processing_time: float = Field(..., ge=0)
    status: AnalysisStatus = AnalysisStatus.PENDING

# Real-time Communication Models
class ChatMessage(BaseModel):
    """Chat message"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    sender_id: UUID4
    sender_type: str = Field(..., max_length=20)
    content: str = Field(..., min_length=1)
    message_type: str = Field(default="text", max_length=20)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    attachments: Optional[List[Attachment]] = Field(default_factory=list)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)

class SharedResource(BaseModel):
    """Shared resource in consultation"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    type: str = Field(..., max_length=20)
    title: str = Field(..., max_length=255)
    url: str = Field(..., max_length=500)
    shared_by: Provider
    shared_at: datetime = Field(default_factory=datetime.utcnow)

class Consultation(BaseModel, TimestampedModel):
    """Real-time consultation"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    patient_id: UUID4
    participants: List[Provider] = Field(default_factory=list)
    status: str = Field(default="scheduled", max_length=20)
    start_time: datetime
    end_time: Optional[datetime] = None
    messages: List[ChatMessage] = Field(default_factory=list)
    shared_resources: List[SharedResource] = Field(default_factory=list)

# User and Authentication Models
class User(BaseModel, TimestampedModel):
    """System user"""
    id: UUID4 = Field(default_factory=uuid.uuid4)
    email: str = Field(..., max_length=255)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    role: UserRole
    permissions: List[str] = Field(default_factory=list)
    organization: str = Field(..., max_length=255)
    last_login: Optional[datetime] = None
    is_active: bool = True

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

# API Response Models
class PaginationInfo(BaseModel):
    """Pagination information"""
    page: int = Field(..., ge=1)
    limit: int = Field(..., ge=1, le=100)
    total: int = Field(..., ge=0)
    total_pages: int = Field(..., ge=0)

class PaginatedResponse(BaseModel):
    """Paginated API response"""
    items: List[Any]
    pagination: PaginationInfo

class ApiResponse(BaseModel):
    """Standard API response"""
    data: Any
    message: Optional[str] = None
    errors: Optional[List[str]] = Field(default_factory=list)
    meta: Optional[Dict[str, Any]] = None

class ApiError(BaseModel):
    """API error response"""
    code: str = Field(..., max_length=50)
    message: str = Field(..., max_length=500)
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# Search and Filter Models
class SearchFilters(BaseModel):
    """Search and filter options"""
    query: Optional[str] = None
    status: Optional[List[str]] = Field(default_factory=list)
    date_range_start: Optional[date] = None
    date_range_end: Optional[date] = None
    provider_id: Optional[UUID4] = None
    location_id: Optional[UUID4] = None
    encounter_type: Optional[List[str]] = Field(default_factory=list)

class SortOptions(BaseModel):
    """Sorting options"""
    field: str = Field(..., max_length=50)
    direction: str = Field(..., regex="^(asc|desc)$")

# Form Models
class PatientCreate(BaseModel):
    """Patient creation form"""
    mrn: str = Field(..., min_length=1, max_length=50)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    date_of_birth: date
    gender: Gender
    ethnicity: Optional[str] = None
    race: Optional[str] = None
    address: Address
    contact: ContactInfo
    emergency_contact: Optional[ContactInfo] = None
    insurance: Optional[InsuranceInfo] = None

class PatientUpdate(BaseModel):
    """Patient update form"""
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    ethnicity: Optional[str] = None
    race: Optional[str] = None
    address: Optional[Address] = None
    contact: Optional[ContactInfo] = None
    emergency_contact: Optional[ContactInfo] = None
    insurance: Optional[InsuranceInfo] = None
    status: Optional[PatientStatus] = None

class EncounterCreate(BaseModel):
    """Encounter creation form"""
    patient_id: UUID4
    encounter_type: EncounterType
    reason: str = Field(..., max_length=1000)
    provider_id: UUID4
    location_id: UUID4
    start_date: datetime

class EncounterUpdate(BaseModel):
    """Encounter update form"""
    encounter_type: Optional[EncounterType] = None
    status: Optional[EncounterStatus] = None
    reason: Optional[str] = Field(None, max_length=1000)
    end_date: Optional[datetime] = None
