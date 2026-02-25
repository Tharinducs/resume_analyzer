import { ENV } from "@ra/config";
export const PDF_QUEUE_NAME = "pdf-analysis";
export const PDF_EXTRACT_URL = `${ENV.AGENT_APP_URL}/extract`
export const DOC_EXTRACT_URL = `${ENV.AGENT_APP_URL}/extract-doc`