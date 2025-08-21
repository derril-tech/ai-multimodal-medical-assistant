from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_observations():
    """TODO: Implement observations listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def create_observation():
    """TODO: Implement observation creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
