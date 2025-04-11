import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
  FaCar,
  FaIdCard ,
  FaPhone,
  FaHome,
  FaUserShield,
  FaTools,
  FaShieldAlt,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { MdDirectionsCar, MdEmergency } from "react-icons/md";

const MyProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.email) {
          throw new Error("User email is not available");
        }
        const response = await axiosPublic.get(`/users/getUser/${user.email}`);
        setProfileData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-gray-500 text-5xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any profile data for your account.
          </p>
        </div>
      </div>
    );
  }

  // Role-based styling and sections
  const getRoleDetails = (role) => {
    switch (role) {
      case "provider":
        return {
          color: "from-blue-500 to-blue-600",
          icon: <FaUserTie className="text-4xl text-blue-100" />,
          title: "Service Provider",
          description: "You can offer services and manage your offerings",
        };
      case "consumer":
        return {
          color: "from-green-500 to-green-600",
          icon: <FaUser className="text-4xl text-green-100" />,
          title: "Consumer",
          description: "You can book services and manage your requests",
        };
      case "driver":
        return {
          color: "from-purple-500 to-purple-600",
          icon: <GiSteeringWheel className="text-4xl text-purple-100" />,
          title: "Driver",
          description: "You can provide driving services",
        };
      case "ownerDriver":
        return {
          color: "from-indigo-500 to-indigo-600",
          icon: <MdDirectionsCar className="text-4xl text-indigo-100" />,
          title: "Owner & Driver",
          description: "You own a vehicle and can provide driving services",
        };
      case "providerOnly":
        return {
          color: "from-amber-500 to-amber-600",
          icon: <FaTools className="text-4xl text-amber-100" />,
          title: "Service Provider Only",
          description: "You provide services but don't drive",
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          icon: <FaUser className="text-4xl text-gray-100" />,
          title: "User",
          description: "Standard user account",
        };
    }
  };

  const roleDetails = getRoleDetails(profileData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div
          className={`bg-gradient-to-r ${roleDetails.color} rounded-3xl shadow-xl overflow-hidden mb-8`}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <img
                src={
                  profileData.profileImage ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                }
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/80 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                {roleDetails.icon}
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profileData.fullName}
              </h1>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
                <span className="text-white font-semibold">
                  {profileData.role}
                </span>
              </div>
              <p className="text-white/90 max-w-lg">
                {roleDetails.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden col-span-1">
            <div className="bg-gray-800 p-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaUser className="mr-2" /> Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaIdCard className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-800">{profileData.fullName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-gray-800">{profileData.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaHome className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-800">
                    {profileData.address || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <MdEmergency className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Emergency Contact
                  </p>
                  <p className="text-gray-800">
                    {profileData.emergencyContact || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role-Specific Information */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden col-span-1">
            <div className={`bg-gradient-to-r ${roleDetails.color} p-6`}>
              <h2 className="text-xl font-bold text-white flex items-center">
                {roleDetails.icon} Role Details
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {profileData.role === "provider" && (
                <>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaTools className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Service Provider
                      </p>
                      <p className="text-gray-800">
                        You can offer various services
                      </p>
                    </div>
                  </div>
                </>
              )}

              {profileData.role === "consumer" && (
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Service Consumer
                    </p>
                    <p className="text-gray-800">
                      You can book and request services
                    </p>
                  </div>
                </div>
              )}

              {(profileData.role === "driver" ||
                profileData.role === "ownerDriver") && (
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <GiSteeringWheel className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Driver Status
                    </p>
                    <p className="text-gray-800">
                      {profileData.drivingLicense
                        ? `Licensed (${profileData.drivingLicense})`
                        : "No license provided"}
                    </p>
                  </div>
                </div>
              )}

              {(profileData.role === "providerOnly" ||
                profileData.role === "ownerDriver") && (
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <FaTools className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Service Provider
                    </p>
                    <p className="text-gray-800">
                      You can offer services to users
                    </p>
                  </div>
                </div>
              )}

              {/* NID Information */}
              {profileData.nid && (
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaIdCard className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      National ID
                    </p>
                    <p className="text-gray-800">{profileData.nid}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information (if applicable) */}
          {(profileData.hasCar || profileData.vehicleDetails) && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden col-span-1">
              <div className="bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaCar className="mr-2" /> Vehicle Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MdDirectionsCar className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Vehicle Details
                    </p>
                    <p className="text-gray-800">
                      {profileData.vehicleDetails || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaCar className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Model</p>
                    <p className="text-gray-800">
                      {profileData.vehicleModel || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <GiSteeringWheel className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-gray-800">
                      {profileData.vehicleType || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <FaShieldAlt className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Usage</p>
                    <p className="text-gray-800">
                      {profileData.carUsage || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to={"/Dashboard/edit-profile"} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
            Edit Profile
          </Link>

          {profileData.role === "provider" && (
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
              Manage Services
            </button>
          )}

          {profileData.role === "consumer" && (
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
              View Bookings
            </button>
          )}

          {(profileData.role === "driver" ||
            profileData.role === "ownerDriver") && (
            <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
              Driving Schedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
