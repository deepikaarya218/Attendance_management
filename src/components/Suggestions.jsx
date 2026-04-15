import React, { useState, useEffect } from "react";
import "./Suggestions.css";

const Suggestions = () => {

  // ✅ Dummy fallback data
  const dummyMessages = [
    {
      id: 1,
      name: "Priya Singh",
      initials: "PS",
      text: "The explanation on recursion was very helpful!",
      time: "1 hour ago",
    },
    {
      id: 2,
      name: "Rohan Patel",
      initials: "RP",
      text: "I think we should review fundamentals.",
      time: "45 minutes ago",
    },
  ];

  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  // ✅ Fetch messages (backend OR fallback)
  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => {
        console.log("Backend not running → using dummy data");
        setMessages(dummyMessages);
      });
  }, []);

  // ✅ SEND message
  const handleSend = async () => {
    if (!reply.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: "You",
      initials: "Y",
      text: reply,
      time: "Just now",
    };

    try {
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      const savedMsg = await res.json();
      setMessages((prev) => [...prev, savedMsg]);

    } catch (err) {
      // 🔥 fallback if backend not working
      setMessages((prev) => [...prev, newMessage]);
    }

    setReply("");
  };

  // ✅ DELETE message
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/messages/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log("Backend delete failed → removing locally");
    }

    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="suggestions-container">

      <h2>Suggestions</h2>

      <div className="suggestions-card">

        {/* Messages */}
        <div className="suggestions-list">
          {messages.map((msg) => (
            <div key={msg.id} className="suggestion-card">

              <div className="avatar">{msg.initials}</div>

              <div className="content">
                <div className="header">
                  <span className="name">{msg.name}</span>
                  <span className="time">{msg.time}</span>
                </div>

                <p>{msg.text}</p>
              </div>

              {/* 🗑️ Delete */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(msg.id)}
              >
                🗑️
              </button>

            </div>
          ))}
        </div>

        {/* Reply Box */}
        <div className="reply-box">
          <input
            type="text"
            placeholder="Reply to students..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button onClick={handleSend}>Send</button>
        </div>

      </div>
    </div>
  );
};

export default Suggestions;
