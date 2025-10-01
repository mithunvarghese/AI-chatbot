import express from 'express';

import type {Request, Response} from 'express'
import dotenv from 'dotenv';

import OpenAI from 'openai'

dotenv.config();
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
    organization: 
});


const app = express();

app.use(express.json())


app.get('/api/test', (req: Request, res: Response) => {
    res.send({
        key: process.env.OPEN_AI_KEY,
    })
});





app.post('/api/chat', async (req: Request, res: Response) => {
    const {prompt} = req.body;

    console.log("Value of Prompt ::::: ", prompt)
    
    const response = await client.responses.create({
        model: 'gpt-4o-mini',
        input: prompt,
        temperature: 0.2,
        max_output_tokens: 100
    });
    res.json({
        message: response.output_text
    });
});


app.listen(3000, () => {
    console.log("Here it started")
})


