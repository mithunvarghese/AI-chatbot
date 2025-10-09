import { useRef, useEffect } from 'react';
import ReactMarkDown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
}; 

type Props = {
    messages: Message[]
}
const ChatMessages = ({messages}: Props) => {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

    const onCopyMessage = (e: React.ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
  return (
    <div className='flex flex-col gap-3'>
        {messages.map((message, index) => (
               <p
                  className={`px-3 py-1 rounded-3xl ${
                     message.role === 'user'
                        ? 'bg-emerald-600 text-white self-end'
                        : 'bg-gray-200 text-black self-start'
                  }`}
                  key={index}
                  onCopy={onCopyMessage}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
               >
                  <ReactMarkDown>{message.content}</ReactMarkDown>
               </p>
            ))}
        </div>
  )
}

export default ChatMessages