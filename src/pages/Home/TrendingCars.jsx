import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCar, FaStar, FaHeart, FaArrowRight, FaGasPump, FaTachometerAlt, FaCalendarAlt } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';

const TrendingCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCar, setHoveredCar] = useState(null);

    useEffect(() => {
        const fetchTrendingCars = async () => {
            try {
                // Simulate loading for demo purposes
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const response = await axios.get('http://localhost:5001/cars');
                const activeCars = (response.data.cars || [])
                    .filter(car => car.advertiseStatus === 'Active')
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                    .slice(0, 6);
                setCars(activeCars);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching trending cars:', err);
                toast.error('Failed to load trending cars');
            }
        };
        fetchTrendingCars();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-100 rounded-xl overflow-hidden"
                >
                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                        <div className="flex justify-between">
                            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-red-600 font-semibold text-xl bg-red-100 rounded-lg mx-4 mt-4"
            >
                Error: {error}
            </motion.div>
        );
    }

    return (
        <section className="px-6 py-16 bg-color-primary">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Most <span className="text-blue-600">Trending</span> Cars
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the most popular cars that our customers love to rent
                    </p>
                </motion.div>

                {loading ? (
                    <LoadingSkeleton />
                ) : cars.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-xl shadow-sm"
                    >
                        <FaCar className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            No trending cars available
                        </h3>
                        <p className="text-gray-500">
                            Check back later for our latest offerings
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {cars.map((car, index) => (
                            <motion.div
                                key={car._id}
                                variants={cardVariants}
                                whileHover="hover"
                                onMouseEnter={() => setHoveredCar(index)}
                                onMouseLeave={() => setHoveredCar(null)}
                                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative"
                            >
                                {/* Favorite button */}
                                <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                                    <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                                </button>

                                {/* Image with hover effect */}
                                <div className="relative overflow-hidden h-56">
                                    <motion.img
                                        src={car.imageUrl}
                                        alt={`${car.name} ${car.model}`}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1 }}
                                        animate={{
                                            scale: hoveredCar === index ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {car.name} {car.model}
                                        </h3>
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="mr-1" />
                                            <span className="text-gray-700 font-medium">5.0</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 mb-4 flex items-center">
                                        <FaCalendarAlt className="mr-2" />
                                        {car.year} • {car.carLocation}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        <div className="flex flex-col items-center text-center">
                                            <FaGasPump className="text-gray-400 mb-1" />
                                            <span className="text-xs text-gray-600">{car.fuelType || 'Petrol'}</span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <GiSteeringWheel className="text-gray-400 mb-1" />
                                            <span className="text-xs text-gray-600">{car.transmission || 'Automatic'}</span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <FaTachometerAlt className="text-gray-400 mb-1" />
                                            <span className="text-xs text-gray-600">{car.mileage || '--'} km</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">Starting from</p>
                                            <p className="text-xl font-bold text-blue-600">
                                                ${car.price.toLocaleString()}
                                                <span className="text-sm font-normal text-gray-500">/day</span>
                                            </p>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                to={`/rent-car/${car?._id}`}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                                            >
                                                Rent Now <FaArrowRight className="ml-2" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!loading && cars.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-16"
                    >
                        <Link
                            to="/rent-a-car"
                            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors"
                        >
                            View All Cars <FaArrowRight className="ml-2" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default TrendingCars;