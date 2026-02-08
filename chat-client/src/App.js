import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [user, setUser] = useState("");

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5000/chat", {
      user,
      message,
    });
    setReply(res.data.reply);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Local AI Chat</h2>

      <input
        placeholder="Enter username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />

      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "300px", height: "80px" }}
      />

      <br />
      <button onClick={sendMessage} style={{ marginTop: "10px" }}>
        Send
      </button>

      <h3>Reply:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;
