import re

def is_linkedin_cv(text: str) -> bool:
    signals = [
        r"linkedin\.com/in/",
        r"\bLinkedIn\b",
        r"\bExperience\b",
        r"\bEducation\b",
        r"\bSkills\b",
        r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}",
        r"\bPresent\b"
    ]

    score = 0
    for s in signals:
        if re.search(s, text, re.IGNORECASE):
            score += 1

    # ✅ Threshold tuned from real LinkedIn CVs
    return score >= 3