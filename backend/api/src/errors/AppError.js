export class AppError extends Error {
    constructor(code, message, status = 400) {
        super(message);
        this.code = code;
        this.status = status;
        Error.captureStackTrace(this, this.constructor)
    }
}