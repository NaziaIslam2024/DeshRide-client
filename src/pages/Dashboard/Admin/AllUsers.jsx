import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaExclamationTriangle, FaUserAlt, FaSpinner, FaEdit, FaUserEdit, FaChevronLeft, FaChevronRight, FaBackspace } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName }) => {
  const [animation, setAnimation] = useState(isOpen ? 'animate-in' : 'animate-out');

  useEffect(() => {
    setAnimation(isOpen ? 'animate-in' : 'animate-out');
  }, [isOpen]);

  if (!isOpen && animation === 'animate-out') return null;

  const handleClose = () => {
    setAnimation('animate-out');
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          animation === 'animate-in' ? 'opacity-60' : 'opacity-0'
        }`} 
        onClick={handleClose}
      ></div>
      <div 
        className={`bg-gradient-to-b from-white to-green-50 rounded-2xl shadow-2xl w-96 overflow-hidden transition-all duration-500 transform ${
          animation === 'animate-in' ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex justify-between items-center border-b-4 border-red-700">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-white text-xl mr-2 animate-pulse" />
            <h3 className="text-white font-bold text-lg">Confirm Deletion</h3>
          </div>
          <button 
            onClick={handleClose} 
            className="text-white hover:text-red-200 text-xl font-bold cursor-pointer w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all duration-300"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300">
              <FaTrash className="text-white text-4xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <p className="text-black text-lg animate-fadeIn">
              Are you sure you want to delete <span className="font-bold text-red-500">{userName}</span>?
            </p>
            <p className="text-red-500 text-sm mt-2">This action cannot be undone.</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleClose} 
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all flex items-center transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Modal for Role Editing
const EditRoleModal = ({ isOpen, onClose, onConfirm, user }) => {
  const [animation, setAnimation] = useState(isOpen ? 'animate-in' : 'animate-out');
  const [selectedRole, setSelectedRole] = useState(user?.role || '');
  const roleOptions = ['provider', 'consumer', 'driver', 'ownerDriver', 'providerOnly', 'admin'];

  useEffect(() => {
    setAnimation(isOpen ? 'animate-in' : 'animate-out');
    if (user) {
      setSelectedRole(user.role);
    }
  }, [isOpen, user]);

  if (!isOpen && animation === 'animate-out') return null;

  const handleClose = () => {
    setAnimation('animate-out');
    setTimeout(() => onClose(), 500);
  };

  const handleSubmit = () => {
    onConfirm(user._id, selectedRole);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          animation === 'animate-in' ? 'opacity-60' : 'opacity-0'
        }`} 
        onClick={handleClose}
      ></div>
      <div 
        className={`bg-gradient-to-b from-white to-green-50 rounded-2xl shadow-2xl w-96 overflow-hidden transition-all duration-500 transform ${
          animation === 'animate-in' ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 rotate-1'
        }`}
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center border-b-4 border-green-700">
          <div className="flex items-center">
            <FaUserEdit className="text-white text-xl mr-2" />
            <h3 className="text-white font-bold text-lg">Edit User Role</h3>
          </div>
          <button 
            onClick={handleClose} 
            className="text-red-500 text-xl font-bold cursor-pointer w-8 h-8 rounded-full bg-white  flex items-center justify-center transition-all duration-300"
          >
            <FaBackspace></FaBackspace>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4 text-center">
              Change role for <span className="font-bold text-green-600">{user?.fullName}</span>
            </p>
            
            <div className="relative group">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white transition-all duration-300 appearance-none shadow-sm"
              >
                {roleOptions.map(role => (
                  <option key={role} value={role} className="py-2">
                    {role}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 text-green-500 pointer-events-none transition-transform duration-300 group-hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button 
              onClick={handleClose} 
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <FaEdit className="mr-2" /> Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add some CSS animations
const animationCSS = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const axiosPublic = useAxiosPublic();
  
  const usersPerPage = 15; // Changed to 15 users per page

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
    setTimeout(() => setUserToDelete(null), 500);
  };

  const openEditRoleModal = (user) => {
    setUserToEdit(user);
    setEditRoleModalOpen(true);
  };

  const closeEditRoleModal = () => {
    setEditRoleModalOpen(false);
    setTimeout(() => setUserToEdit(null), 500);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await axiosPublic.delete(`/users/deleteUser/${userToDelete._id}`);
      setUsers(users.filter(user => user._id !== userToDelete._id));
      toast.success('User deleted successfully!');
      closeDeleteModal();
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosPublic.put(`/users/updateRole/${userId}`, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('Role updated successfully!');
    } catch (error) {
      toast.error(`Error updating role: ${error.message}`);
    }
  };

  const handleRowHover = (index) => {
    setSelectedRow(index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRoleBadgeStyle = (role) => {
    switch(role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'provider':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'consumer':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'driver':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ownerDriver':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'providerOnly':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <style>{animationCSS}</style>
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center animate-slideUp">
        <FaSpinner className="text-5xl text-green-500 animate-spin mb-4" />
        <p className="text-lg text-gray-700">Loading users...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center  bg-green-50">
      <style>{animationCSS}</style>
      <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-slideUp max-w-md">
        <div className="text-red-500 text-5xl mb-4">
          <FaExclamationTriangle className="mx-auto" />
        </div>
        <h2 className="text-xl text-red-600 mb-4">Error: {error}</h2>
        <button 
          onClick={fetchAllUsers} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
        >
          <FaSpinner className="mr-2" /> Retry
        </button>
      </div>
    </div>
  );

  if (users.length === 0) return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <style>{animationCSS}</style>
      <div className="text-center bg-white p-8 rounded-xl shadow-lg animate-slideUp">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <FaUserAlt className="text-3xl text-green-500" />
        </div>
        <h2 className="text-xl text-gray-700 mb-3">No Users Found</h2>
        <p className="text-gray-500">There are currently no users in the system.</p>
      </div>
    </div>
  );

  return (
    <div className=" bg-green-50 min-h-screen">
      <style>{animationCSS}</style>
      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.fullName}
      />
      
      <EditRoleModal
        isOpen={editRoleModalOpen}
        onClose={closeEditRoleModal}
        onConfirm={handleRoleChange}
        user={userToEdit}
      />
      
      <div className="">
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 p-6  text-white shadow-lg">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="mt-2">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} in the system
            {filteredUsers.length > usersPerPage && ` (Showing ${indexOfFirstUser + 1}-${Math.min(indexOfLastUser, filteredUsers.length)} of ${filteredUsers.length})`}
          </p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 m-6">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by name, email or role..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white transition-all duration-300 shadow-sm"
            />
            <div className="absolute left-3 top-3 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 gap-2">
            <span>Total Users:</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{users.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-green-100 m-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <th className="py-4 px-6 text-left">S/N</th>
                  <th className="py-4 px-6 text-left">Profile</th>
                  <th className="py-4 px-6 text-left">Name</th>
                  <th className="py-4 px-6 text-left">Email</th>
                  <th className="py-4 px-6 text-left">Phone</th>
                  <th className="py-4 px-6 text-left">Role</th>
                  <th className="py-4 px-6 text-left">Address</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className={`border-b transition-all duration-300 ${
                      selectedRow === index ? 'bg-green-50' : index % 2 === 0 ? 'bg-white' : 'bg-green-50/50'
                    }`}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(null)}
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">{indexOfFirstUser + index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="relative group">
                        <img
                          src={user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-300 group-hover:border-green-500 transition-all duration-300 shadow-sm group-hover:shadow-md"
                        />
                        <div className="absolute inset-0 bg-green-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-medium">{user.fullName}</td>
                    <td className="py-4 px-6 text-gray-800">{user.email}</td>
                    <td className="py-4 px-6 text-gray-800">{user.phoneNumber || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getRoleBadgeStyle(user.role)} font-medium transition-all duration-300 hover:shadow-md`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-800 truncate max-w-xs">{user.address || 'Not provided'}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openEditRoleModal(user)}
                          className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-sm hover:shadow-md"
                          title="Edit Role"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          disabled={isDeleting}
                          className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-sm hover:shadow-md"
                          title="Delete User"
                        >
                          {isDeleting && userToDelete?._id === user._id ? (
                            <FaSpinner className="text-lg animate-spin" />
                          ) : (
                            <FaTrash className="text-lg" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* No Results */}
          {filteredUsers.length === 0 && searchTerm && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-500">No users match your search criteria</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center p-6">
              <div className="inline-flex items-center rounded-lg bg-white shadow-md overflow-hidden border border-green-100">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-3 flex items-center ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-green-600 hover:bg-green-50'
                  } transition-colors duration-300 border-r border-green-100`}
                >
                  <FaChevronLeft className="mr-1" /> Prev
                </button>
                
                <div className="flex border-r border-green-100">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Create a window of pages centered on the current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center transition-all duration-300 ${
                          currentPage === pageNum 
                            ? 'bg-green-500 text-white font-medium' 
                            : 'text-gray-700 hover:bg-green-50'
                        } ${i < Math.min(5, totalPages) - 1 ? 'border-r border-green-100' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-3 flex items-center ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-green-600 hover:bg-green-50'
                  } transition-colors duration-300`}
                >
                  Next <FaChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;