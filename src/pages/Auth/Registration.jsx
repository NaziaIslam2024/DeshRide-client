import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, User } from "lucide-react";
import ConsumerForm from "./ConsumerForm";
import ProviderForm from "./ProviderForm";

function Registration() {
  const [userType, setUserType] = useState("consumer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center mt-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to DeshRide
          </h1>
          <p className="text-gray-600 mt-2">
            Join our community and start your journey today
          </p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("consumer")}
            className={`flex-1 p-4 rounded-lg border transition-all ${
              userType === "consumer"
                ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Consumer</p>
            <p className="text-xs text-gray-500">Looking for a ride?</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("provider")}
            className={`flex-1 p-4 rounded-lg border transition-all ${
              userType === "provider"
                ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <Car className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Provider</p>
            <p className="text-xs text-gray-500">Want to be a driver?</p>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {userType === "consumer" ? <ConsumerForm /> : <ProviderForm />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Registration;
