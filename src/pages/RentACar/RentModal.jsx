import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRentCar } from "../../providers/RentACarProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const RentModal = ({ car, onClose }) => {
  //
  const {
    selectedCar,
    setSelectedCar,
    showRentModal,
    setShowRentModal,
    rentMessage,
    setRentMessage,

    handleRentRequest,
    setCar,

    dateRange,
    setDateRange,
    startDate,
    endDate,
  } = useRentCar();
  useEffect(() => {
    setCar(car);
  }, [car, setCar]);
  //

  // //?
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  // //?

  return (
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
              Message to Owner (give your location)
            </label>
            <textarea
              // value={rentMessage}
              onChange={(e) => setRentMessage(e.target.value)}
              placeholder="Enter your rental request details..."
              className="w-full h-24 p-2 rounded-lg border-gray-300 shadow-sm focus:border-[#00A63E] focus:ring-[#00A63E] resize-none"
            />
          </div>
          {/* //? */}
          <div className="relative">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="Pick your date"
              className="w-full p-2 pl-10  border-gray-300 shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaRegCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {startDate && endDate && (
            <p className="text-left text-sm text-gray-700">
              📅 <strong>{startDate.toDateString()}</strong> to{" "}
              <strong>{endDate.toDateString()}</strong>
            </p>
          )}
        </div>
        {/* //? */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              handleRentRequest(rentMessage);
              setShowRentModal(false);
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
      </motion.div>
    </motion.div>
  );
};

export default RentModal;
