from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_care_plans():
    """TODO: Implement care plans listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def create_care_plan():
    """TODO: Implement care plan creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.get("/{plan_id}/progress")
async def get_care_plan_progress(plan_id: str):
    """TODO: Implement care plan progress tracking"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
