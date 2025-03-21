/* eslint-disable react/prop-types */

import { FaTachometerAlt, FaHome, FaCar, FaUser } from "react-icons/fa"; // Icons from react-icons
import { NavLink } from "react-router";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // Sidebar navigation items relevant to TaskPilot
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "my-profile", label: "My Profile", icon: <FaUser /> },
    { path: "vehicle", label: "Vehicle List", icon: <FaCar /> },
    { path: "all-vehicle", label: "All Vehicle", icon: <FaCar /> },
    { path: "all-user", label: "All Users", icon: <FaCar /> },
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
                      ? "text-white border-white border-l-4 border-t-4 border-b-4 shimmer-border bg-lime-500 rounded-l-4xl font-bold  custom-outward-curve" // Apply shimmer border effect when active
                      : "text-white font-bold hover:bg-white rounded-l-4xl hover:text-lime-500"
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
