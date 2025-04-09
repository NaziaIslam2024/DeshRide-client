import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5001",
  // baseURL: "https://deshride-server.onrender.com/",
  baseURL: "http://localhost:5001",

  // baseURL: "https://deshride-server.onrender.com/",

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
