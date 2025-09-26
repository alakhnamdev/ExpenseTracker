from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import settings
from api.v1.routes import router as api_router

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    debug=settings.DEBUG
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all versioned routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)