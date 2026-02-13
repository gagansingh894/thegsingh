from dataclasses import dataclass

from fastapi import APIRouter

from services.resume import ResumeService

@dataclass
class ResumeAPIConfig:
    resume_service: ResumeService

class ResumeAPI:
    def __init__(self, config: ResumeAPIConfig):
        self.resume = config.resume_service


    def router(self):
        router = APIRouter(
            prefix="/resume",
            tags=["resume"],
            responses={
                200: {},
                404: {"description": "Not found"},
                500: {"description": "Internal server error"},
            }
        )

        @router.get("/")
        async def get_resume():
            pass

        @router.post("/")
        async def upload_resume():
            pass

        return  router