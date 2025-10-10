
import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import type { ChatFormData } from './ChatInput';
import ChatInput from './ChatInput';


type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([]);

   const [isBotTyping, setIsTyping] = useState<boolean>(false);
   const [error, setError] = useState<string>('');


   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setError('');
         setIsTyping(true);
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationID: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
      } catch (error) {
         console.log(error);
         setError('We have an error');
      } finally {
         setIsTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-2 mb-10 overflow-y-auto">
            <ChatMessages messages={messages}></ChatMessages>
            {isBotTyping && <TypingIndicator/>}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
