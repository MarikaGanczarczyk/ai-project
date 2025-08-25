export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <p key={i}><b>{m.from}:</b> {m.text}</p>
      ))}
    </div>
  );
}