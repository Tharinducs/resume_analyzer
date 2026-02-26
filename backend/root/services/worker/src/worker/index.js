import { Worker } from "bullmq";
import { PDF_QUEUE_NAME, get } from "@ra/shared";
import { parseResumeTextAndSave } from "../service/resume.service.js";
import { connectionConfig } from "@ra/config"

const worker = new Worker(
  PDF_QUEUE_NAME,
  async (job) => {
    console.log("Processing job:", job.id, "with data:", job.data);
    const jobData = get(job, "data", {});
    await parseResumeTextAndSave(jobData);
    console.log("Completed job:", job.id);
  },
  { connection: connectionConfig }
);

export default worker;
