
import './App.css';
import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import SummaryBox from "./components/SummaryBox";
import "./App.css";






function App() {
  const [messages, setMessages] = useState([{ from: "Agent", text: "Hello! I'm your virtual assistant. How can I help you today?" },
    { from: "User", text: "Hi! I want to book a service appointment." },
    { from: "Agent", text: "Sure! Could you tell me the preferred date and time?" },
  { from: "User", text: "27 October at 11.30am, please." },
 { from: "Agent", text: "Thanks! I’ll check the availability for the time you requested and let you know. Please stay with me, this will only take a moment." },
  { from: "Agent", text: "Your request has been confirmed. Thank you, and we’ll see you on October 27th at 11:30 AM. We’ll send you a reminder message the day before." },
]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (text) => {
    setMessages([...messages, { from: "User", text }]);
  };

    

  const generateSummary = async () => {
    setLoading(true);
    const conversationText = messages.map(m => `${m.from}: ${m.text}`).join("\n");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: `Summarize this conversation for an employee in 2-3 sentences: \n${conversationText}` }
        ],
        temperature: 0.5
      })
    });

    const data = await res.json();
    try {
      setSummary(data.choices[0].message.content);
    } catch {
      setSummary("Failed to generate a summary.");
    }
    setLoading(false);
  };
 
  return (
    <div className="app">
      <div className='chat-container'>
      <div className='chat-title'><h1>AI WhatsApp Agent</h1></div>
      <ChatWindow messages={messages} />
      <MessageInput onSend={handleSend} />
      <button onClick={generateSummary} disabled={loading}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>
      <SummaryBox summary={summary} />
      </div>
    </div>
  );
}

export default App;