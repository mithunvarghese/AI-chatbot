import { useEffect, useState } from "react";

function App() {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/test')
    .then(res => res.json())
    .then(data => setMessage(data.message))
  }, []);

  return <p className="font-bold text-4xl p-5">{message}</p>
}

export default App 
