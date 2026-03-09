const RESUME_STATUS = {
  ALL: "all",
  ANALYZED: "analyzed",
  PROCESSING: "processing",
  PROCESSED: "processed",
  FAILED: "failed"
}

const RESUME_STATUS_LABELS = {
  [RESUME_STATUS.ALL]: "All",
  [RESUME_STATUS.ANALYZED]: "Analyzed",
  [RESUME_STATUS.PROCESSING]: "Processing",
  [RESUME_STATUS.PROCESSED]: "Processed",
  [RESUME_STATUS.FAILED]: "Failed"
}

const ACTION_ITEMS = {
  DOWNLOAD: "download",
  DELETE: "delete",
  VIEW: "view"
}

export { RESUME_STATUS, RESUME_STATUS_LABELS, ACTION_ITEMS }