import { FaArrowUp } from 'react-icons/fa';
import { Button } from './button';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const onSubmit = (data: FormData) => {
      console.log(data);
      reset();
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
