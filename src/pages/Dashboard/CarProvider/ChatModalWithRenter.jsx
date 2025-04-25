import React, { useState, useRef, useEffect } from "react";
import { X, Minus, Phone, Video, Image, Smile, Send } from "lucide-react";
import useRole from "../../../hooks/useRole";
import { format } from "date-fns"; // Import date-fns for formatting
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// Fake chat data with timestamps
const chatData = [
  {
    id: 1,
    sender: "ownerDriver",
    message: "Hey, how are you?",
    timestamp: new Date("2025-04-25T14:30:00"), // Full date and time
  },
  {
    id: 2,
    sender: "consumer",
    message: "I'm doing great! Thanks for asking.",
    timestamp: new Date("2025-04-25T14:31:00"),
  },
  {
    id: 3,
    sender: "ownerDriver",
    message: "That's good to hear! What are you up to?",
    timestamp: new Date("2025-04-25T14:31:00"),
  },
  {
    id: 4,
    sender: "consumer",
    message: "Just working on some projects. How about you?",
    timestamp: new Date("2025-04-25T14:32:00"),
  },
  {
    id: 5,
    sender: "ownerDriver",
    message: "Same here! Working on a new website design.",
    timestamp: new Date("2025-04-25T14:33:00"),
  },
  {
    id: 6,
    sender: "consumer",
    message: "That sounds interesting! What kind of website is it?",
    timestamp: new Date("2025-04-25T14:34:00"),
  },
  {
    id: 7,
    sender: "ownerDriver",
    message:
      "It's a social media platform, kind of like Facebook but for a specific niche.",
    timestamp: new Date("2025-04-25T14:35:00"),
  },
  {
    id: 8,
    sender: "consumer",
    message: "Wow, that's cool! Would love to see it when it's done.",
    timestamp: new Date("2025-04-25T14:36:00"),
  },
  {
    id: 9,
    sender: "ownerDriver",
    message: "Sure, I'll show you once it's ready!",
    timestamp: new Date("2025-04-25T14:36:00"),
  },
  {
    id: 10,
    sender: "consumer",
    message: "Looking forward to it! 😊",
    timestamp: new Date("2025-04-25T14:37:00"),
  },
  {
    id: 11,
    sender: "ownerDriver",
    message: "By the way, are you free this weekend?",
    timestamp: new Date("2025-04-25T14:38:00"),
  },
  {
    id: 12,
    sender: "consumer",
    message: "Yes, I should be! What do you have in mind?",
    timestamp: new Date("2025-04-25T14:39:00"),
  },
  {
    id: 13,
    sender: "ownerDriver",
    message: "There's this new coffee shop downtown, want to check it out?",
    timestamp: new Date("2025-04-25T14:40:00"),
  },
  {
    id: 14,
    sender: "consumer",
    message: "That sounds perfect! What time were you thinking?",
    timestamp: new Date("2025-04-25T14:41:00"),
  },
  {
    id: 15,
    sender: "ownerDriver",
    message: "How about Saturday around 2 PM?",
    timestamp: new Date("2025-04-25T14:42:00"),
  },
];

// Sort chatData by timestamp
const sortedChatData = [...chatData].sort(
  (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
);

function ChatModalWithRenter({ id, onClose }) {
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const [userRole, userData] = useRole();
  const useAxiosPublic = useAxiosPublic();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Sender data
  let sender = "";
  if (userRole === "ownerDriver") {
    sender = "ownerDriver";
  } else if (userRole === "consumer") {
    sender = "consumer";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const now = new Date();
      const isoDate = format(now, "yyyy-MM-dd'T'HH:mm:ss"); // Using date-fns
      const newMessage = {
        chatId: id,
        sender: sender,
        message: message,
        timestamp: isoDate,
      };
      console.log(newMessage);
      // send the message to the server
      const res = useAxiosPublic.post(`/chat/${id}/message`, newMessage);
      console.log(res);

      setMessage("");
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return format(timestamp, "MMMM d, yyyy, h:mm a"); // e.g., "April 25, 2025, 2:30 PM"
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-[88px] w-[328px] bg-white rounded-t-lg shadow-lg border border-gray-200">
        <div
          className="p-2 flex items-center justify-between bg-white cursor-pointer rounded-t-lg hover:bg-gray-100"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <span className="font-semibold">John Doe</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-[88px] w-[328px] h-[455px] bg-white rounded-t-lg shadow-lg border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-2 flex items-center justify-between bg-white border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div>
            <div className="font-semibold">John Doe</div>
            <div className="text-xs text-gray-500">Active Now</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video size={20} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMinimized(true)}
          >
            <Minus size={20} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 p-4 overflow-y-auto bg-white"
        style={{ scrollbarWidth: "thin" }}
      >
        {sortedChatData.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.sender === "ownerDriver" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            {chat.sender === "consumer" && (
              <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 mt-1" />
            )}
            <div
              className={`${
                chat.sender === "ownerDriver"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black"
              } rounded-2xl py-2 px-4 max-w-[60%] break-words`}
            >
              <p>{chat.message}</p>
              <p
                className={`text-xs mt-1 ${
                  chat.sender === "ownerDriver"
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {formatTimestamp(chat.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-2 border-t">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Image size={20} className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Smile size={20} className="text-gray-600" />
            </button>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Aa"
            className="flex-1 px-4 w-10 py-2 rounded-full bg-gray-100 focus:outline-none"
          />
          <button type="submit" className="p-2 hover:bg-gray-100 rounded-full">
            <Send size={20} className="text-blue-500" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatModalWithRenter;
