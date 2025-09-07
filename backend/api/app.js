import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import "./src/config/config.js"
import { globalRateLimiter } from "./src/midlewares/rateLimit.middleware.js";
import { errorHandler } from "./src/midlewares/errorHandler.js";

const app = express();

app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(globalRateLimiter)
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.disable("x-powered-by");

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

export default app;