import React, { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";

// Demo user data
const userData = {
  profileImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  displayName: "Alex Johnson",
  username: "alexdev99",
  role: "Senior Developer",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
};

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const { changePassword } = useAuth();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    // Call the change password function
    changePassword(email, oldPassword, newPassword)
      .then(() => {
        // alert("Password changed successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        // alert("Failed to change password. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-cyan-100 p-6 flex flex-col items-center justify-start">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-3xl overflow-hidden mt-10 p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={userData.profileImage}
            alt={`${userData.displayName}'s profile`}
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            {userData.displayName}
          </h1>
          <p className="text-gray-500">@{userData.username}</p>
          <p className="text-gray-600">{userData.role}</p>
        </div>

        {/* Details Section */}
        <div className="mt-8 space-y-4">
          <Detail label="Email" value={userData.email} icon="📧" />
          <Detail label="Phone" value={userData.phone} icon="📱" />
          <Detail label="Username" value={userData.username} icon="👤" />
          <Detail label="Role" value={userData.role} icon="💼" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 px-8 rounded-full font-semibold hover:scale-105 transition-transform">
            Edit Profile
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition-all"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Change Password
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>

              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter old password"
                  />
                  <span
                    className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                  >
                    {showOldPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Enter new password"
                  />
                  <span
                    className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value, icon }) => (
  <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
    <span className="text-2xl mr-4">{icon}</span>
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-gray-800 break-words">{value}</p>
    </div>
  </div>
);

export default MyProfile;
