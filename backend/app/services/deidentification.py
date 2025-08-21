"""
De-identification and Privacy Service
Handles PHI redaction, consent management, and tokenization
"""

from typing import Dict, List, Optional, Any, Union
import re
import hashlib
import json
import uuid
from datetime import datetime, timedelta
from enum import Enum

class PHIType(str, Enum):
    NAME = "name"
    DATE = "date"
    PHONE = "phone"
    EMAIL = "email"
    ADDRESS = "address"
    SSN = "ssn"
    MRN = "mrn"
    ACCOUNT = "account"
    DEVICE = "device"
    IP_ADDRESS = "ip_address"
    BIOMETRIC = "biometric"
    PHOTO = "photo"
    OTHER = "other"

class ConsentStatus(str, Enum):
    GRANTED = "granted"
    DENIED = "denied"
    PENDING = "pending"
    EXPIRED = "expired"
    WITHDRAWN = "withdrawn"

class DeidentificationService:
    """Service for PHI de-identification and privacy management"""
    
    def __init__(self):
        self.token_map: Dict[str, str] = {}
        self.reverse_token_map: Dict[str, str] = {}
        self.consent_registry: Dict[str, Dict[str, Any]] = {}
        self.audit_log: List[Dict[str, Any]] = []
        
    def redact_phi(
        self, 
        text: str, 
        phi_types: Optional[List[PHIType]] = None,
        replacement: str = "[REDACTED]"
    ) -> Dict[str, Any]:
        """
        Redact PHI from text content
        
        Args:
            text: Text content to redact
            phi_types: Types of PHI to redact (all if None)
            replacement: Replacement text for redacted content
            
        Returns:
            Dictionary with redacted text and audit information
        """
        if phi_types is None:
            phi_types = list(PHIType)
        
        original_text = text
        redacted_text = text
        redactions = []
        
        # Patterns for different PHI types
        patterns = {
            PHIType.NAME: [
                r'\b[A-Z][a-z]+ [A-Z][a-z]+\b',  # First Last
                r'\bDr\. [A-Z][a-z]+ [A-Z][a-z]+\b',  # Dr. First Last
            ],
            PHIType.DATE: [
                r'\b\d{1,2}/\d{1,2}/\d{4}\b',  # MM/DD/YYYY
                r'\b\d{4}-\d{2}-\d{2}\b',  # YYYY-MM-DD
                r'\b\d{1,2}-\d{1,2}-\d{4}\b',  # MM-DD-YYYY
            ],
            PHIType.PHONE: [
                r'\b\d{3}-\d{3}-\d{4}\b',  # XXX-XXX-XXXX
                r'\b\(\d{3}\) \d{3}-\d{4}\b',  # (XXX) XXX-XXXX
                r'\b\d{10}\b',  # XXXXXXXXXX
            ],
            PHIType.EMAIL: [
                r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            ],
            PHIType.SSN: [
                r'\b\d{3}-\d{2}-\d{4}\b',  # XXX-XX-XXXX
                r'\b\d{9}\b',  # XXXXXXXXX
            ],
            PHIType.MRN: [
                r'\bMRN-\d{4}-\d{3}\b',  # MRN-YYYY-XXX
                r'\b\d{8,10}\b',  # 8-10 digit numbers
            ],
            PHIType.ADDRESS: [
                r'\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b',
            ],
        }
        
        for phi_type in phi_types:
            if phi_type in patterns:
                for pattern in patterns[phi_type]:
                    matches = re.finditer(pattern, redacted_text, re.IGNORECASE)
                    for match in matches:
                        original_value = match.group()
                        redacted_text = redacted_text.replace(original_value, replacement)
                        redactions.append({
                            "type": phi_type.value,
                            "original": original_value,
                            "replacement": replacement,
                            "position": match.span(),
                            "timestamp": datetime.now().isoformat()
                        })
        
        # Log the redaction
        self._log_redaction(original_text, redacted_text, redactions)
        
        return {
            "original_text": original_text,
            "redacted_text": redacted_text,
            "redactions": redactions,
            "timestamp": datetime.now().isoformat()
        }
    
    def tokenize_phi(
        self, 
        phi_value: str, 
        phi_type: PHIType,
        patient_id: Optional[str] = None
    ) -> str:
        """
        Create a reversible token for PHI
        
        Args:
            phi_value: Original PHI value
            phi_type: Type of PHI
            patient_id: Optional patient identifier for linking
            
        Returns:
            Token string
        """
        # Create a unique token
        token = f"PHI_{phi_type.value.upper()}_{uuid.uuid4().hex[:8]}"
        
        # Store the mapping
        self.token_map[token] = phi_value
        self.reverse_token_map[phi_value] = token
        
        # Log the tokenization
        self._log_tokenization(phi_value, token, phi_type, patient_id)
        
        return token
    
    def detokenize_phi(self, token: str) -> Optional[str]:
        """
        Reverse tokenization to get original PHI
        
        Args:
            token: Token to reverse
            
        Returns:
            Original PHI value or None if not found
        """
        return self.token_map.get(token)
    
    def register_consent(
        self,
        patient_id: str,
        consent_type: str,
        granted: bool,
        scope: List[str],
        expires_at: Optional[datetime] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Register patient consent for data processing
        
        Args:
            patient_id: Patient identifier
            consent_type: Type of consent (e.g., "data_processing", "research")
            granted: Whether consent was granted
            scope: List of data types covered by consent
            expires_at: When consent expires
            metadata: Additional consent metadata
            
        Returns:
            Consent ID
        """
        consent_id = f"CONSENT_{uuid.uuid4().hex[:8]}"
        
        consent_record = {
            "consent_id": consent_id,
            "patient_id": patient_id,
            "consent_type": consent_type,
            "status": ConsentStatus.GRANTED if granted else ConsentStatus.DENIED,
            "scope": scope,
            "granted_at": datetime.now().isoformat(),
            "expires_at": expires_at.isoformat() if expires_at else None,
            "metadata": metadata or {},
            "version": "1.0"
        }
        
        self.consent_registry[consent_id] = consent_record
        
        # Log consent registration
        self._log_consent_registration(consent_record)
        
        return consent_id
    
    def check_consent(
        self,
        patient_id: str,
        consent_type: str,
        data_types: List[str]
    ) -> Dict[str, Any]:
        """
        Check if patient has valid consent for data processing
        
        Args:
            patient_id: Patient identifier
            consent_type: Type of consent to check
            data_types: Data types being processed
            
        Returns:
            Consent check result
        """
        # Find active consents for this patient
        active_consents = []
        
        for consent_id, consent in self.consent_registry.items():
            if (consent["patient_id"] == patient_id and 
                consent["consent_type"] == consent_type and
                consent["status"] == ConsentStatus.GRANTED):
                
                # Check if consent has expired
                if consent["expires_at"]:
                    expires_at = datetime.fromisoformat(consent["expires_at"])
                    if datetime.now() > expires_at:
                        consent["status"] = ConsentStatus.EXPIRED
                        continue
                
                active_consents.append(consent)
        
        # Check if all data types are covered
        covered_types = set()
        for consent in active_consents:
            covered_types.update(consent["scope"])
        
        missing_types = set(data_types) - covered_types
        has_consent = len(missing_types) == 0
        
        result = {
            "has_consent": has_consent,
            "consent_ids": [c["consent_id"] for c in active_consents],
            "covered_types": list(covered_types),
            "missing_types": list(missing_types),
            "timestamp": datetime.now().isoformat()
        }
        
        # Log consent check
        self._log_consent_check(patient_id, consent_type, data_types, result)
        
        return result
    
    def withdraw_consent(self, consent_id: str) -> bool:
        """
        Withdraw a previously granted consent
        
        Args:
            consent_id: Consent identifier
            
        Returns:
            True if consent was withdrawn, False if not found
        """
        if consent_id in self.consent_registry:
            self.consent_registry[consent_id]["status"] = ConsentStatus.WITHDRAWN
            self.consent_registry[consent_id]["withdrawn_at"] = datetime.now().isoformat()
            
            # Log consent withdrawal
            self._log_consent_withdrawal(consent_id)
            
            return True
        
        return False
    
    def get_audit_log(
        self,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        event_type: Optional[str] = None,
        patient_id: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Get audit log entries with optional filtering
        
        Args:
            start_date: Start date for filtering
            end_date: End date for filtering
            event_type: Type of event to filter
            patient_id: Patient ID to filter
            
        Returns:
            List of audit log entries
        """
        filtered_log = self.audit_log
        
        if start_date:
            filtered_log = [
                entry for entry in filtered_log
                if datetime.fromisoformat(entry["timestamp"]) >= start_date
            ]
        
        if end_date:
            filtered_log = [
                entry for entry in filtered_log
                if datetime.fromisoformat(entry["timestamp"]) <= end_date
            ]
        
        if event_type:
            filtered_log = [
                entry for entry in filtered_log
                if entry["event_type"] == event_type
            ]
        
        if patient_id:
            filtered_log = [
                entry for entry in filtered_log
                if entry.get("patient_id") == patient_id
            ]
        
        return filtered_log
    
    def export_audit_bundle(
        self,
        start_date: datetime,
        end_date: datetime,
        format: str = "json"
    ) -> Union[str, bytes]:
        """
        Export audit log as a compliance bundle
        
        Args:
            start_date: Start date for export
            end_date: End date for export
            format: Export format ("json" or "csv")
            
        Returns:
            Exported audit data
        """
        audit_entries = self.get_audit_log(start_date, end_date)
        
        bundle = {
            "export_info": {
                "exported_at": datetime.now().isoformat(),
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat(),
                "format": format,
                "entry_count": len(audit_entries)
            },
            "audit_entries": audit_entries
        }
        
        if format.lower() == "json":
            return json.dumps(bundle, indent=2)
        elif format.lower() == "csv":
            # TODO: Implement CSV export
            return json.dumps(bundle, indent=2)  # Fallback to JSON
        else:
            raise ValueError(f"Unsupported format: {format}")
    
    def _log_redaction(
        self,
        original_text: str,
        redacted_text: str,
        redactions: List[Dict[str, Any]]
    ) -> None:
        """Log redaction activity"""
        self.audit_log.append({
            "event_type": "phi_redaction",
            "timestamp": datetime.now().isoformat(),
            "original_length": len(original_text),
            "redacted_length": len(redacted_text),
            "redaction_count": len(redactions),
            "redaction_types": list(set(r["type"] for r in redactions))
        })
    
    def _log_tokenization(
        self,
        phi_value: str,
        token: str,
        phi_type: PHIType,
        patient_id: Optional[str]
    ) -> None:
        """Log tokenization activity"""
        self.audit_log.append({
            "event_type": "phi_tokenization",
            "timestamp": datetime.now().isoformat(),
            "phi_type": phi_type.value,
            "token": token,
            "patient_id": patient_id,
            "value_length": len(phi_value)
        })
    
    def _log_consent_registration(self, consent_record: Dict[str, Any]) -> None:
        """Log consent registration"""
        self.audit_log.append({
            "event_type": "consent_registration",
            "timestamp": datetime.now().isoformat(),
            "consent_id": consent_record["consent_id"],
            "patient_id": consent_record["patient_id"],
            "consent_type": consent_record["consent_type"],
            "status": consent_record["status"]
        })
    
    def _log_consent_check(
        self,
        patient_id: str,
        consent_type: str,
        data_types: List[str],
        result: Dict[str, Any]
    ) -> None:
        """Log consent check"""
        self.audit_log.append({
            "event_type": "consent_check",
            "timestamp": datetime.now().isoformat(),
            "patient_id": patient_id,
            "consent_type": consent_type,
            "data_types": data_types,
            "has_consent": result["has_consent"],
            "missing_types": result["missing_types"]
        })
    
    def _log_consent_withdrawal(self, consent_id: str) -> None:
        """Log consent withdrawal"""
        self.audit_log.append({
            "event_type": "consent_withdrawal",
            "timestamp": datetime.now().isoformat(),
            "consent_id": consent_id
        })

# Global instance
deidentification_service = DeidentificationService()
