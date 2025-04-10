<<<<<<< HEAD
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Filter, MapPin, Users, Sliders, X } from "lucide-react";
import { Link } from "react-router";
=======
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Filter, MapPin, Users, Sliders, X } from "lucide-react";
import { Link, useLocation } from "react-router";
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
import useCars from "../../hooks/useCars";

function RentACar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentMessage, setRentMessage] = useState("");
<<<<<<< HEAD

  //?
  const [carData] = useCars();

  const cars = [
    {
      id: 1,
      name: "Tesla Model 3",
      type: "Electric",
      price: 150,
      location: "New York",
      seats: 5,
      features: ["Autopilot", "Premium Sound", "360 Camera"],
      image:
        "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=2000",
      ownerName: "John Smith",
      transmission: "Automatic",
      fuelType: "Electric",
      modelYear: "2023",
      mileage: "15,000",
      ownerEmail: "john.smith@example.com",
      description:
        "Experience the future of driving with this fully electric Tesla Model 3. Features include enhanced autopilot, premium sound system, and full self-driving capability.",
    },
    {
      id: 2,
      name: "Mercedes-Benz S-Class",
      type: "Luxury",
      price: 300,
      location: "Los Angeles",
      seats: 5,
      features: ["Massage Seats", "Night Vision", "Burmester Sound"],
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000",
      ownerName: "Sarah Johnson",
      transmission: "Automatic",
      fuelType: "Petrol",
      modelYear: "2023",
      mileage: "8,000",
      ownerEmail: "sarah.j@example.com",
      description:
        "Luxury meets performance in this Mercedes-Benz S-Class. Enjoy premium features like massage seats and Burmester surround sound system.",
    },
    {
      id: 3,
      name: "Range Rover Sport",
      type: "SUV",
      price: 250,
      location: "Miami",
      seats: 7,
      features: ["Off-road Mode", "Panoramic Roof", "Air Suspension"],
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000",
      ownerName: "Michael Brown",
      transmission: "Automatic",
      fuelType: "Diesel",
      modelYear: "2022",
      mileage: "20,000",
      ownerEmail: "m.brown@example.com",
      description:
        "Conquer any terrain with this powerful Range Rover Sport. Perfect for both city driving and off-road adventures.",
    },
  ];

  // Repeat the cars array 4 times to show more cars
  const extendedCars = [...cars, ...cars, ...cars, ...cars];
=======
  // const [cars, setCars] = useState([]);

  //?

  // const location = useLocation();
  // const { pathname } = location;
  // console.log(pathname);
  const [carData] = useCars();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    setCars(carData?.cars);
  }, [carData]);
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f

  // filter section
  const FilterSection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setIsFilterVisible(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <div className="space-y-6 lg:space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Car size={16} />
            Car Type
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]">
            <option>All Types</option>
            <option>Electric</option>
            <option>Luxury</option>
            <option>SUV</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin size={16} />
            Location
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]">
            <option>All Locations</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Miami</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users size={16} />
            Seats
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]">
            <option>Any</option>
            <option>2</option>
            <option>4</option>
            <option>5</option>
            <option>7</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Filter size={16} />
            Features
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]">
            <option>All Features</option>
            <option>Autopilot</option>
            <option>Premium Sound</option>
            <option>Massage Seats</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Sliders size={16} />
            Price Range ($/day)
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full accent-[#00A63E]"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  //   car rent modal
  const RentModal = ({ car, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Rent Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img
<<<<<<< HEAD
              src={car.image}
              alt={car.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{car.name}</h3>
              <p className="text-[#00A63E] font-semibold">${car.price}/day</p>
=======
              src={car?.imageUrl}
              alt={car?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{car?.name}</h3>
              <p className="text-[#00A63E] font-semibold">${car?.price}/day</p>
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Message to Owner
            </label>
            <textarea
              value={rentMessage}
              onChange={(e) => setRentMessage(e.target.value)}
              placeholder="Enter your rental request details..."
              className="w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E] resize-none"
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                setRentMessage("");
                onClose();
              }}
              className="flex-1 bg-[#00A63E] text-white py-3 px-4 rounded-lg hover:bg-[#00A63E]/90 transition-colors font-medium"
            >
              Confirm Request
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Main RentACar component
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
        className="bg-white shadow-sm"
=======
        className="bg-white shadow-sm mt-16"
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
            <button
              onClick={() => setIsFilterVisible(true)}
              className="lg:hidden flex items-center gap-2 bg-[#00A63E] text-white px-4 py-2 rounded-lg hover:bg-[#00A63E]/90 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isFilterVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-50 p-4 overflow-y-auto"
            >
              <FilterSection />
            </motion.div>
          </motion.div>
        )}

        {/* Rent Modal */}
        {showRentModal && selectedCar && (
          <RentModal
            car={selectedCar}
            onClose={() => setShowRentModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters - Shows on left side for desktop */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-6">
              <FilterSection />
            </div>
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
<<<<<<< HEAD
              {extendedCars.map((car, index) => (
                <motion.div
                  key={`${car.id}-${index}`}
=======
              {cars?.map((car, index) => (
                <motion.div
                  key={`${car._id}-${index}`}
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
<<<<<<< HEAD
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      ${car.price}/day
=======
                      src={car?.imageUrl}
                      alt={car?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      ${car?.price}/day
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
<<<<<<< HEAD
                          {car.name}
                        </h3>
                        <p className="text-gray-600">{car.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm">{car.location}</span>
=======
                          {car?.name}
                        </h3>
                        <p className="text-gray-600">{car?.fuelType}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm">
                          {car?.location || "Anywhere"}
                        </span>
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-600">
<<<<<<< HEAD
                          {car.seats} seats
=======
                          {car?.seats} seats
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
<<<<<<< HEAD
                      {car.features.map((feature, featureIndex) => (
=======
                      {car?.features?.map((feature, featureIndex) => (
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-[#00A63E]/10 text-[#00A63E] rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedCar(car);
                          setShowRentModal(true);
                        }}
                        // to="/rent"
                        className="flex-1 bg-[#00A63E] text-white py-2 px-4 rounded-lg hover:bg-[#00A63E]/90 transition-colors"
                      >
                        Rent Now
                      </button>
                      <Link
<<<<<<< HEAD
                        to={`/rent-car/${car.id}`}
=======
                        to={`/rent-car/${car?._id}`}
>>>>>>> dfce984514fc940dfeeaf2a1cd3be50093705e5f
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentACar;
