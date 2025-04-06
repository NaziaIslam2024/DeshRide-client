import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Message from '../../Message/message';
import AdminMessages from '../../Message/AdminMessages';

const MyProfile = () => {
  const { user } = useAuth(); // Get the authenticated user's email from the useAuth hook
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()

  console.log(profileData);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.email) {
          throw new Error('User email is not available');
        }

        // Fetch user data from the backend
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-cyan-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-500 p-8 text-center relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-black/50"></div>
          
          {/* Profile Image */}
          <img 
            src={profileData.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white mx-auto mb-4 transform transition-all hover:scale-110 hover:rotate-2"
          />
          
          {/* Display Name and Role */}
          <h1 className="text-white text-3xl font-bold relative z-10">{profileData.fullName}</h1>
          <p className="text-white/90 text-lg mt-2 relative z-10">{profileData.role}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-purple-600">📧</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="text-gray-800 break-words">{profileData.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-cyan-500">📱</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Phone</p>
              <p className="text-gray-800">{profileData.phoneNumber}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-green-500">🏠</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Address</p>
              <p className="text-gray-800">{profileData.address || 'Not provided'}</p>
            </div>
          </div>

          {/* User Role */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-blue-500">👤</span>
            <div>
              <p className="text-xs uppercase text-gray-500">User Role</p>
              <p className="text-gray-800">{profileData.role}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <button 
            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            onClick={() => {
              // Add functionality to edit profile
              console.log('Edit Profile clicked');
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mt-10 w-full max-w-md">
        {/* Here we pass the user's _id and role as props to the Message component */}
        <Message userId={profileData._id} role={profileData.role} />
      </div>
      {profileData.role === 'admin' && (
        <div className="mt-10 w-full max-w-md">

          <AdminMessages></AdminMessages>
        </div>
      )}
      {/* Admin Messages Section */}
     
    </div>
  );
};

export default MyProfile;