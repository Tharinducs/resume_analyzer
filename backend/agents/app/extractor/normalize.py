import re

def normalize_resume_text(text: str) -> str:
    text = re.sub(r'\n{2,}', '\n', text)

    headers = [
        "WORK EXPERIENCE", "PROFESSIONAL EXPERIENCE",
        "EDUCATION", "CERTIFICATIONS",
        "SKILLS", "PROJECTS", "INTERESTS"
    ]

    for h in headers:
        text = re.sub(h, f"\n=== {h} ===\n", text, flags=re.I)

    keywords = ["Responsibilities:", "Key Projects:", "Achievements:"]
    for k in keywords:
        text = text.replace(k, f"\n{k}\n")

    # Merge broken lines
    text = re.sub(r'\n(?=[a-z])', ' ', text)

    return text.strip()