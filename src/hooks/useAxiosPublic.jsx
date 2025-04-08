import axios from "axios";

const axiosPublic = axios.create({
<<<<<<< HEAD
  // baseURL: "http://localhost:5001",
  baseURL: "https://deshride-server.onrender.com/",
=======
  baseURL: "http://localhost:5001",

  // baseURL: "https://deshride-server.onrender.com/",

>>>>>>> c40c4b5ec38fac2f0803b4c4d53dc71dd9bdee23
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
