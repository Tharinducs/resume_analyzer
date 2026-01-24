from pydantic import BaseModel
from typing import List, Optional

class PersonalInfo(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    location: Optional[str]
    linkedin: Optional[str]

class Experience(BaseModel):
    company: Optional[str]
    position: Optional[str]
    startDate: Optional[str]
    endDate: Optional[str]
    description: Optional[str]
    skills: List[str] = []

class Education(BaseModel):
    degree: Optional[str]
    institution: Optional[str]
    startDate: Optional[str]
    endDate: Optional[str]

class ResumeSchema(BaseModel):
    personalInfo: PersonalInfo
    workExperience: List[Experience]
    education: List[Education]
    skills: List[str]