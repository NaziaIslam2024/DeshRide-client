import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch user data along with userRole
  const {
    data: userData,
    isLoading: userDataLoading,
    error,
    refetch: userRoleRefetch,
  } = useQuery({
    queryKey: [user?.email, "userData"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/getUser/${user?.email}`);
      return res.data;
    },
  });
  const userRole = userData?.userRole;

  return [userRole, userData, userDataLoading, userRoleRefetch, error];
};

export default useRole;
