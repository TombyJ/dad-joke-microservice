// This custom error class is designed to handle API-related errors. 
// It takes parameters such as the status code, message, operational status, and stack trace.
class ApiError extends Error{
    statusCode: number;
    isOperational: boolean;

    constructor(
        statusCode: number,
        message: string | undefined,
        isOperational = true,
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };