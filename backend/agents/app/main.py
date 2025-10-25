from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import fitz  # PyMuPDF
from pdf2image import convert_from_bytes
import pytesseract
from pdfminer.high_level import extract_text
import camelot
import tempfile
import os

app = FastAPI()

@app.post('/extract')
async def extract(file: UploadFile = File(...)):
    raw = await file.read()
    text = ''
    tables = []

    # Try extracting text with PyMuPDF
    try:
        doc = fitz.open(stream=raw, filetype='pdf')
        for page in doc:
            text += page.get_text()
    except Exception:
        text = ''

    # Fallback to pdfminer if text is empty
    if not text.strip():
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                tmp.write(raw)
                tmp.flush()
                text = extract_text(tmp.name)
        finally:
            os.remove(tmp.name)

    # Extract tables using Camelot
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(raw)
            tmp.flush()
            tables_data = camelot.read_pdf(tmp.name, pages='all', flavor='lattice')
            for t in tables_data:
                tables.append(t.df.to_dict())
    except Exception as e:
        print('Camelot error:', e)

    # OCR fallback
    if not text.strip():
        images = convert_from_bytes(raw)
        for img in images:
            text += pytesseract.image_to_string(img)

    return JSONResponse({'text': text, 'tables': tables})
