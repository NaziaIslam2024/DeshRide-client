import React, { useContext } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router";
import { BsPass } from "react-icons/bs";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex justify-center items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-primary"
            />
            <div>
              <h2 className="text-xl font-bold">Name : {user?.displayName}</h2>
              <p className="text-gray-600">Email : {user?.email}</p>
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-4 flex gap-1">
            <Link to="/update-profile">
              <button className="btn btn-primary w-full flex items-center justify-center gap-2">
                <FaUserEdit />
                Update Profile
              </button>
            </Link>
            <Link to="/reset-password">
              <button className="btn btn-primary w-full flex items-center justify-center gap-2">
                <BsPass />
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
