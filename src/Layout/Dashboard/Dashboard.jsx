import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { RiLogoutCircleFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState(null); // Initialize as null
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.email) {
          // If no user email, set loading to false and return
          setIsLoading(false);
          return;
        }

        // Fetch user data including role from backend
        const response = await axiosPublic.get(`/users/getUser/${user.email}`);
        setUserRole(response.data.role || 'consumer'); // Fallback to 'consumer' if role not provided
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.email, axiosPublic]); // Add axiosPublic as dependency

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no user or error, redirect or show appropriate message
  if (!user || error) {
    return navigate('/')
  }

  return (
    <div className="">
      <TopBar 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
        userRole={userRole} 
      />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
            userRole={userRole}
          />
          <div className="p-4">
            <button
              onClick={logOut}
              className="bg-red-500 w-full p-3 rounded text-center flex justify-center items-center hover:bg-purple-500 cursor-pointer"
            >
              <RiLogoutCircleFill className="mr-2 font-bold text-xl" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-full dark:bg-[#0B0716]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;