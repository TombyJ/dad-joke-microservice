const http = require('http');
const express = require('express');
const predictMood = require('./src/routes/predict-mood.js');
const statusRoute = require('./src/routes/status.js');
const config = require('./src/config/config.js');
const middleware = require('./src/middleware/middleware.js'); 

var app = express();

let server: ReturnType<typeof http.Server>;
const port = process.env.PORT || 3000;

// Sets up middleware for JSON and form data parsing, adds routes, and includes error handling middleware.
app.use('/predict-mood',predictMood);
app.use('/status', statusRoute);
app.use(express.json());
app.use(middleware.errorConverter);
app.use(middleware.errorHandler);

// Should be app.listen(config.PORT) but doesnt work => temporary solution with process.env.PORT
server = app.listen(port, () => {
    console.log(`Dad Joke Mood Predictor is listening to port ${port}`);
});

// Implements a graceful shutdown mechanism. When the server is closed (either intentionally or due to an error), it logs the closure and exits the process.
const exitHandler = () => {
    if(server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

// Error Handling: Registers event listeners for uncaught exceptions and unhandled rejections, 
// ensuring proper error handling and graceful shutdown in case of unexpected errors.
const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);