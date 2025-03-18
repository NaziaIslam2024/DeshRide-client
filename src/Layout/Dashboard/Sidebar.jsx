/* eslint-disable react/prop-types */

import { FaTachometerAlt, FaHome, FaCar } from "react-icons/fa"; // Icons from react-icons
import { NavLink } from "react-router";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // Sidebar navigation items relevant to TaskPilot
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "vehicle", label: "Vehicle List", icon: <FaCar /> },
  ];

  return (
    <div 
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-[calc(100vh-104px)] overflow-hidden `}
    >
      <div className="pl-4 mt-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={toggleSidebar}
                to={item.path}
                end // Add this prop to ensure exact matching
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 text-lg transition-all duration-200 ${
                    isActive
                      ? "text-white border-l-4 border-t-4 border-b-4 shimmer-border bg-red-500 rounded-l-4xl font-bold  custom-outward-curve" // Apply shimmer border effect when active
                      : "text-white font-bold hover:bg-purple-500 rounded-l-4xl"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`${isSidebarOpen ? "block" : "hidden md:block"}`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
