import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useCars = (carId = null) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

<<<<<<< HEAD
  //   // todo: if user is consumer then queryKey= (null email), if user is car owner then queryKey= (user email), if user is admin then queryKey= (null)
  let queryEmail = null;
  if (user?.role === "consumer") {
    queryEmail = null;
  } else if (user?.role === "carOwner") {
    queryEmail = user?.email;
  } else if (user?.role === "admin") {
    queryEmail = null;
  }
=======
  // todo: if user is consumer then queryKey= (null email), if user is car owner then queryKey= (user email), if user is admin then queryKey= (null)
  // let queryEmail = null;
  // if (user?.role === "consumer") {
  //   queryEmail = null;
  // } else if (user?.role === "carOwner") {
  //   queryEmail = user?.email;
  // } else if (user?.role === "admin") {
  //   queryEmail = null;
  // }
  // ?: if user is consumer then queryKey= (null email), if user is car owner then queryKey= (user email), if user is admin then queryKey= (null)
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f

  // Fetch car(s)
  const {
    data: carData,
    isLoading: carDataLoading,
    error,
    refetch: carDataRefetch,
  } = useQuery({
<<<<<<< HEAD
    queryKey: ["carData", queryEmail, carId],
=======
    // queryKey: ["carData", queryEmail, carId],
    queryKey: ["carData", carId],
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
    // enabled: !!user?.email || !!carId, // only fetch if user email or carId exists
    queryFn: async () => {
      const res = await axiosPublic.get("/cars", {
        params: {
<<<<<<< HEAD
          email: queryEmail,
          carId: carId,
        },
      });
      console.log(res?.data);
=======
          // email: queryEmail,
          carId: carId,
        },
      });
      // console.log(res?.data);
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
      return res.data;
    },
  });

  return [carData, carDataLoading, carDataRefetch, error];
};

export default useCars;
<<<<<<< HEAD
=======

// 1. has queryEmail, don't have carId -> fetch all cars query by mail
// 2. has queryEmail, has carId -> fetch specific car query by mail and carId
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
