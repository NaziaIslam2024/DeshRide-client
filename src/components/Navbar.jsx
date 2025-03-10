/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); // Reference to the modal container

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const list = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/page_01">Page-01</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/page_02">Page-02</NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed w-full z-50">
      <div className="bg-slate-300">
        <div className="navbar w-11/12 mx-auto">
          {/* Navbar start */}
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {list}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              Project Name
            </Link>
          </div>

          {/* Navbar center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{list}</ul>
          </div>

          {/* Navbar end */}
          <div className="navbar-end">
            <div>
              {user && user?.email ? (
                <div className="flex items-center gap-5 relative">
                  <img
                    className="w-12 h-12 rounded-full transition-transform duration-200 ease-in-out active:scale-90 cursor-pointer object-cover border-2 border-[#1e3c72]"
                    src={user?.photoURL}
                    alt="Error"
                    onClick={toggleModal}
                  />
                  {isModalOpen && (
                    <div
                      ref={modalRef} // Attach reference to the modal
                      className="absolute top-full -right-8 px-6 mt-2 bg-white shadow-md rounded-lg p-2 z-50 transform -translate-x-1"
                    >
                      <p className="text-center font-semibold">
                        {user?.displayName}
                      </p>
                      <small>{user?.email}</small>

                      <button
                        onClick={() => {
                          logOut();
                          toast.success("Logged out successfully!", {
                            position: "top-left",
                            autoClose: 2000,
                            pauseOnHover: true,
                          });
                        }}
                        className="btn btn-neutral w-full mt-3"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link
                    to="/auth/login"
                    className="btn bg-[#162c57cd] hover:bg-[#162c57cd]"
                  >
                    SignIn
                  </Link>
                  <Link
                    to="/auth/register"
                    className="btn bg-[#162c57cd] hover:bg-[#162c57cd]"
                  >
                    SignUp
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
