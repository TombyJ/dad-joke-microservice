"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios = require('axios');
const url = 'https://official-joke-api.appspot.com/random_joke';
var router = express.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(url);
    const joke = "" + response.data.setup + " " + response.data.punchline;
    const charCount = joke.length;
    let predictedMood;
    if (charCount < 80) {
        predictedMood = "Groan";
    }
    else if (charCount <= 150) {
        predictedMood = "Chuckle";
    }
    else {
        predictedMood = "Laugh";
    }
    res.json({
        joke: joke,
        character_count: charCount,
        predicted_mood: predictedMood
    });
}));
module.exports = router;
