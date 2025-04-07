import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosPublic.get('cars'); 
        setCars(response.data.cars);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [axiosPublic]);

  // Get unique car types for filter tabs
  const carTypes = ['all', ...new Set(cars.map(car => car.type))];

  // Filter cars based on active tab
  const filteredCars = activeTab === 'all' 
    ? cars 
    : cars.filter(car => car.type === activeTab);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 border-r-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading our premium collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] bg-red-50 p-8 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Cars</h2>
        <p className="text-red-600 mb-1">{error}</p>
        <p className="text-gray-600">Please check the console for more details</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Premium Car Collection
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience luxury and performance with our exclusive selection of premium vehicles
        </p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
          {carTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 
                ${activeTab === type 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4h4m-4 4h4" />
          </svg>
          <p className="text-xl text-gray-500">
            No vehicles available in this category at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

const CarCard = ({ car }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle different image property names
  const carImage = car.imageUrl || car.image;
  
  // Get badge color based on car type
  const getBadgeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'luxury': return 'bg-purple-600';
      case 'suv': return 'bg-green-600';
      case 'truck': return 'bg-blue-600';
      case 'sedan': return 'bg-red-600';
      case 'electric': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };
  
  // Format price properly
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(car.price);

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Car Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={carImage} 
          alt={`${car.name} ${car.model}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Luxury+Vehicle';
          }}
        />
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 ${getBadgeColor(car.type)} text-white px-3 py-1 rounded-full text-sm font-bold tracking-wide`}>
          {car.type}
        </div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm text-gray-900 px-4 py-2 rounded-md font-bold shadow-lg">
          {formattedPrice}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        
        {/* Car Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-2xl font-bold tracking-tight line-clamp-1">
            {car.name}
          </h2>
          <p className="text-sm opacity-80 font-medium">{car.model}</p>
        </div>
      </div>

      {/* Car Details */}
      <div className="p-6">
        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">FUEL TYPE</p>
              <p className="text-sm font-medium">{car.fuelType}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">TRANSMISSION</p>
              <p className="text-sm font-medium">{car.transmission}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">SEATING</p>
              <p className="text-sm font-medium">{car.seats} Seats</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">REG. NO.</p>
              <p className="text-sm font-medium truncate">{car.VehicleRegistrationNo || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div>
            <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View Details
          </button>
          
          {/* Quick Actions */}
          <div className="flex justify-between mt-4">
            <button className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Test Drive
            </button>
            <button className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;