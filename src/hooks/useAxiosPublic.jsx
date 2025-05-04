import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://desh-ride-server.vercel.app",
  // baseURL: "https://desh-ride-server.vercel.app",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
