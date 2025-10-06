import { FaArrowUp } from 'react-icons/fa';
import { Button } from './button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

type FormData = {
   prompt: string;
};

const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const conversationId = useRef(crypto.randomUUID());
   const onSubmit = async ({prompt}: FormData) => {
      reset();
      const {data} = await axios.post('/api/chat',{
         prompt, conversationID: conversationId.current
      });
      console.log("Result from server :::: ", data)
   };
   return (
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
   );
};

export default ChatBot;
