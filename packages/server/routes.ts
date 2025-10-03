import type {Request, Response} from 'express'
import { chatController } from './Controller/ChatController';
import express from 'express';


const router = express.Router();

router.get('/api/test', (req: Request, res: Response) => {
    res.send({
        key: process.env.OPEN_AI_KEY,
    })
});


router.post('/api/chat', chatController.sendMessage);

export default router;