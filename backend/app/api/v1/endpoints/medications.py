from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_medications():
    """TODO: Implement medications listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def prescribe_medication():
    """TODO: Implement medication prescription"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
