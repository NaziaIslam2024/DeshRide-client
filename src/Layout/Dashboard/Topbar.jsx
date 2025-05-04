/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo/DeshRideLogo.png";
import useAuth from "../../hooks/useAuth";

const TopBar = ({ toggleSidebar, isSidebarOpen, userRole, user, logOut }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentNews, setCurrentNews] = useState(0);
  const [imageError, setImageError] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const newsItems = [
    "🚀 New Ride Options Available Near You!",
    "⏰ Save Time — Book Rides Faster Than Ever!",
    "🎉 Special Discount on First Ride — Grab It Now!",
    "📅 Plan Ahead: Pre-Book Your Ride for Tomorrow!",
    "🔔 New Driver Signups Open — Earn Extra Income!",
    "🔧 App Update: Smoother, Faster, Better!",
    "📝 Safety First: New Guidelines for Safer Rides!",
    "🔍 Explore: Affordable Car Rentals Now Available!",
    "🗣️ Refer a Friend & Earn Rewards!",
    "✅ Verified Drivers for a Trustworthy Experience!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "G";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div className="h-auto w-full flex items-center justify-between px-6 py-4 shadow-md bg-teal-900 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <motion.div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-14 md:h-14 object-contain" />
        </motion.div>
        <motion.button
          onClick={toggleSidebar}
          className={`text-teal-100 focus:outline-none md:hidden p-2 rounded-full transition-all duration-300 ${
            isSidebarOpen ? "bg-teal-800" : ""
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8, rotate: 180 }}
          aria-label="Toggle Sidebar"
        >
          <motion.div
            key={isSidebarOpen ? "close" : "menu"}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ rotate: -360, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {isSidebarOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </motion.div>
        </motion.button>
      </div>

      <div className="hidden md:flex flex-1 mx-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full px-4 py-2 rounded-full bg-teal-800 text-teal-100 placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-300" />
        </div>
      </div>

      <div className="hidden md:flex flex-1 mx-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNews}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-medium text-teal-100 text-center w-full"
          >
            {newsItems[currentNews]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="text-teal-100 text-xl focus:outline-none hover:bg-teal-800 p-2 rounded-full transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>

        <motion.div
          ref={profileRef}
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-teal-300 transition-all duration-300 hover:border-teal-400">
              {imageError || !user?.photoURL ? (
                <div className="w-full h-full bg-teal-600 flex items-center justify-center text-teal-100 text-xl md:text-2xl font-bold">
                  {getInitial(user?.displayName)}
                </div>
              ) : (
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="hidden md:flex">
              <div className="text-teal-100 text-center md:text-left">
                <p className="text-sm md:text-lg font-medium">
                  {user?.displayName || "Guest User"}
                </p>
                {user?.email && (
                  <p className="text-xs md:text-sm font-light">{user.email}</p>
                )}
              </div>
            </div>
          </button>
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-48 bg-teal-800 rounded-lg shadow-xl z-50 border border-teal-700"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-teal-100">
                    {user?.displayName || "Guest User"}
                  </p>
                  <p className="text-xs text-teal-300">
                    {userRole || "Consumer"}
                  </p>
                  <div className="mt-2 space-y-1">
                    <Link
                      to="dashboard/my-profile"
                      className="block text-sm text-teal-100 hover:bg-teal-700 p-2 rounded-lg transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="w-full text-left text-sm text-teal-100 hover:bg-teal-700 p-2 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          ref={notificationRef}
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="text-teal-100 text-xl focus:outline-none relative hover:bg-teal-800 p-2 rounded-full transition-colors duration-300"
          >
            <FaBell />
            <span className="absolute top-0 right-0 z-10 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-64 bg-teal-800 rounded-lg shadow-xl z-50 border border-teal-700"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-teal-100">
                    Notifications
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 bg-teal-700 rounded-lg hover:bg-teal-600 transition-colors duration-200">
                      <p className="text-xs text-teal-100">
                        You have 3 new tasks.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TopBar;
