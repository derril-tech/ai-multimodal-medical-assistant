"""
Mock Data and Fixtures for AI Medical Assistant Backend

This module contains essential mock data for development, testing, and demonstration.
"""

import uuid
from datetime import datetime, date
from typing import List, Dict, Any
from app.models.domain import Patient, Provider, Location, Encounter

# Mock Providers
MOCK_PROVIDERS = [
    Provider(
        id=uuid.uuid4(),
        npi="1234567890",
        first_name="Dr. Sarah",
        last_name="Johnson",
        specialty="Internal Medicine",
        credentials="MD",
        organization="City General Hospital"
    ),
    Provider(
        id=uuid.uuid4(),
        npi="0987654321",
        first_name="Dr. Michael",
        last_name="Chen",
        specialty="Cardiology",
        credentials="MD, FACC",
        organization="City General Hospital"
    )
]

# Mock Locations
MOCK_LOCATIONS = [
    Location(
        id=uuid.uuid4(),
        name="Emergency Department",
        type="emergency_room",
        address={
            "street": "123 Main St",
            "city": "Springfield",
            "state": "IL",
            "zip_code": "62701",
            "country": "US"
        }
    ),
    Location(
        id=uuid.uuid4(),
        name="Cardiology Clinic",
        type="clinic",
        address={
            "street": "456 Oak Ave",
            "city": "Springfield",
            "state": "IL",
            "zip_code": "62701",
            "country": "US"
        }
    )
]

# Mock Patients
MOCK_PATIENTS = [
    Patient(
        id=uuid.uuid4(),
        mrn="MRN-2024-001",
        first_name="Sarah",
        last_name="Johnson",
        date_of_birth=date(1990, 3, 15),
        gender="female",
        ethnicity="Caucasian",
        race="White",
        address={
            "street": "789 Pine St",
            "city": "Springfield",
            "state": "IL",
            "zip_code": "62701",
            "country": "US"
        },
        contact={
            "phone": "217-555-0101",
            "email": "sarah.johnson@email.com"
        },
        status="active"
    ),
    Patient(
        id=uuid.uuid4(),
        mrn="MRN-2024-002",
        first_name="Michael",
        last_name="Chen",
        date_of_birth=date(1957, 8, 22),
        gender="male",
        ethnicity="Asian",
        race="Asian",
        address={
            "street": "456 Elm St",
            "city": "Springfield",
            "state": "IL",
            "zip_code": "62701",
            "country": "US"
        },
        contact={
            "phone": "217-555-0201",
            "email": "michael.chen@email.com"
        },
        status="active"
    )
]

# Mock Dashboard Stats
MOCK_DASHBOARD_STATS = {
    "total_patients": 1247,
    "active_encounters": 23,
    "pending_orders": 8,
    "ai_analyses": 156,
    "critical_alerts": 3
}

# Utility functions
def get_patient_by_mrn(mrn: str) -> Patient | None:
    """Get patient by MRN"""
    for patient in MOCK_PATIENTS:
        if patient.mrn == mrn:
            return patient
    return None

def create_mock_api_response(data: Any, message: str = None) -> Dict[str, Any]:
    """Create a standardized API response"""
    response = {"data": data}
    if message:
        response["message"] = message
    return response
