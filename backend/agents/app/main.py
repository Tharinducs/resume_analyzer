from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from app.extractor.pdf import extract_pdf
from app.extractor.doc import extract_doc
from app.extractor.normalize import normalize_resume_text
from app.utils.linkedin_detector import is_linkedin_cv
from app.utils.linkedin_normalizer import normalize_linkedin_cv
from app.utils.layout import apply_layout_fixes
from app.extractor.normalize import normalize_resume_text
from app.job_analyzer import extract_job_keywords
from typing import Annotated, Optional

app = FastAPI()

FileUpload = Annotated[UploadFile, File(...)]

@app.post("/extract")
async def extract_resume(file: FileUpload):
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

@app.post("/extract-keywords")
async def extract_keywords(
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    extracted_text = text

    if file is not None:
        raw = await file.read()
        extracted_text = extract_pdf(raw)
        extracted_text = apply_layout_fixes(extracted_text)

    if not extracted_text or not extracted_text.strip():
        raise HTTPException(status_code=400, detail="No text or file provided")

    keywords = extract_job_keywords(extracted_text)

    return {
        "extractedText": extracted_text,
        "keywords": keywords,
    }