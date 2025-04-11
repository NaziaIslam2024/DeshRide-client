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
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const checkAuthAndFetchData = async () => {
      // Delay to give Firebase time to initialize auth state
      const authTimer = setTimeout(async () => {
        if (!isMounted) return;

        // If no user, navigate to home
        if (!user?.email) {
          setIsLoading(false);
          navigate("/");
          return;
        }

        // If user exists, fetch user data
        try {
          const response = await axiosPublic.get(`/users/getUser/${user.email}`);
          if (isMounted) {
            setUserRole(response.data.role || "consumer");
            setIsLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message);
            console.error("Failed to fetch user data:", err);
            setIsLoading(false);
          }
        }
      }, 500); // 500ms delay to ensure Firebase auth is ready

      return () => clearTimeout(authTimer);
    };

    checkAuthAndFetchData();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [user, axiosPublic, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Show loading spinner while checking
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Main dashboard render (only reached if not redirected)
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