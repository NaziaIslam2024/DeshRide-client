import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../providers/AuthProvider";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user?.email);

  const {
    data: isRole,
    isLoading: isRoleLoading,
    error,
    refetch: userRoleRefetch,
  } = useQuery({
    queryKey: [user?.email, "isRole"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/getUser/${user?.email}`);
      return res.data;
    },
  });

  if (error) {
    console.error("Error fetching role:", error);
  }

  return [isRole, isRoleLoading, error, userRoleRefetch];
};

export default useRole;
