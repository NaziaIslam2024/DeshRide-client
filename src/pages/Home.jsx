import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axiosPublic
      .get("/job-application") // Replace with your actual endpoint
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [axiosPublic]);

  return (
    <div>
      <h1>Home Component</h1>
      <p>{data?.length}</p>
    </div>
  );
};

export default Home;
