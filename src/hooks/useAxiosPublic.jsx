import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://deshride-server.onrender.com/",
  // baseURL: "http://localhost:5001",
  baseURL: "https://desh-ride-server.vercel.app",

  // baseURL: "https://deshride-server.onrender.com/",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
