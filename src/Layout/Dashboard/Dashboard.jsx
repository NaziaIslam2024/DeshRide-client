import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RiLogoutCircleFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open for large devices
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile
  const [isLoading, setIsLoading] = useState(true);
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Handle window resize to detect mobile/large device
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open by default on large, closed (icons only) on mobile
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const checkAuthAndFetchData = async () => {
      // Delay to give Firebase time to initialize auth state
      const authTimer = setTimeout(async () => {
        if (!isMounted) return;

        // If no user, navigate to home
        if (!user?.email) {
          setIsLoading(false);
          // navigate("/");
          return;
        }

        // If user exists, fetch user data
        try {
          const response = await axiosPublic.get(
            `/users/getUser/${user.email}`
          );
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar: Drawer on mobile, fixed on large devices */}
      <div
        className={`${
          isMobile
            ? `${
                isSidebarOpen ? "w-64" : "w-16"
              } absolute top-0 left-0 h-full z-20`
            : `${
                isSidebarOpen ? "w-64" : "w-16"
              } fixed top-0 left-0 h-full z-10`
        } bg-gradient-to-b from-teal-800 to-teal-600 text-white transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={userRole}
          isMobile={isMobile}
        />
        <div className="p-4 border-t border-teal-500">
          <button
            onClick={logOut}
            className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 w-full ${
              isSidebarOpen
                ? "text-teal-100 hover:bg-teal-500 hover:text-white"
                : "justify-center text-teal-200 hover:bg-teal-500 hover:text-white"
            }`}
          >
            <RiLogoutCircleFill className="text-lg" />
            <span
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } text-sm font-medium`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
      {/* Main content: Adjusts opacity on mobile when sidebar is open */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-64" : "ml-16"
        } ${isMobile && isSidebarOpen ? "opacity-50" : "opacity-100"}`}
      >
        <TopBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={userRole}
          user={user}
          logOut={logOut}
        />
        <div className="overflow-y-auto h-[calc(100vh-100px)] dark:bg-[#0B0716]">
          <Outlet />
        </div>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
