from pydantic import BaseModel
from typing import List, Optional

class PersonalInfo(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    github: str | None = None
    linkedin: str | None = None

class Experience(BaseModel):
    company: str | None = None
    position: str | None = None
    startDate: str | None = None
    endDate: str | None = None
    description: str | None = None
    skills: List[str] = []

class Education(BaseModel):
    degree: str | None = None
    institution: str | None = None
    startDate: str | None = None
    endDate: str | None = None

class ResumeSchema(BaseModel):
    personalInfo: PersonalInfo
    workExperience: List[Experience]
    education: List[Education]
    skills: List[str]