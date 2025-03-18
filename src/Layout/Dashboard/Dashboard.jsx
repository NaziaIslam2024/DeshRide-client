// Dashboard.jsx
import TopBar from "./Topbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { RiLogoutCircleFill } from "react-icons/ri";



const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="">
      <TopBar
        toggleSidebar={toggleSidebar}  isSidebarOpen={isSidebarOpen}
      />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          <div className="p-4"> 
            <button
              onClick={'hello'}
              className="bg-red-500  w-full p-3 rounded text-center flex justify-center items-center hover:bg-purple-500 cursor-pointer"
            > <RiLogoutCircleFill  className="mr-2 font-bold text-xl" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1  overflow-y-auto h-full dark:bg-[#0B0716]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;