import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../env', `${process.env.NODE_ENV || 'development'}.env`);
console.log(`Loading environment variables from: ${envPath}`);

dotenv.config({ path: envPath });

const required = [
  'MONGO_URI',
  'GEMINI_API_KEY',
  'AI_PROVIDER',
  'GROQ_API_KEY',
];

required.forEach(k => {
  if (!process.env[k]) {
    throw new Error(`Missing env var: ${k}`);
  }
});

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  AI_PROVIDER: process.env.AI_PROVIDER || 'gemini',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
};