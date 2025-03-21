import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useState, useEffect } from "react";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // States
  const [userRole, setUserRole] = useState(null);
  const [userRoleLoading, setUserRoleLoading] = useState(true);

  // Fetch user data
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

  // Effect to update role when userData changes
  useEffect(() => {
    if (userData) {
      const { role, hasCar, carUsage } = userData;

      if (role === "provider") {
        if (hasCar && carUsage === "drive") {
          setUserRole("driver_with_car");
        } else if (hasCar && carUsage === "rent") {
          setUserRole("renter");
        } else if (!hasCar) {
          setUserRole("provider_without_car");
        }
      } else if (role === "consumer") {
        setUserRole("consumer");
      }

      setUserRoleLoading(false);
    }
  }, [userData]); // Runs only when userData changes

  if (error) {
    console.error("Error fetching role:", error);
  }

  console.log("User role:", userRole);

  return [
    userData,
    userDataLoading,
    userRoleRefetch,
    error,
    userRole,
    userRoleLoading,
  ];
};

export default useRole;
