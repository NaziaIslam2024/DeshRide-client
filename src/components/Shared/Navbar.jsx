import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  // const links = (
  //   <>
  //     <li>
  //       <Link to="/" className="mx-2">
  //         Home
  //       </Link>
  //     </li>
  //     <li>
  //       <Link to="/dashboard" className="mx-2">
  //         Dashboard
  //       </Link>
  //     </li>

  //     {!user ? (
  //       <li>
  //         <button onClick={logOut} className="mx-2">
  //           Logout
  //         </button>
  //       </li>
  //     ) : (
  //       <>
  //         <li>
  //           <Link to="/login" className="mx-2">
  //             Login
  //           </Link>
  //         </li>
  //         <li>
  //           <Link to="/register" className="mx-2">
  //             Register
  //           </Link>
  //         </li>
  //       </>
  //     )}
  //   </>
  // );
  return (
    <div className="text-center bg-[#4445fb]  text-white shadow-sm ">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-4"
            >
              <button className="btn py-2 px-5 rounded-4xl">
                Become a Host
              </button>
              <button className="btn py-2 px-5 rounded-4xl">Get the App</button>
              <button className="btn py-2 px-5 rounded-4xl">Login</button>
              <button className="btn py-2 px-5 rounded-4xl">SignUp</button>
              {/* {links} */}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Deshi Ride</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {
              // links
            }
          </ul>
        </div>
        <div className="navbar-end gap-5 hidden lg:flex">
          <Link
            to={"/"}
            className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
          >
            Home
          </Link>
          {/* <Link
            to={""}
            className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
          >
            Join Now
          </Link> */}
          {user ? (
            <>
              <Link
                to={"#"}
                className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
              >
                Join Now
              </Link>
              <Link
                to={"/login"}
                onClick={logOut}
                className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn bg-transparent text-white py-2 px-5 rounded-4xl"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
