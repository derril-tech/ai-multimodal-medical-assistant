from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_encounters():
    """TODO: Implement encounter listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.get("/{encounter_id}")
async def get_encounter(encounter_id: str):
    """TODO: Implement encounter retrieval"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def create_encounter():
    """TODO: Implement encounter creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
