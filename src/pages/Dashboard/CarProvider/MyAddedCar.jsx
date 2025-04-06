import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddedCar = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
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

        fetchCars();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading cars...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (cars.length === 0) {
        return <div className="text-center py-8">No cars found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">My Added Cars</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                    <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={car.imageUrl || car.image} 
                                alt={`${car.name} ${car.model}`}
                                className="w-full h-full object-cover"
                            />
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
                                    <p className="text-sm text-gray-600">Transmission</p>
                                    <p className="font-medium">{car.transmission}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Fuel</p>
                                    <p className="font-medium">{car.fuelType}</p>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <p className="text-sm text-gray-600">Features</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {car.features.map((feature, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {car.VehicleRegistrationNo && (
                                <div>
                                    <p className="text-sm text-gray-600">Registration No</p>
                                    <p className="font-medium">{car.VehicleRegistrationNo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedCar;