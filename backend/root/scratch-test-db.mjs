import dotenv from "dotenv";
dotenv.config({ path: "./env/development.env" });

import mongoose from "mongoose";
import { ENV } from "@ra/config";
import { getResumeById, getAnalysisByResumeId } from "@ra/shared";
import { analyseTheResumeUsingResumeId } from "./services/api/src/services/analysis.service.js";

console.log("Connecting to MongoDB at URI:", ENV.MONGO_URI);
await mongoose.connect(ENV.MONGO_URI);
console.log("Connected successfully!");

const resumeId = "69b5408f1f1cdf59944f6017";
const userId = "test-user-id";

try {
  console.log("Testing getResumeById...");
  const resume = await getResumeById(resumeId);
  console.log("Resume found:", !!resume);
  if (resume) {
    console.log("Extracted Data keys:", Object.keys(resume.extractedData || {}));
    console.log("Extracted Data:", JSON.stringify(resume.extractedData, null, 2));
  }

  console.log("Calling analyseTheResumeUsingResumeId...");
  const result = await analyseTheResumeUsingResumeId(resumeId, userId);
  console.log("Analysis Result:", result);
} catch (error) {
  console.error("Caught error in script:", error);
} finally {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}
