from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_notes():
    """TODO: Implement notes listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def create_note():
    """TODO: Implement note creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/dictation")
async def create_note_from_dictation():
    """TODO: Implement speech-to-text note creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
