from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_guidelines():
    """TODO: Implement guidelines listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.get("/{guideline_id}")
async def get_guideline(guideline_id: str):
    """TODO: Implement guideline retrieval"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/search")
async def search_guidelines():
    """TODO: Implement semantic search in guidelines"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
