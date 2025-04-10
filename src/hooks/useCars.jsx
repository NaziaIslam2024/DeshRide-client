import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useCars = (carId = null) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  //   // todo: if user is consumer then queryKey= (null email), if user is car owner then queryKey= (user email), if user is admin then queryKey= (null)
  let queryEmail = null;
  if (user?.role === "consumer") {
    queryEmail = null;
  } else if (user?.role === "carOwner") {
    queryEmail = user?.email;
  } else if (user?.role === "admin") {
    queryEmail = null;
  }

  // Fetch car(s)
  const {
    data: carData,
    isLoading: carDataLoading,
    error,
    refetch: carDataRefetch,
  } = useQuery({
    queryKey: ["carData", queryEmail, carId],
    // enabled: !!user?.email || !!carId, // only fetch if user email or carId exists
    queryFn: async () => {
      const res = await axiosPublic.get("/cars", {
        params: {
          email: queryEmail,
          carId: carId,
        },
      });
      console.log(res?.data);
      return res.data;
    },
  });

  return [carData, carDataLoading, carDataRefetch, error];
};

export default useCars;
