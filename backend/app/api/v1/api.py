from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    patients,
    encounters,
    documents,
    observations,
    medications,
    imaging,
    waveforms,
    notes,
    tasks,
    orders,
    care_plans,
    consent,
    audit,
    admin,
    guidelines,
    ai_analysis,
    realtime
)

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(patients.router, prefix="/patients", tags=["patients"])
api_router.include_router(encounters.router, prefix="/encounters", tags=["encounters"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(observations.router, prefix="/observations", tags=["observations"])
api_router.include_router(medications.router, prefix="/medications", tags=["medications"])
api_router.include_router(imaging.router, prefix="/imaging", tags=["imaging"])
api_router.include_router(waveforms.router, prefix="/waveforms", tags=["waveforms"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(care_plans.router, prefix="/care-plans", tags=["care-plans"])
api_router.include_router(consent.router, prefix="/consent", tags=["consent"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(guidelines.router, prefix="/guidelines", tags=["guidelines"])
api_router.include_router(ai_analysis.router, prefix="/ai", tags=["ai-analysis"])
api_router.include_router(realtime.router, prefix="/realtime", tags=["realtime"])
