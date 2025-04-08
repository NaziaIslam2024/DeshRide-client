import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VehicleList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const response = await axios.get('http://localhost:5001/cars');
                setCars(response.data.cars || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching cars:', err);
            }
        };

        fetchAllCars();
    }, []);

    const handleStatusUpdate = async (carId, newStatus) => {
        try {
            const response = await axios.put('http://localhost:5001/cars/update-status', {
                carId,
                status: newStatus
            });
            
            setCars(cars.map(car => 
                car._id === carId ? { ...car, carStatus: newStatus } : car
            ));
            
            toast.success('Car status updated successfully!');
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error('Failed to update status');
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cars.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="text-center py-8">Loading vehicles...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">All Vehicles</h1>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name & Model</th>
                            <th className="py-3 px-4 text-left">Added By</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCars.map((car, index) => (
                            <tr 
                                key={car._id} 
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="py-3 px-4">
                                    <img 
                                        src={car.imageUrl} 
                                        alt={`${car.name} ${car.model}`} 
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-4 font-medium">{car.name} {car.model}</td>
                                <td className="py-3 px-4">{car.addedBy}</td>
                                <td className="py-3 px-4">${car.price}/day</td>
                                <td className="py-3 px-4">{car.carLocation}</td>
                                <td className="py-3 px-4">
                                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                                        car.carStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                                        car.carStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {car.carStatus}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleStatusUpdate(car._id, 'Approved')}
                                            className={`px-3 py-1 rounded text-sm font-medium ${
                                                car.carStatus === 'Approved' 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                            disabled={car.carStatus === 'Approved'}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(car._id, 'Rejected')}
                                            className={`px-3 py-1 rounded text-sm font-medium ${
                                                car.carStatus === 'Rejected' 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : 'bg-red-500 hover:bg-red-600 text-white'
                                            }`}
                                            disabled={car.carStatus === 'Rejected'}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <label className="text-sm">Items per page:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page when changing items per page
                        }}
                        className="select select-bordered select-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                    </select>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`btn btn-sm ${
                                currentPage === page ? 'btn-primary' : 'btn-outline'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline"
                    >
                        Next
                    </button>
                </div>

                <div className="text-sm">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, cars.length)} of {cars.length} vehicles
                </div>
            </div>
        </div>
    );
};

export default VehicleList;