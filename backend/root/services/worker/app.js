import express from "express";
import './src/worker/index.js';

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.send("OK");
});

export default app;