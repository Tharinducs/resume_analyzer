import { ENV } from "@ra/config";
export const PDF_QUEUE_NAME = "pdf-analysis";
export const PDF_EXTRACT_URL = `${ENV.AGENT_APP_URL}/extract`
export const DOC_EXTRACT_URL = `${ENV.AGENT_APP_URL}/extract-doc`

export const MIME_TYPES = {
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

export const FILE_TYPE = {
    PDF: "PDF",
    DOC: "DOC"
}

export const MIME_TO_FILE_TYPE = {
    [MIME_TYPES.PDF]: FILE_TYPE.PDF,
    [MIME_TYPES.DOC]: FILE_TYPE.DOC,
    [MIME_TYPES.DOCX]: FILE_TYPE.DOC,
}

export const FILE_TYPE_TO_MIME = {
    [FILE_TYPE.PDF]: MIME_TYPES.PDF,
    [FILE_TYPE.DOC]: MIME_TYPES.DOCX, // Default to DOCX for DOC type
}