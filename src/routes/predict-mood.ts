import express = require('express');
const axios = require('axios');
const url = 'https://official-joke-api.appspot.com/random_joke';

var router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    const response = await axios.get(url);
    const joke = ""+response.data.setup+" "+response.data.punchline;
    const charCount = joke.length;

    let predictedMood;
    if(charCount < 80){
        predictedMood = "Groan";
    } else if(charCount <= 150){
        predictedMood = "Chuckle";
    } else {
        predictedMood = "Laugh";
    }

    res.json({
        joke: joke,
        character_count: charCount,
        predicted_mood: predictedMood 
    });
});

module.exports = router;