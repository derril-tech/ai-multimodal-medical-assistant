from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_documents():
    """TODO: Implement document listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/upload")
async def upload_document():
    """TODO: Implement document upload"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
