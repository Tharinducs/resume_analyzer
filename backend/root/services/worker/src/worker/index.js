import { Worker } from "bullmq";
import { PDF_QUEUE_NAME, connectionConfig } from "@ra/config";

const worker = new Worker(
  PDF_QUEUE_NAME,
  async (job) => {
    console.log("Processing job:", job.id, "with data:", job.data);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Completed job:", job.id);
  },
  { connection: connectionConfig }
);

export default worker;
