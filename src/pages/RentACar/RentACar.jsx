import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Filter, MapPin, Users, Sliders, X } from "lucide-react";
import { Link } from "react-router";
import useCars from "../../hooks/useCars";
import { useRentCar } from "../../providers/RentACarProvider";
import RentModal from "./RentModal";

function RentACar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [carType, setCarType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [seats, setSeats] = useState("Any");
  const [feature, setFeature] = useState("All Features");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { selectedCar, setSelectedCar, showRentModal, setShowRentModal } =
    useRentCar();

  const [carData] = useCars();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    setCars(carData?.cars);
  }, [carData]);

  // Extract unique values for filters
  const uniqueCarTypes = [...new Set(cars?.map((car) => car.type))].sort();
  const uniqueLocations = [
    ...new Set(cars?.map((car) => car.carLocation)),
  ].sort();
  const uniqueSeats = [...new Set(cars?.map((car) => car.seats))].sort(
    (a, b) => a - b
  );
  const uniqueFeatures = [
    ...new Set(cars?.flatMap((car) => car.features)),
  ].sort();

  // Filter cars based on selected criteria
  const filteredCars = cars?.filter((car) => {
    if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
    if (carType !== "All Types" && car.type !== carType) return false;
    if (location !== "All Locations" && car.carLocation !== location)
      return false;
    if (seats !== "Any" && car.seats !== parseInt(seats)) return false;
    if (feature !== "All Features" && !car.features.includes(feature))
      return false;
    return true;
  });

  // Pagination calculations  calculations
  const totalPages = Math.ceil((filteredCars?.length || 0) / itemsPerPage);
  const paginatedCars = filteredCars?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // FilterSection component
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
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]"
          >
            <option>All Types</option>
            {uniqueCarTypes?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin size={16} />
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]"
          >
            <option>All Locations</option>
            {uniqueLocations?.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users size={16} />
            Seats
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]"
          >
            <option>Any</option>
            {uniqueSeats?.map((seatCount) => (
              <option key={seatCount} value={seatCount}>
                {seatCount}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Filter size={16} />
            Features
          </label>
          <select
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E]"
          >
            <option>All Features</option>
            {uniqueFeatures?.map((feat) => (
              <option key={feat} value={feat}>
                {feat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Sliders size={16} />
            Price Range ($/day)
          </label>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">
                Min Price: ${priceRange[0]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value);
                  setPriceRange([newMin, Math.max(newMin, priceRange[1])]);
                }}
                className="w-full accent-[#00A63E]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                Max Price: ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value);
                  setPriceRange([Math.min(newMax, priceRange[0]), newMax]);
                }}
                className="w-full accent-[#00A63E]"
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Pagination Component
  const Pagination = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mt-8 w-full"
    >
      {/* Left: Items per page */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E] p-1"
        >
          {[6, 12, 18, 24].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Center: Pagination buttons */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-[#00A63E] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Right: Showing range */}
      <p className="text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, filteredCars?.length || 0)} of{" "}
        {filteredCars?.length || 0} cars
      </p>
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
              {paginatedCars?.map((car, index) => (
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
                          {car?.carLocation || "Anywhere"}
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
                      {car?.features
                        ?.slice(0, 4)
                        .map((feature, featureIndex) => (
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
            {/* Add Pagination */}
            {filteredCars?.length > 0 && <Pagination />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentACar;