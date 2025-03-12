import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="mb-4 text-center">
      <Link to="/" className="mx-2">
        Home
      </Link>
      <Link to="/dashboard" className="mx-2">
        Dashboard
      </Link>
      <Link to="/login" className="mx-2">
        Login
      </Link>
      <Link to="/register" className="mx-2">
        Register
      </Link>
    </div>
  );
};

export default Navbar;
