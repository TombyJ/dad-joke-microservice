"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const utils_js_1 = require("../utils/utils.js");
// Converts non-API errors to API errors, ensuring consistency in error handling. 
// It checks if the error is an instance of ApiError and, if not, creates a new ApiError instance with relevant details.
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof utils_js_1.ApiError)) {
        const statusCode = error.statusCode || (error instanceof Error ? 400 : 500);
        const message = error.message || (statusCode === 400 ? "Bad Request" : "Internal Server Error");
        error = new utils_js_1.ApiError(statusCode, message, false, err.stack.toString());
    }
    next(error);
};
exports.errorConverter = errorConverter;
// Handles API errors. It sets the appropriate status code and message for non-operational errors in production. 
// The response payload includes the error code, message, and, in development mode, the stack trace. 
// The error is logged in the console in development mode. This middleware ensures a standardized and informative response for API errors.
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        statusCode = 500; // Internal Server Error
        message = "Internal Server Error";
    }
    res.locals.errorMessage = err.message;
    const response = Object.assign({ code: statusCode, message }, (process.env.NODE_ENV === "development" && { stack: err.stack }));
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }
    res.status(statusCode).json(response);
    next();
};
exports.errorHandler = errorHandler;
