import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Filter, MapPin, Users, Sliders, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import useCars from "../../hooks/useCars";

function RentACar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentMessage, setRentMessage] = useState("");
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
              src={car?.imageUrl}
              alt={car?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{car?.name}</h3>
              <p className="text-[#00A63E] font-semibold">${car?.price}/day</p>
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
        className="bg-white shadow-sm mt-16"
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
              {cars?.map((car, index) => (
                <motion.div
                  key={`${car._id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={car?.imageUrl}
                      alt={car?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      ${car?.price}/day
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {car?.name}
                        </h3>
                        <p className="text-gray-600">{car?.fuelType}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm">
                          {car?.location || "Anywhere"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {car?.seats} seats
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {car?.features?.map((feature, featureIndex) => (
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
                        to={`/rent-car/${car?._id}`}
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
