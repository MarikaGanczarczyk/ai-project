import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="message-input">
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}