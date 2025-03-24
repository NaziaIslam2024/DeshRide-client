import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Install with: npm install react-toastify
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axiosPublic.get('/users/all_users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await axios.delete(`http://localhost:5001/users/deleteUser/${selectedUserId}`);
      setUsers(users.filter(user => user._id !== selectedUserId));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    } finally {
      setShowConfirm(false);
      setSelectedUserId(null);
    }
  };

  const openDeleteConfirmation = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Users ({users.length})</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full bg-white border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Profile</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Role</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Address</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user._id} 
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
              >
                <td className="py-4 px-4">
                  <img
                    src={user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-4 text-gray-800 font-medium">{user.fullName}</td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4 text-gray-600">{user.phoneNumber}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.address || 'Not provided'}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => openDeleteConfirmation(user._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete user"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;