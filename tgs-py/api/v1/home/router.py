from dataclasses import dataclass

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from api.v1.home.types import HomeResponse, ContactDetailsResponse, HireMeRequest, HealthCheck, Profile, ProfilePicture, \
    SocialLinks, Resume
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

        @router.get("/home", response_model=HomeResponse)
        async def home():
            profile = Profile(
                designation="Senior Software Engineer",
                self_introduction= "Hello I'm \n Gagandeep Singh",
                introduction_message="I design and build production-grade systems focused on performance, scalability, and clean architecture. My work spans machine learning services, event-driven systems, AI agents, and backend platforms operating at scale, where I solve complex engineering challenges in low-latency design, concurrency, distributed architectures, and robust API development — with a strong emphasis on correctness, observability, and long-term maintainability",
                picture=ProfilePicture(
                    url="",
                    content_type="image/jpeg",
                ),
                links=SocialLinks(
                    github="",
                    linked_in="")
            )
            resume = Resume(
                download_url="some url",
                file_name="some name",
                content_type="application/pdf")

            return HomeResponse(profile=profile, resume=resume)

        @router.get("/contact", response_model=ContactDetailsResponse)
        async def contact():
            await self.home.contact_details()
            return ContactDetailsResponse(email="")

        @router.post("/hire")
        async def hire(req: HireMeRequest):
            await self.home.hire_me()
            print(req)


        return router
