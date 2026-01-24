import tempfile
import mammoth
from docx import Document

def extract_doc(raw: bytes, ext: str) -> str:
    text = ""

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        tmp.write(raw)
        path = tmp.name

    if ext == "docx":
        doc = Document(path)
        for p in doc.paragraphs:
            text += p.text + "\n"
    else:
        with open(path, "rb") as f:
            text = mammoth.extract_raw_text(f).value

    return text