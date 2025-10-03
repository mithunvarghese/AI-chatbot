import OpenAI from "openai";
import { conversationRepo } from "../Repository/conversation.repository";
import type { ChatResponse } from "../Models/ChatResponse";


const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY});

export const chatService = {
    
    async sendMessage(prompt: string, conversationID: string): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id: conversationRepo.getConversationById(conversationID)
        });

        conversationRepo.setConversationId(conversationID, response.id);

        return ({
            id: response.id,
            message: response.output_text
        });

    }
    
}