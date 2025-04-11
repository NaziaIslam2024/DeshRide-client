import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Minus,
  Phone,
  Video,
  Image,
  Smile,
  ThumbsUp,
  SendHorizontal,
} from "lucide-react";
import { useRentCar } from "../../../providers/RentACarProvider";

function ChatModalWithOwner({ onClose }) {
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // chat message load
  const { chatData } = useRentCar();
  console.log(chatData?.messages);
  // useEffect

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    setMessage("");
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
        {chatData?.messages.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            {chat.sender === "other" && (
              <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 mt-1" />
            )}
            <div
              className={`${
                chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black"
              } rounded-2xl py-2 px-4 max-w-[60%] break-words`}
            >
              <p>{chat.message}</p>
              <p
                className={`text-xs mt-1 ${
                  chat.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {chat.time}
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
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            {/* <ThumbsUp size={20} className="text-blue-500" /> */}
            <SendHorizontal size={20} className="text-blue-500" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatModalWithOwner;
