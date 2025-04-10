import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
            // value={rentMessage}
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

export default RentModal;
