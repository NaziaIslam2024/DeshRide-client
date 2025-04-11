
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import socket from "./socket";


// const AdminMessages = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // ✅ ইউজার লোড করা (ফিক্সড)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/messages/users");
//         setUsers(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setUsers([]);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ✅ সিলেক্টেড ইউজারের মেসেজ লোড করা (ফিক্সড)
//   const fetchMessages = async (userId) => {
//     try {
//       const response = await axios.get(`/messages/${userId}`);
//       setMessages(response.data);
//       setSelectedUser(userId);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // ✅ মেসেজ রিসিভ করার জন্য Socket Listener (ফিক্সড)
// useEffect(() => {
//   if (!selectedUser) return;

//   const handleMessage = (message) => {
//     console.log("📥 Message received in Admin:", message);

//     if (message.userId === selectedUser) {
//       setMessages((prev) => [...prev, message]); // ✅ Update messages correctly
//     }
//   };

//   socket.on("receiveMessage", handleMessage);
//   return () => socket.off("receiveMessage", handleMessage);
// }, [selectedUser]);

//   // ✅ মেসেজ পাঠানো (ফিক্সড)
//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedUser) return;

//     const messageData = {
//       sender: "admin",
//       text: newMessage,
//       userId: selectedUser,
//     };

//     try {
//       await axios.post("/messages", messageData);
//       socket.emit("sendMessage", messageData); // ✅ Socket Emit যোগ করা হয়েছে
//       setMessages((prev) => [...prev, messageData]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar: List of Users */}
//       <div className="w-1/3 bg-gray-200 p-4 overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4">Users</h2>
//         {users.length === 0 && <p>No messages found</p>}
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className={`p-2 cursor-pointer bg-white rounded shadow mb-2 ${
//               selectedUser === user._id ? "bg-blue-300" : ""
//             }`}
//             onClick={() => fetchMessages(user._id)}
//           >
//             {user.email} {/* Show email instead of ID */}
//           </div>
//         ))}
//       </div>

//       {/* Chat Section */}
//       <div className="w-2/3 bg-white p-4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <h2 className="text-lg font-semibold mb-2">Chat with {selectedUser}</h2>
//             <div className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 rounded mb-2 ${
//                     msg.sender === "admin"
//                       ? "bg-blue-500 text-white text-right"
//                       : "bg-gray-300 text-left"
//                   }`}
//                 >
//                   <strong>{msg.sender}: </strong> {msg.text}
//                 </div>
//               ))}
//             </div>

//             {/* Input for Reply */}
//             <div className="mt-4 flex">
//               <input
//                 type="text"
//                 className="flex-1 border p-2 rounded"
//                 placeholder="Type your reply..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button className="bg-blue-600 text-white p-2 ml-2 rounded" onClick={sendMessage}>
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Select a user to view messages</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminMessages;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import socket from "./socket";

// const AdminMessages = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState(null); // Add error state

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/messages/users");
//         console.log("Fetched users:", response.data);
//         setUsers(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError("Failed to fetch users. Please try again later.");
//         setUsers([]);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch messages for the selected user
//   const fetchMessages = async (userId) => {
//     try {
//       const response = await axios.get(`/messages/${userId}`);
//       console.log("Fetched messages for user", userId, ":", response.data);
//       setMessages(response.data);
//       setSelectedUser(userId);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Socket listener for receiving messages
//   useEffect(() => {
//     if (!selectedUser) return;

//     const handleMessage = (message) => {
//       console.log("📥 Message received in Admin:", message);

//       if (message.userId === selectedUser) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     socket.on("receiveMessage", handleMessage);
//     return () => socket.off("receiveMessage", handleMessage);
//   }, [selectedUser]);

//   // Send a message
//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedUser) return;

//     const messageData = {
//       sender: "admin",
//       text: newMessage,
//       userId: selectedUser,
//     };

//     try {
//       await axios.post("/messages", messageData);
//       socket.emit("sendMessage", messageData);
//       setMessages((prev) => [...prev, messageData]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar: List of Users */}
//       <div className="w-1/3 bg-gray-200 p-4 overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4">Users</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {users.length === 0 && !error && <p>No messages found</p>}
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className={`p-2 cursor-pointer bg-white rounded shadow mb-2 ${
//               selectedUser === user._id ? "bg-blue-300" : ""
//             }`}
//             onClick={() => fetchMessages(user._id)}
//           >
//             {user.email}
//           </div>
//         ))}
//       </div>

//       {/* Chat Section */}
//       <div className="w-2/3 bg-white p-4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <h2 className="text-lg font-semibold mb-2">Chat with {selectedUser}</h2>
//             <div className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded">
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Consumer Messages (Left Column) */}
//                 <div className="space-y-2">
//                   {messages
//                     .filter((msg) => msg.sender === "consumer")
//                     .map((msg, index) => (
//                       <div
//                         key={index}
//                         className="p-2 rounded bg-gray-300 text-left max-w-xs"
//                       >
//                         <strong>{msg.sender}: </strong> {msg.text}
//                         <div className="text-xs text-gray-500 mt-1">
//                           {new Date(msg.createdAt).toLocaleTimeString()}
//                         </div>
//                       </div>
//                     ))}
//                 </div>

//                 {/* Admin Messages (Right Column) */}
//                 <div className="space-y-2 flex flex-col items-end">
//                   {messages
//                     .filter((msg) => msg.sender === "admin")
//                     .map((msg, index) => (
//                       <div
//                         key={index}
//                         className="p-2 rounded bg-blue-500 text-white text-right max-w-xs"
//                       >
//                         <strong>{msg.sender}: </strong> {msg.text}
//                         <div className="text-xs text-white mt-1">
//                           {new Date(msg.createdAt).toLocaleTimeString()}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>

//             {/* Input for Reply */}
//             <div className="mt-4 flex">
//               <input
//                 type="text"
//                 className="flex-1 border p-2 rounded"
//                 placeholder="Type your reply..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button
//                 className="bg-blue-600 text-white p-2 ml-2 rounded"
//                 onClick={sendMessage}
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Select a user to view messages</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminMessages;
import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // For the reply dropdown
  const [selectedUser, setSelectedUser] = useState(""); // For the reply dropdown
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/messages");
        console.log("Fetched messages:", response.data);
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again later.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/messages/users");
        console.log("Fetched users:", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []);
        if (response.data.length > 0) {
          setSelectedUser(response.data[0]._id); // Set the first user as default
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchMessages();
    fetchUsers();
  }, []);

  // Socket listener for receiving messages
  useEffect(() => {
    const handleMessage = (message) => {
      console.log("📥 Message received in Admin:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleMessage);
    return () => socket.off("receiveMessage", handleMessage);
  }, []);

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      sender: "admin",
      text: newMessage,
      userId: selectedUser,
    };

    try {
      await axios.post("/messages", messageData);
      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Group messages by userId
  const groupedMessages = messages.reduce((acc, msg) => {
    const userId = msg.userId;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex h-screen p-4">
      {/* Consumer Messages (Left Column) */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Consumer Messages</h2>
        {error && <p className="text-red-500">{error}</p>}
        {messages.length === 0 && !error && <p>No messages found</p>}
        {Object.keys(groupedMessages).map((userId) => (
          <div key={userId} className="mb-6">
            <h3 className="text-md font-medium">
              User: {users.find((user) => user._id === userId)?.email || userId}
            </h3>
            {groupedMessages[userId]
              .filter((msg) => msg.sender === "consumer")
              .map((msg, index) => (
                <div
                  key={index}
                  className="p-2 rounded bg-gray-300 text-left max-w-xs mb-2"
                >
                  <strong>{msg.sender}: </strong> {msg.text}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Admin Messages (Middle Column) */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Admin Messages</h2>
        {Object.keys(groupedMessages).map((userId) => (
          <div key={userId} className="mb-6">
            <h3 className="text-md font-medium">
              User: {users.find((user) => user._id === userId)?.email || userId}
            </h3>
            {groupedMessages[userId]
              .filter((msg) => msg.sender === "admin")
              .map((msg, index) => (
                <div
                  key={index}
                  className="p-2 rounded bg-blue-500 text-white text-right max-w-xs mb-2"
                >
                  <strong>{msg.sender}: </strong> {msg.text}
                  <div className="text-xs text-white mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Reply Section (Right Column) */}
      <div className="w-1/3 bg-gray-200 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Reply to User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {users.length === 0 && <option value="">No users available</option>}
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Type your reply..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows="4"
          />
        </div>
        <button
          className="bg-blue-600 text-white p-2 mt-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminMessages;