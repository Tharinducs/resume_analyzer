import re

def normalize_linkedin_cv(text: str) -> str:
    text = re.sub(r'\n{2,}', '\n', text)

    # Normalize LinkedIn headers
    replacements = {
        r"\bExperience\b": "\n=== WORK EXPERIENCE ===\n",
        r"\bEducation\b": "\n=== EDUCATION ===\n",
        r"\bSkills\b": "\n=== SKILLS ===\n",
        r"\bCertifications\b": "\n=== CERTIFICATIONS ===\n",
    }

    for k, v in replacements.items():
        text = re.sub(k, v, text, flags=re.I)

    # Merge split role lines
    text = re.sub(
        r"([A-Za-z ]+)\n([A-Za-z &,.]+)\n((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).+)",
        r"\1 at \2\n\3",
        text
    )

    # Fix broken bullet points
    text = re.sub(r'\n(?=[a-z])', ' ', text)

    return text.strip()