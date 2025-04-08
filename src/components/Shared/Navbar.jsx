import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom"; // Changed Link to NavLink for active state
import { AuthContext } from "../../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Common links for the center menu
  const CenterNavLinks = ({ mobile = false }) => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
            isActive ? "underline underline-offset-8 text-primary-light-700" : "hover:underline underline-offset-8"
          }`
        }
        onClick={() => mobile && setIsMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
            isActive ? "underline underline-offset-8 text-primary-light-700" : "hover:underline underline-offset-8"
          }`
        }
        onClick={() => mobile && setIsMenuOpen(false)}
      >
        About
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
              isActive ? "underline underline-offset-8 text-primary-light-700" : "hover:underline underline-offset-8"
            }`
          }
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Dashboard
        </NavLink>
      )}

{user && (
        <NavLink
          to="/workflow"
          className={({ isActive }) =>
            `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
              isActive ? "underline underline-offset-8 text-primary-light-700" : "hover:underline underline-offset-8"
            }`
          }
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Workflow
        </NavLink>
      )}
    </>
  );

  // Right-side links (Logout or Login/Register)
  const RightNavLinks = ({ mobile = false }) => (
    <>
      {user ? (
        <Link
          to="/login"
          onClick={() => {
            logOut();
            mobile && setIsMenuOpen(false);
          }}
          className={`${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5 bg-primary-light-500 text-white"} hover:bg-primary-light-700 hover:text-white rounded-lg transition-colors`}
        >
          Logout
        </Link>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
                isActive ? "bg-primary-light-500 text-white" : "hover:bg-primary-light-500 hover:text-white"
              }`
            }
            onClick={() => mobile && setIsMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${mobile ? "block py-3 px-4" : "text-sm font-semibold py-2 px-5"} rounded-lg transition-colors ${
                isActive ? "bg-primary-light-500 text-white" : "hover:bg-primary-light-500 hover:text-white"
              }`
            }
            onClick={() => mobile && setIsMenuOpen(false)}
          >
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background-light-100/90 backdrop-blur-md shadow-sm" : "bg-background-light-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="navbar">
          {/* Logo and Mobile Menu Button */}
          <div className="navbar-start">
            <div className="flex items-center">
              <button
                className="btn btn-ghost lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-5 w-5 transition-transform duration-300 rotate-180" />
                ) : (
                  <FaBars className="h-5 w-5 transition-transform duration-300" />
                )}
              </button>
              <Link to="/" className=" flex justify-center items-center text-xl">
                <img
                  src="https://i.ibb.co.com/chGxPSCm/Copy-of-Desh-Ride-logo.png"
                  alt="Desh Ride Logo"
                  className="w-14 h-14"
                />
                <span className="ml-2">Desh Ride</span>
              </Link>
            </div>
          </div>

          {/* Center Navigation (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">
              <CenterNavLinks />
            </ul>
          </div>

          {/* Right Navigation (Desktop) */}
          <div className="navbar-end hidden lg:flex space-x-2">
            <RightNavLinks />
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden"
              >
                <div className="flex flex-col p-4 space-y-2">
                  <CenterNavLinks mobile={true} />
                  <RightNavLinks mobile={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;