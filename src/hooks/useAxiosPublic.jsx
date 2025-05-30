import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5001",
  // baseURL: "http://localhost:5001",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
