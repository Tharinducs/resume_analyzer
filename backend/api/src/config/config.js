import path from 'node:path'
import dotenv from "dotenv";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../env', `${process.env.NODE_ENV || 'development'}.env`);

dotenv.config({ path: envPath });

console.log('PORT:', process.env.PORT);