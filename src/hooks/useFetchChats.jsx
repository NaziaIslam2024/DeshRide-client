import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchChats = (chatId) => {
  const axiosPublic = useAxiosPublic();

  const fetchChats = async () => {
    if (!chatId) {
      throw new Error("Chat ID is required");
    }
    try {
      const response = await axiosPublic.get(`/chats/all_chats/${chatId}`);
      // If response.data.data is an array (empty or not), return it
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      // Handle cases where backend returns a "no chats" response
      // Example: { data: [], message: "No chats found" } or similar
      return [];
    } catch (error) {
      // Handle specific "no chats" errors gracefully
      if (
        error.response?.status === 404 ||
        error.response?.data?.message?.includes("No chats found")
      ) {
        return []; // Return empty array instead of throwing error
      }
      // Rethrow other errors to trigger onError
      throw error;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: fetchChats,
    enabled: !!chatId, // Only fetch if chatId is provided
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    refetchInterval: 1000 * 2, // Refetch every 2 seconds (as updated)
    refetchIntervalInBackground: true, // Continue polling in background
    onError: (error) => {
      console.error("Error fetching chats:", error.message);
    },
  });

  return { data, isLoading, error, refetch }; // Expose refetch
};

export default useFetchChats;
