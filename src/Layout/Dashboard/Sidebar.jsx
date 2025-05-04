/* eslint-disable react/prop-types */
import {
  FaTachometerAlt,
  FaHome,
  FaCar,
  FaUser,
  FaUsers,
  FaPlusCircle,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  userRole = "consumer",
  isMobile,
}) => {
  const allNavItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      roles: ["admin", "providerOnly", "consumer", "driver", "ownerDriver"],
    },
    {
      path: "/",
      label: "Home",
      icon: <FaHome />,
      roles: ["admin", "providerOnly", "consumer", "driver", "ownerDriver"],
    },
    {
      path: "my-profile",
      label: "My Profile",
      icon: <FaUser />,
      roles: ["admin", "providerOnly", "consumer", "driver", "ownerDriver"],
    },
    {
      path: "/rent-a-car",
      label: "Rent a car",
      icon: <FaCar />,
      roles: ["consumer"],
    },
    {
      path: "all-listed-cars",
      label: "Cars",
      icon: <FaCar />,
      roles: ["consumer"],
    },
    {
      path: "whatsapp",
      label: "Chat",
      icon: <FaCar />,
      roles: ["consumer"],
    },
    {
      path: "my-rent-status",
      label: "My Rent",
      icon: <FaCar />,
      roles: ["consumer"],
    },
    {
      path: "add-car",
      label: "Add Car",
      icon: <FaPlusCircle />,
      roles: ["ownerDriver"],
    },
    {
      path: "vehicle",
      label: "My Vehicles",
      icon: <FaCar />,
      roles: ["ownerDriver"],
    },
    {
      path: "my-rentals",
      label: "My Rentals",
      icon: <FaCar />,
      roles: ["ownerDriver"],
    },
    {
      path: "vehicle",
      label: "My Vehicles",
      icon: <FaCar />,
      roles: ["providerOnly"],
    },
    {
      path: "add-car",
      label: "Add Car",
      icon: <FaPlusCircle />,
      roles: ["providerOnly"],
    },
    {
      path: "my-car-status",
      label: "My Car Status",
      icon: <FaCar />,
      roles: ["providerOnly"],
    },
    {
      path: "all-user",
      label: "All Users",
      icon: <FaUsers />,
      roles: ["admin"],
    },
    {
      path: "all-cars",
      label: "All Cars",
      icon: <FaCar />,
      roles: ["admin"],
    },
    {
      path: "adv-cars",
      label: "Advertise Cars",
      icon: <FaCar />,
      roles: ["admin"],
    },
  ];

  const navItems = allNavItems.filter((item) =>
    item.roles.some(
      (role) => role.toLowerCase() === (userRole || "consumer").toLowerCase()
    )
  );

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-teal-800 to-teal-600 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-xl`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-[22.6px] flex items-center justify-between border-b border-teal-500">
          <Link to="/">
            <h1
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } text-xl font-semibold text-white`}
            >
              DeshRide
            </h1>
          </Link>
          <button
            className="p-2 rounded-md hover:bg-teal-500 transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <FaBars className="text-lg text-white" />
          </button>
        </div>
        <ul className="mt-4 space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => isMobile && !isSidebarOpen && toggleSidebar()}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                    isSidebarOpen
                      ? isActive
                        ? "bg-teal-400 text-white font-medium"
                        : "text-teal-100 hover:bg-teal-500 hover:text-white"
                      : isActive
                      ? "bg-teal-400 text-white font-medium justify-center"
                      : "text-teal-200 hover:bg-teal-500 hover:text-white justify-center"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`${
                    isSidebarOpen ? "block" : "hidden"
                  } text-sm font-medium`}
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
