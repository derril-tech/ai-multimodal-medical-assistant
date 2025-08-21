from fastapi import APIRouter, HTTPException, status

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint():
    """TODO: Implement WebSocket for real-time communication"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
