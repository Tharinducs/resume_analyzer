import re
from typing import List, Dict, Any

TECHNICAL = [
    # Languages
    "python", "javascript", "typescript", "java", "c++", "c#", "ruby", "golang", "rust",
    "swift", "kotlin", "php", "scala", "r", "matlab", "bash", "shell", "sql", "html", "css",
    # Frontend
    "react", "angular", "vue", "next.js", "nuxt", "svelte", "redux", "graphql", "webpack",
    "vite", "jest", "cypress", "sass", "tailwind", "bootstrap", "jquery",
    # Backend
    "node.js", "express", "django", "flask", "fastapi", "spring", "laravel", "rails",
    "rest api", "restful", "microservices", "grpc", "websocket", "oauth",
    # Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci/cd", "jenkins",
    "github actions", "circleci", "linux", "nginx", "ansible", "helm",
    # Databases
    "postgresql", "mysql", "mongodb", "elasticsearch", "redis", "cassandra", "dynamodb",
    "sqlite", "firebase", "supabase",
    # AI/ML
    "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
    "nlp", "llm", "data science", "pandas", "numpy",
    # Other tools
    "git", "github", "gitlab", "jira", "confluence", "figma", "postman",
]

SOFT_SKILLS = [
    "leadership", "communication", "collaboration", "problem solving", "problem-solving",
    "teamwork", "critical thinking", "adaptability", "time management", "project management",
    "mentoring", "coaching", "presentation", "analytical", "decision making",
    "stakeholder management", "cross-functional", "self-motivated", "attention to detail",
]

CERTIFICATIONS = [
    "aws certified", "azure certified", "gcp certified", "pmp", "scrum master",
    "cissp", "cpa", "cfa", "comptia", "cisco", "ccna", "ccnp",
]


def _find_matches(text_lower: str, terms: List[str]) -> List[str]:
    found = []
    for term in terms:
        pattern = r'\b' + re.escape(term) + r'\b'
        if re.search(pattern, text_lower):
            found.append(term)
    return found


def extract_job_keywords(text: str) -> Dict[str, Any]:
    text_lower = text.lower()

    technical = _find_matches(text_lower, TECHNICAL)
    soft = _find_matches(text_lower, SOFT_SKILLS)
    certs = _find_matches(text_lower, CERTIFICATIONS)

    exp_matches = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)', text_lower)
    years_of_experience = exp_matches[0] + "+" if exp_matches else None

    education = []
    if re.search(r"bachelor'?s?|b\.?s\.?|b\.?e\.?|b\.?tech", text_lower):
        education.append("Bachelor's degree")
    if re.search(r"master'?s?|m\.?s\.?|m\.?tech|mba", text_lower):
        education.append("Master's degree")
    if re.search(r"phd|doctorate|ph\.d", text_lower):
        education.append("PhD")

    all_keywords = list(dict.fromkeys(technical + soft + certs))

    return {
        "technical": technical,
        "soft": soft,
        "certifications": certs,
        "all": all_keywords,
        "yearsOfExperience": years_of_experience,
        "education": education,
    }
