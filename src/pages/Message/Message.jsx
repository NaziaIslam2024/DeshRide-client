// export default Message;
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://desh-ride-server.vercel.app"); // Connect to the server

const Message = ({ userId, role }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   // Optionally emit a register event if needed
  //   socket.emit("register", { userId, role });

  //   // Listen for incoming messages
  //   socket.on("receiveMessage", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socket.off("receiveMessage");
  //   };
  // }, [userId, role]);
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      // Show only admin replies for consumers
      if (role === "consumer" && message.sender !== "admin") return;

      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("receiveMessage");
  }, [userId, role]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Build the message payload including the userId from props
      const messagePayload = {
        sender: role, // Should be "consumer" or "admin"
        text: newMessage,
        userId, // userId comes from the prop passed when rendering the component
      };

      // Log the payload for debugging
      console.log("Sending message payload:", messagePayload);

      // Emit the message event via Socket.io
      socket.emit("sendMessage", messagePayload);

      // Optionally update the local state for immediate UI response
      setMessages((prevMessages) => [...prevMessages, messagePayload]);
      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-200 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border p-3 h-64 overflow-y-auto rounded bg-white">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 my-1 rounded shadow ${
              msg.userId === userId ? "bg-blue-200" : "bg-green-200"
            }`}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
