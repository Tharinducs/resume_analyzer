import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import "./src/config/config.js"
import { globalRateLimiter } from "./src/midlewares/rateLimit.middleware.js";
import { errorHandler } from "./src/midlewares/errorHandler.js";
import { RESUME_ROUTE, AUTH_ROUTE } from "./src/constants/routes.js";
import authRouter from "./src/routes/auth.routes.js";
import resumeRouter from "./src/routes/resume.routes.js";

const app = express();

app.use(cors({ 
  origin: "http://localhost:3000",
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

app.use(`${AUTH_ROUTE}`, authRouter); 
app.use(`${RESUME_ROUTE}`, resumeRouter);
app.use((req, res, next) => {
  console.log(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

export default app;