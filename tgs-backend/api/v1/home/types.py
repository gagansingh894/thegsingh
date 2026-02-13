from pydantic import BaseModel

class Resume(BaseModel):
    download_url: str
    file_name: str
    content_type: str

class ProfilePicture(BaseModel):
    content_type: str
    data: str

class SocialLinks(BaseModel):
    github_url: str
    linked_in: str

class Profile(BaseModel):
    designation: str
    self_introduction: str
    introduction_message: str
    picture: ProfilePicture | None
    links: SocialLinks | None

class HomeResponse(BaseModel):
    profile: Profile | None
    resume: Resume | None

class ContactDetailsResponse(BaseModel):
    email: str

class HireMeRequest(BaseModel):
    first_name: str
    last_name: str
    email_address: str
    phone_number: str
    message: str

class HealthCheck(BaseModel):
    status: str = "OK"