import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([]);

   const [isBotTyping, setIsTyping] = useState<boolean>(false);
   const [error, setError] = useState<string>('');


   const onSubmit = async ({ prompt }: FormData) => {
      try {
         setError('');
         setIsTyping(true);
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         reset({ prompt: '' });
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
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
               }
            }}
            className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask Anything"
               maxLength={1000}
            ></textarea>
            <Button
               disabled={!formState.isValid}
               type="submit"
               className="rounded-full h-9 w-9"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
