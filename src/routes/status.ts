import { Request, Response, Router, NextFunction } from 'express';

var router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const data = {
        uptime: process.uptime()+' seconds',
        status: 'Dad Jokes are rolling!',
        date: new Date()
    }
    res.status(200).send(data);
})

module.exports = router;