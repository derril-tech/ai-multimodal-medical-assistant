from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_tasks():
    """TODO: Implement tasks listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/")
async def create_task():
    """TODO: Implement task creation"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.put("/{task_id}/complete")
async def complete_task(task_id: str):
    """TODO: Implement task completion"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
