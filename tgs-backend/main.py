from fastapi import FastAPI

from api.v1.home import HomeAPI, HomeAPIConfig
from api.v1.project import ProjectAPI, ProjectAPIConfig
from api.v1.resume import  ResumeAPI, ResumeAPIConfig

from services.home import HomeService, HomeServiceConfig
from services.project import ProjectService, ProjectServiceConfig
from services.resume import ResumeService, ResumeServiceConfig



app = FastAPI(
    title="The G Singh"
)

home_service = HomeService()
project_service = ProjectService()
resume_service = ResumeService()

home = HomeAPI(config=HomeAPIConfig(project_service=project_service,
                                    resume_service=resume_service,
                                    home_service=home_service))
project = ProjectAPI(config=ProjectAPIConfig(project_service=project_service))
resume = ResumeAPI(config=ResumeAPIConfig(resume_service=resume_service))

app.include_router(home.router())
app.include_router(project.router())
app.include_router(resume.router())

