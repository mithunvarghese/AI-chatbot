import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export type ChatFormData = {
   prompt: string;
};

type Props = {
    onSubmit: (data: ChatFormData) => void
}


const ChatInput = ({onSubmit}: Props) => {
       const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();
    
   const handleFormSubmit = handleSubmit(data => {
      reset({ prompt: '' });
      onSubmit(data);

   });
  return (
        <form
            onSubmit={handleFormSubmit}
            onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit();
               }
            }}
            className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2">
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
  )
}

export default ChatInput