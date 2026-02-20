import { Queue } from "bullmq";
import { PDF_QUEUE_NAME, connectionConfig } from "@ra/config"

const pdfQueue = new Queue(PDF_QUEUE_NAME, {
  connection: connectionConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000
    },
    removeOnComplete: 100,
    removeOnFail: 50
  }
});

export { pdfQueue };