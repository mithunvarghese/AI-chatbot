import express from 'express';

import type {Request, Response} from 'express'
import dotenv from 'dotenv';

dotenv.config();



const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send({
        key: process.env.OPEN_AI_KEY
    })
})

app.get('/api/test', (req: Request, res: Response) => {
    res.send({
        message: "hello World"
    })
})


app.listen(3000, () => {
    console.log("Here it started")
})


