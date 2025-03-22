import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/users/all_users'); // Use the full backend URL
      console.log('API Response:', response.data); 
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAllUsers();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found. {users.length}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users {users.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <img
              src={user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
              alt={user.fullName}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{user.fullName}</h2>
            <p className="text-gray-600 text-center">{user.role}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">role:</span> {user.role}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {user.address || 'Not provided'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;