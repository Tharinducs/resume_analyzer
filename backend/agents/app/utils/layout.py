import re

def apply_layout_fixes(text: str) -> str:
    # Normalize whitespace
    text = text.replace("\r", "")
    text = re.sub(r'[ \t]+', ' ', text)

    # Preserve section headers
    headers = [
        "WORK EXPERIENCE",
        "PROFESSIONAL EXPERIENCE",
        "EXPERIENCE",
        "EDUCATION",
        "SKILLS",
        "PROJECTS",
        "CERTIFICATIONS",
        "INTERESTS"
    ]

    for h in headers:
        text = re.sub(
            rf'\b{h}\b',
            f"\n=== {h} ===\n",
            text,
            flags=re.I
        )

    # Join wrapped sentence lines (PDF column breaks)
    text = re.sub(
        r'(?<![.\n])\n(?!\n)',
        ' ',
        text
    )

    # Fix broken bullet points
    text = re.sub(
        r'\n[-•]\s*',
        '\n• ',
        text
    )

    # Merge fragmented role/company blocks
    text = re.sub(
        r'([A-Z][A-Za-z &]+)\n([A-Z][A-Za-z0-9 &().,-]+)\n((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).+)',
        r'\1 at \2\n\3',
        text
    )

    # Ensure Responsibilities stay under correct job
    text = re.sub(
        r'(Responsibilities:)\s*',
        r'\1\n',
        text,
        flags=re.I
    )

    return text.strip()