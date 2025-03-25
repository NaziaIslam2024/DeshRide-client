import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { RiLogoutCircleFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState('consumer');
  const [error, setError] = useState(null);
  const axiosPublic= useAxiosPublic()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.email) {
          throw new Error('User email is not available');
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
  }, [user?.email]); // Add user.email as dependency

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="">
      <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} userRole={userRole} />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
            userRole={userRole} // Pass the userRole to Sidebar
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