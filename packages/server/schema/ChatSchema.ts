import z from 'zod';
export const ChatSchema = z.object({
    prompt: z.string().trim()
    .min(1, "Prompt is required").max(1000, "Exceeded the prompt limit"),
    conversationID: z.uuid()
})
