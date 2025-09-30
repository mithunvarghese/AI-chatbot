import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/test')
    .then(res => res.json())
    .then(data => setMessage(data.message))
  }, []);

  return (
    <div className="p-5">
    <p className="font-bold text-4xl pb-3">{message}</p>
    <Button className="rounded-b-md">Click me</Button>
    </div>
  )
}

export default App 
