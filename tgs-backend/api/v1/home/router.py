from dataclasses import dataclass

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from api.v1.home.types import HomeResponse, ContactDetailsResponse, HireMeRequest, HealthCheck
from services.home import HomeService
from services.project import ProjectService
from services.resume import ResumeService


@dataclass
class HomeAPIConfig:
    home_service: HomeService
    project_service: ProjectService
    resume_service: ResumeService

class HomeAPI:
    def __init__(self, config: HomeAPIConfig):
        self.project = config.project_service
        self.resume = config.resume_service
        self.home = config.home_service

    def router(self) -> APIRouter:
        router = APIRouter()

        @router.get("/health")
        async def health_check():
            return jsonable_encoder(HealthCheck(status="OK"))

        @router.get("/home")
        async def home():
            print("HOME")
            home_response = HomeResponse(profile=None, resume=None)
            return jsonable_encoder(home_response)

        @router.get("/contact")
        async def contact():
            await self.home.contact_details()
            contact_response = ContactDetailsResponse(email="")
            return jsonable_encoder(contact_response)

        @router.post("/hire")
        async def hire(req: HireMeRequest):
            await self.home.hire_me()
            print(req)


        return router
