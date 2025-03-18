import React from 'react';

// Demo user data
const userData = {
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  displayName: 'Alex Johnson',
  role: 'Senior Developer',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567'
};

const MyProfile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-cyan-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500  to-red-500 p-8 text-center relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-black/50"></div>
          
          {/* Profile Image */}
          <img 
            src={userData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white mx-auto mb-4 transform transition-all hover:scale-110 hover:rotate-2"
          />
          
          {/* Display Name and Role */}
          <h1 className="text-white text-3xl font-bold relative z-10">{userData.displayName}</h1>
          <p className="text-white/90 text-lg mt-2 relative z-10">{userData.role}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Email */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-purple-600">📧</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="text-gray-800 break-words">{userData.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
            <span className="text-2xl mr-4 text-cyan-500">📱</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Phone</p>
              <p className="text-gray-800">{userData.phone}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <button className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;