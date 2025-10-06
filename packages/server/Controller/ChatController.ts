import type {Request, Response} from 'express'
import { chatService } from '../Services/ChatService';
import { ChatSchema } from '../schema/ChatSchema';

export const chatController = {

    async sendMessage(req: Request, res: Response) {
        console.log(req.body)
        const {prompt, conversationID} = req.body;
        const chatRequestSchemaValidation = ChatSchema.safeParse(req.body);
        console.log(chatRequestSchemaValidation)
        if(!chatRequestSchemaValidation.success) {
            res.status(400).json(chatRequestSchemaValidation.error.format());
            // console.log("It does execute:: ")
            return;
        }
        try {
            const response =  await chatService.sendMessage(prompt, conversationID);
            res.json({
                message: response.message,
            });

        } catch(error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}