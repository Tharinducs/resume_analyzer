import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const FormData = require('form-data');

export default FormData