import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaExclamationTriangle, FaUserAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {
  const [animation, setAnimation] = useState(isOpen ? 'animate-in' : 'animate-out');
  
  useEffect(() => {
    if (isOpen) {
      setAnimation('animate-in');
    } else {
      setAnimation('animate-out');
    }
  }, [isOpen]);

  if (!isOpen && animation === 'animate-out') return null;

  const handleClose = () => {
    setAnimation('animate-out');
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          animation === 'animate-in' ? 'opacity-50' : 'opacity-0'
        }`} 
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div 
        className={`bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-2xl w-96 overflow-hidden transition-all duration-500 transform ${
          animation === 'animate-in' 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-background-light-100 text-xl mr-2" />
            <h3 className="text-background-light-100 font-bold text-lg">Confirm Deletion</h3>
          </div>
          <span 
            onClick={handleClose}
            className="text-background-light-100 hover:text-white text-xl font-bold transition-all duration-300"
          >
            ×
          </span>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-200  rounded-full flex items-center justify-center shadow-lg overflow-hidden group">
              <div className="absolute inset-0  opacity-0  group-hover:opacity-100 transition-opacity duration-500"></div>
              <FaTrash className="text-red-500 hover:text-red-500  text-4xl relative z-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <p className="text-red-800 text-lg">
              Are you sure you want to delete <span className="font-bold text-red-500">{userName}</span>?
            </p>
            <p className="text-red-500 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTimeout(() => setUserToDelete(null), 300);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5001/users/deleteUser/${userToDelete._id}`);
      
      // Update UI without reloading
      setUsers(users.filter(user => user._id !== userToDelete._id));
      
      toast.success('User deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-primary-light-100 text-primary-dark-800',
      });
      
      closeDeleteModal();
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRowHover = (index) => {
    setSelectedRow(index);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-background-light-100 to-background-light-200">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary-light-300 border-opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-dark-500 animate-spin"></div>
        </div>
        <p className="mt-4 text-primary-dark-600 text-lg font-medium animate-pulse">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-background-light-100 to-background-light-200">
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Users</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={fetchAllUsers}
            className="px-6 py-2 bg-gradient-to-r from-primary-dark-400 to-primary-dark-500 text-white rounded-full hover:from-primary-dark-500 hover:to-primary-dark-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center w-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-background-light-100 to-background-light-200">
        <div className="w-24 h-24 bg-background-light-200 rounded-full flex items-center justify-center mb-4">
          <FaUserAlt className="text-primary-dark-400 text-4xl opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-primary-dark-700 mb-2">No Users Found</h2>
        <p className="text-primary-dark-500">The user database appears to be empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-background-light-50 to-background-light-100 min-h-screen">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.fullName}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-dark-400 to-primary-dark-500 p-6 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 rounded-full transform scale-150 translate-x-1/2 -translate-y-1/4"></div>
          <h1 className="text-3xl font-bold text-white relative z-10">User Management</h1>
          <p className="text-background-light-100 mt-2 relative z-10">{users.length} {users.length === 1 ? 'user' : 'users'} in the system</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-dark-600 to-primary-dark-500 text-white">
                  <th className="py-4 px-6 text-left text-sm font-semibold">Profile</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold">Name</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold">Email</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold">Phone</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold">Role</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold">Address</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className={`border-b border-background-light-200 ${
                      selectedRow === index ? 'bg-primary-light-100' : index % 2 === 0 ? 'bg-white' : 'bg-background-light-50'
                    } transition-colors duration-300`}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(null)}
                  >
                    <td className="py-4 px-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-light-200 border-2 border-primary-light-300 shadow-md transition-transform duration-300 transform hover:scale-110">
                        <img
                          src={user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-black font-medium">{user.fullName}</td>
                    <td className="py-4 px-6 text-black">{user.email}</td>
                    <td className="py-4 px-6 text-black">{user.phoneNumber || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        user.role === 'admin' 
                          ? 'bg-primary-light-100 text-primary-dark-700 border border-primary-light-300' 
                          : 'bg-accent-light-100 text-accent-light-700 border border-accent-light-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-black truncate max-w-xs">{user.address || 'Not provided'}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openDeleteModal(user)}
                        disabled={isDeleting}
                        className="w-10 h-10 flex items-center justify-center bg-white text-red-400 hover:text-white hover:bg-red-500 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg group"
                        title="Delete user"
                      >
                        {isDeleting && userToDelete?._id === user._id ? (
                          <FaSpinner className="text-lg animate-spin" />
                        ) : (
                          <FaTrash className="text-lg group-hover:animate-pulse" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;