import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import "@ra/config";
import { globalRateLimiter } from "./src/midlewares/rateLimit.middleware.js";
import { errorHandler } from "./src/midlewares/errorHandler.js";
import { RESUME_ROUTE, AUTH_ROUTE, ANALYSIS_ROUTE, DASHBOARD_ROUTE, JOB_ANALYZER_ROUTE } from "./src/constants/routes.js";
import authRouter from "./src/routes/auth.routes.js";
import resumeRouter from "./src/routes/resume.routes.js";
import analysisRouter from "./src/routes/analysis.routes.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import jobAnalyzerRouter from "./src/routes/job-analyzer.routes.js";
import searchRouter from "./src/routes/search.routes.js";
import { authenticate } from "./src/midlewares/authenticate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDoc = YAML.load(join(__dirname, "swagger.yaml"));

const app = express();

app.use(cors({ 
  origin: ["http://localhost:3000", "https://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(join(process.cwd(), "uploads")));
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(globalRateLimiter)
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.disable("x-powered-by");

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(`${AUTH_ROUTE}`, authRouter); 
app.use(`${RESUME_ROUTE}`, authenticate ,resumeRouter);
app.use(`${ANALYSIS_ROUTE}`, authenticate, analysisRouter);
app.use(`${DASHBOARD_ROUTE}`, authenticate, dashboardRouter);
app.use(`${JOB_ANALYZER_ROUTE}`, authenticate, jobAnalyzerRouter);
app.use(`/api/search`, authenticate, searchRouter);

app.use((req, res, next) => {
  console.log(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

export default app;