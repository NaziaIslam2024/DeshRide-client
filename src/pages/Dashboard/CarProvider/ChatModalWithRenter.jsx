import React, { useState, useEffect, useRef } from "react";
import { X, Minus, Phone, Video, Image, Smile, Send } from "lucide-react";
import { format } from "date-fns";
import useRole from "../../../hooks/useRole";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useFetchChats from "../../../hooks/useFetchChats";

function ChatModalWithRenter({ chatId, onClose }) {
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const [userRole, userData] = useRole();
  const axiosPublic = useAxiosPublic();

  // Fetch chats using the custom hook
  const { data: chats, isLoading, error, refetch } = useFetchChats(chatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]); // Scroll when chats update

  // Sender and me logic
  const me = userRole === "ownerDriver" ? "ownerDriver" : "consumer";
  const sender = me;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const now = new Date();
      const isoDate = format(now, "yyyy-MM-dd'T'HH:mm:ss");
      const newMessage = {
        chatId: chatId,
        sender: sender,
        message: message,
        timestamp: isoDate,
      };
      try {
        const res = await axiosPublic.post("/chats/all_chats", newMessage);
        setMessage("");
        refetch(); // Manually refetch chats after sending a message
      } catch (error) {
        console.error(
          "Error sending message:",
          error.response?.data || error.message
        );
        alert("Failed to send message. Please try again.");
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), "MMMM d, yyyy, h:mm a");
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
        {isLoading ? (
          <div className="text-center text-gray-500">Loading chats...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading chats: {error.message}
          </div>
        ) : chats && chats.length > 0 ? (
          chats
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((chat) => (
              <div
                key={chat._id} // Using _id as the unique key
                className={`flex ${
                  chat.sender === me ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {chat.sender !== me && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 mt-1" />
                )}
                <div
                  className={`${
                    chat.sender === me
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-black"
                  } rounded-2xl py-2 px-4 max-w-[60%] break-words`}
                >
                  <p>{chat.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      chat.sender === me ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {formatTimestamp(chat.timestamp)}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p className="text-lg font-semibold">Start Chatting!</p>
            <p className="text-sm">Send a message to begin the conversation.</p>
          </div>
        )}
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
