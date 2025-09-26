from pydantic_settings import BaseSettings
from typing import List, Union
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    APP_NAME: str = "Smart Finance Suggestions API"
    APP_DESCRIPTION: str = "A comprehensive backend for financial suggestions"
    DEBUG: bool = False
    ALLOWED_ORIGINS: List[Union[AnyHttpUrl, str]] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()