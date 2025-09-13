import fs from "fs";
import dotenv from "dotenv";

const ENV = process.env.ENV || process.env.NODE_ENV || "development";

// Try to load .env file based on ENV
const envFile = `.env.${ENV}`;
if (fs.existsSync(envFile)) {
  console.log(`🔑 Loading ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.log(`⚠️ No ${envFile} found, falling back to default`);
  dotenv.config();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ENV,
    NEXT_PUBLIC_ENV: ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
