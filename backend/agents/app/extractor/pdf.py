import fitz
import tempfile
from pdfminer.high_level import extract_text
from pdf2image import convert_from_bytes
import pytesseract

def extract_pdf(raw: bytes) -> str:
    text = ""

    try:
        doc = fitz.open(stream=raw, filetype="pdf")
        for page in doc:
            text += page.get_text()
    except:
        pass

    if not text.strip():
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(raw)
            text = extract_text(tmp.name)

    if not text.strip():
        images = convert_from_bytes(raw)
        for img in images:
            text += pytesseract.image_to_string(img)

    return text