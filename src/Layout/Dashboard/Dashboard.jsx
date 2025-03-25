// Dashboard.jsx
import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react"; // Added useEffect
import { Navigate, Outlet } from "react-router";
import { RiLogoutCircleFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Local loading state
  const { user, logOut } = useAuth();

  // Simulate a brief delay to let AuthProvider stabilize
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Done "loading" after a short delay
    }, 500); // Adjust delay as needed (500ms should be enough for most auth setups)

    return () => clearTimeout(timer); // Cleanup
  }, []);

  // Show loading spinner while waiting
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect only if user is null after loading
  if (!user) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="">
      <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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