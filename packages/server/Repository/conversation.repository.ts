const conversations = new Map<string, string>();



export const conversationRepo = {

     getConversationById(conversationId: string) {
        return conversations.get(conversationId)
    },

    setConversationId(conversationId: string,responseId: string) {
        conversations.set(conversationId, responseId);
    }
}