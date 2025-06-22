import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./src/config/config.js"

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());