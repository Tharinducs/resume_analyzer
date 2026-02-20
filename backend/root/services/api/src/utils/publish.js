import { pdfQueue } from "../config/queue.js";

const publishToQueue = async (data) => {
  try {
    console.log("Publishing to queue with data:", data);
    await pdfQueue.add("analyze", data);
  } catch (err) {
    console.error("Error publishing to queue:", err);
  }
}

export { publishToQueue };