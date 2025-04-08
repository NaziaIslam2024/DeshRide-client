import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllListedCars = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2); // Temporary lower value for testing
    const pageSizeOptions = [4, 8, 12, 16, 24];
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        minSeats: '',
        features: []
    });
    const [filterOptions, setFilterOptions] = useState({
        types: [],
        locations: [],
        allFeatures: []
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false); // New state for collapsible filters

    useEffect(() => {
        const fetchApprovedCars = async () => {
            try {
                const response = await axios.get('http://localhost:5001/cars');

                const approvedCars = response.data.cars.filter(car => car.carStatus === 'Approved');

                setCars(approvedCars || []);
                setFilteredCars(approvedCars || []);
                let result = [...approvedCars];
                if (filters.type) result = result.filter(car => car.type === filters.type);
                if (filters.minPrice) result = result.filter(car => car.price >= Number(filters.minPrice));
                if (filters.maxPrice) result = result.filter(car => car.price <= Number(filters.maxPrice));
                if (filters.location) result = result.filter(car => car.carLocation === filters.location);
                if (filters.minSeats) result = result.filter(car => car.seats >= Number(filters.minSeats));
                if (filters.features.length > 0) {
                    result = result.filter(car => filters.features.every(feature => car.features.includes(feature)));
                }
                setFilteredCars(result);
                const types = [...new Set(approvedCars.map(car => car.type))];
                const locations = [...new Set(approvedCars.map(car => car.carLocation))];
                const allFeatures = [...new Set(approvedCars.flatMap(car => car.features))];
                setFilterOptions({ types, locations, allFeatures });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching cars:', err);
            }
        };
        fetchApprovedCars();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, cars]);

    const applyFilters = () => {
        let result = [...cars];
        if (filters.type) result = result.filter(car => car.type === filters.type);
        if (filters.minPrice) result = result.filter(car => car.price >= Number(filters.minPrice));
        if (filters.maxPrice) result = result.filter(car => car.price <= Number(filters.maxPrice));
        if (filters.location) result = result.filter(car => car.carLocation === filters.location);
        if (filters.minSeats) result = result.filter(car => car.seats >= Number(filters.minSeats));
        if (filters.features.length > 0) {
            result = result.filter(car => filters.features.every(feature => car.features.includes(feature)));
        }
        setFilteredCars(result);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureToggle = (feature) => {
        setFilters(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const resetFilters = () => {
        setFilters({ type: '', minPrice: '', maxPrice: '', location: '', minSeats: '', features: [] });
    };

    const toggleFilter = () => {
        setIsFilterOpen(prev => !prev);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
   

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const PaginationControls = () => {
       
        // if (totalPages <= 1) return null; // Comment out for debugging

        const getPageNumbers = () => {
            const pageNumbers = [];
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push('ellipsis-start');
            }
            for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push('ellipsis-end');
                pageNumbers.push(totalPages);
            }
            return pageNumbers;
        };

        const pageNumbers = getPageNumbers();

        return (
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white rounded-lg shadow-md mt-6 mb-6">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <span className="text-sm text-gray-600 font-medium">
                        Showing {filteredCars.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredCars.length)} of {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
                    </span>
                    <div className="flex items-center">
                        <label className="text-sm text-gray-600 mr-2">Per Page:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="p-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => paginate(1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ease-in-out"
                        aria-label="First Page"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M8.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ease-in-out"
                        aria-label="Previous Page"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {pageNumbers.map((pageNumber, index) =>
                        pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 text-sm"
                            >
                                …
                            </span>
                        ) : (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                    currentPage === pageNumber
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={currentPage === pageNumber ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ease-in-out"
                        aria-label="Next Page"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(totalPages)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ease-in-out"
                        aria-label="Last Page"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M11.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L15.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    if (loading) return <div className="text-center py-8">Loading cars...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">All Listed Cars</h1>
            <div className="bg-gray-50 p-4 mb-8 rounded-lg shadow">
                {/* Filter Toggle Button for Mobile */}
                <div className="flex justify-between items-center md:hidden">
                    <h2 className="text-xl font-semibold">Filter Options</h2>
                    <button
                        onClick={toggleFilter}
                        className="text-green-600 focus:outline-none"
                        aria-label={isFilterOpen ? 'Close Filters' : 'Open Filters'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Filter Section - Hidden on mobile by default, visible on larger screens */}
                <div
                    className={`mt-4 md:mt-0 ${isFilterOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}
                >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">All Types</option>
                                {filterOptions.types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range ($/day)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <select
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">All Locations</option>
                                {filterOptions.locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Seats</label>
                            <select
                                name="minSeats"
                                value={filters.minSeats}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Any</option>
                                {[2, 4, 5, 7, 8, 10].map(seat => (
                                    <option key={seat} value={seat}>{seat}+ seats</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.allFeatures.map(feature => (
                                    <button
                                        key={feature}
                                        onClick={() => handleFeatureToggle(feature)}
                                        className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                                            filters.features.includes(feature) ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                    >
                                        {feature}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            onClick={resetFilters}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
            {filteredCars.length > 0 && <PaginationControls />}
            {filteredCars.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg shadow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-600 mb-2">No cars match your filter criteria</p>
                    <p className="text-gray-500 mb-4">Try adjusting your filters to find more cars</p>
                    <button
                        onClick={resetFilters}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentCars.map((car) => (
                        <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="h-48 overflow-hidden">
                                <img src={car.imageUrl} alt={`${car.name} ${car.model}`} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{car.name} {car.model}</h2>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Type</p>
                                        <p className="font-medium">{car.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Price</p>
                                        <p className="font-medium">${car.price}/day</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-medium">{car.carLocation}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Seats</p>
                                        <p className="font-medium">{car.seats}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <p className="text-sm text-gray-600">Features</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {car.features.map((feature, index) => (
                                            <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {filteredCars.length > 0 && <PaginationControls />}
        </div>
    );
};

export default AllListedCars;