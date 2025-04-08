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
  const [authChecked, setAuthChecked] = useState(false); // New state to track auth check
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to give Firebase time to check auth state
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 500); // 500ms should be enough time for Firebase to initialize

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          const response = await axiosPublic.get(
            `/users/getUser/${user.email}`
          );
          console.log(response.data);
          setUserRole(response.data.role || "consumer");
        } catch (err) {
          setError(err.message);
          console.error("Failed to fetch user data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    } else if (authChecked && !user) {
      // Only redirect if we've given Firebase time to check AND there's no user

      navigate("/");
      setIsLoading(true);
    }
  }, [user, authChecked, axiosPublic, navigate]);

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

  // Main dashboard render
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
