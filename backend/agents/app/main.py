from fastapi import FastAPI, UploadFile, File
from app.extractor.pdf import extract_pdf
from app.extractor.doc import extract_doc
from app.extractor.normalize import normalize_resume_text
from app.utils.linkedin_detector import is_linkedin_cv
from app.utils.linkedin_normalizer import normalize_linkedin_cv
from app.utils.layout import apply_layout_fixes
from app.extractor.normalize import normalize_resume_text

app = FastAPI()

@app.post("/extract")
async def extract_resume(file: UploadFile = File(...)):
    print("Received file:", file.filename)  # Debugging line
    raw = await file.read()
    
    text = extract_pdf(raw)
    
    print("Extracted raw text:", text)  # Debugging line
    
    text = apply_layout_fixes(text)

    # ✅ LinkedIn detection
    if is_linkedin_cv(text):
        normalized = normalize_linkedin_cv(text)
        source = "linkedin"
    else:
        normalized = normalize_resume_text(text)
        source = "generic"

    return {
        "source": source,
        "parsedText": normalized
    }