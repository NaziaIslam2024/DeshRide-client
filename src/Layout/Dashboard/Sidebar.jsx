/* eslint-disable react/prop-types */
import { FaTachometerAlt, FaHome, FaCar, FaUser, FaUsers, FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar, userRole = 'consumer' }) => {

  console.log(userRole);
  // Define all possible navigation items
  const allNavItems = [
    // Common routes for all roles
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt />, roles: ['admin', 'provider', 'consumer'] },
    { path: "/", label: "Home", icon: <FaHome />, roles: ['admin', 'provider', 'consumer'] },
    { path: "my-profile", label: "My Profile", icon: <FaUser />, roles: ['admin', 'provider', 'consumer'] },
    
    // Provider-specific routes
    { path: "vehicle", label: "My Vehicles", icon: <FaCar />, roles: ['provider'] },
    { path: "add-car", label: "Add Car", icon: <FaPlusCircle />, roles: ['provider'] },
    
    // Admin-specific routes
    { path: "all-vehicle", label: "All Vehicles", icon: <FaCar />, roles: ['admin'] },
    { path: "all-user", label: "All Users", icon: <FaUsers />, roles: ['admin'] },
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item => 
    item.roles.some(role => role.toLowerCase() === (userRole || 'consumer').toLowerCase())
  );

  return (
    <div 
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-[calc(100vh-104px)] overflow-hidden`}
    >
      <div className="pl-4 mt-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={toggleSidebar}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 text-lg transition-all duration-200 ${
                    isActive
                      ? "text-white border-white border-l-4 border-t-4 border-b-4 shimmer-border bg-lime-500 rounded-l-4xl font-bold custom-outward-curve"
                      : "text-white font-bold hover:bg-white rounded-l-4xl hover:text-lime-500"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${isSidebarOpen ? "block" : "hidden md:block"}`}>
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