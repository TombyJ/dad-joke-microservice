"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const configFile = './.env';
(0, dotenv_1.config)({ path: configFile });
const { PORT, NODE_ENV } = process.env;
exports.default = {
    PORT,
    env: NODE_ENV
};
