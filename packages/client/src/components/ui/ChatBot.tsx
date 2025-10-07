import { FaArrowUp } from 'react-icons/fa';
import { Button } from './button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string
}
type Message = {
   content: string;
   role: 'user' | 'bot';
} 
const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([])
   const onSubmit = async ({prompt}: FormData) => {
      setMessages(prev => [...prev, {content: prompt, role: 'user'}])
      reset();
      const {data} = await axios.post<ChatResponse>('/api/chat',{
         prompt, conversationID: conversationId.current
      });
      setMessages(prev => [...prev, {content: data.message, role:'bot'}])
      console.log("Result from server :::: ", data)
   };
   return (
      <div className='mb-2'>
         <div className='flex flex-col gap-2 mb-3'>
            {messages.map((message, index) => 
               (<p className={`px-3 py-1 rounded-3xl ${message.role === 'user' ? 
               'bg-emerald-600 text-white self-end' : 
               'bg-gray-200 text-black self-start'}`} key={index}>{message.content}</p>))}
         </div>
         <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={e => {
                   if(e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleSubmit(onSubmit)()
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
            <Button disabled={!formState.isValid} type="submit" className="rounded-full h-9 w-9">
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
