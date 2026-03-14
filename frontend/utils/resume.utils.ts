import { ACTION_ITEMS, RESUME_STATUS } from "@/constants/resume"

export const isActionButtonDisabled = (action:string,status:string) => {
   if (action === ACTION_ITEMS.DOWNLOAD && status !== RESUME_STATUS.FAILED) {
    return false
  }

  return (status === RESUME_STATUS.PROCESSING || status === RESUME_STATUS.FAILED) && action !== ACTION_ITEMS.DOWNLOAD
}

export const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
}