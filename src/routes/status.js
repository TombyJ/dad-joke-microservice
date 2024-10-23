"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    const data = {
        uptime: process.uptime() + ' seconds',
        status: 'Dad Jokes are rolling!',
        date: new Date()
    };
    res.status(200).send(data);
});
module.exports = router;
