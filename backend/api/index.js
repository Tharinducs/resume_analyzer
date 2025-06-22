import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./src/config/config.js"
import connectDB from "./src/config/db.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀💨 Server running on port ${PORT}`));
})
