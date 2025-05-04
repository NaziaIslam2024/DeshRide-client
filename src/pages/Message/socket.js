import { io } from "socket.io-client";

// const socket = io("https://desh-ride-server.vercel.app", {
const socket = io("https://desh-ride-server.vercel.app", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
