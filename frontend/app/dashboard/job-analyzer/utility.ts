export const statusBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
  if (status === "analyzed" || status === "processed") return "default"
  if (status === "failed") return "destructive"
  return "secondary"
}

export const isSelectableStatus = (status: string): boolean => {
  return status === "processed" || status === "analyzed"
}

export const notSelectableHint = (status: string): string => {
  if (status === "processing") return "· still extracting text, please wait"
  if (status === "failed") return "· extraction failed"
  return ""
}