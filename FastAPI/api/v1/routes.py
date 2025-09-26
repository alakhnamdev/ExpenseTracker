from fastapi import APIRouter
from api.v1.endpoints import suggestions

router = APIRouter()

router.include_router(suggestions.router, prefix="/api/v1", tags=["Suggestions"])