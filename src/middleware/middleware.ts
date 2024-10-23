import { ErrorRequestHandler } from 'express';
import { ApiError } from "../utils/utils.js";

// Converts non-API errors to API errors, ensuring consistency in error handling. 
// It checks if the error is an instance of ApiError and, if not, creates a new ApiError instance with relevant details.
export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    if(!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error instanceof Error ? 400 : 500);
        const message = error.message || (statusCode === 400 ? "Bad Request" : "Internal Server Error");
        error = new ApiError(statusCode, message, false, err.stack.toString());
    }
    next(error);
}

// Handles API errors. It sets the appropriate status code and message for non-operational errors in production. 
// The response payload includes the error code, message, and, in development mode, the stack trace. 
// The error is logged in the console in development mode. This middleware ensures a standardized and informative response for API errors.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        statusCode = 500; // Internal Server Error
        message = "Internal Server Error";
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }

    res.status(statusCode).json(response);
    next();
};