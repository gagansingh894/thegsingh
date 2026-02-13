from dataclasses import dataclass

from fastapi import APIRouter

from services.project import ProjectService

@dataclass
class ProjectAPIConfig:
    project_service: ProjectService


class ProjectAPI:
    def __init__(self, config: ProjectAPIConfig):
        self.project = config.project_service

    def router(self) -> APIRouter:
        router = APIRouter(
            prefix="/projects",
            tags=["projects"],
            responses={
                200: {},
                404: {"description": "Not found"},
                500: {"description": "Internal server error"},
            }
        )


        @router.get("/")
        async def projects():
            print("GET projects")
            await self.project.projects()

        @router.post("/")
        async def create_project():
            print("POST projects")
            await self.project.create_project()

        @router.patch("/{project_id}")
        async def edit_project(project_id: str):
            print("UPDATE projects")
            await self.project.edit_project()

        @router.delete("/{project_id}")
        async def delete_project(project_id: str):
            print("DELETE projects")
            await self.project.delete_project()

        return router
