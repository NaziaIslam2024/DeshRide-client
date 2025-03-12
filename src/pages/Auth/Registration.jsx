/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";

function Registration() {
  const [userType, setUserType] = useState("consumer");

  const consumerForm = useForm();
  const providerForm = useForm();

  const handleConsumerSubmit = (ConsumerFormData) => {
    console.log("Consumer Form Data:", ConsumerFormData);
  };

  const handleProviderSubmit = (ProviderFormData) => {
    console.log("Provider Form Data:", ProviderFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Left Section - Image and Branding */}
      <div className="hidden lg:flex w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to DeshRide
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Join the largest ride-sharing community in the country. Whether
              you're a rider or a driver, we've got you covered.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Easy Registration
                  </h3>
                  <p className="text-white/70 text-sm">
                    Quick and secure signup process
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Flexible Options
                  </h3>
                  <p className="text-white/70 text-sm">
                    Choose between rider or driver
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Join our community today
            </p>
          </div>

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
            {/* Consumer form starts */}
            {userType === "consumer" && (
              <motion.form
                key="consumer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
                onSubmit={consumerForm.handleSubmit(handleConsumerSubmit)}
              >
                <h2 className="text-xl font-semibold text-center mb-6">
                  Consumer Registration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...consumerForm.register("fullName")}
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...consumerForm.register("email")}
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...consumerForm.register("phoneNumber")}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...consumerForm.register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-200"
                >
                  Register as Consumer
                </motion.button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full border py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Sign up with Google
                </motion.button>
              </motion.form>
            )}
            {/* consumer form ends */}
            {/* provider form starts  */}
            {userType === "provider" && (
              <motion.form
                key="provider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
                onSubmit={providerForm.handleSubmit(handleProviderSubmit)}
              >
                <h2 className="text-xl font-semibold text-center mb-6">
                  Provider Registration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("fullName")}
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("email")}
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("dateOfBirth")}
                      type="date"
                      placeholder="Date of Birth"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("age", { valueAsNumber: true })}
                      type="number"
                      placeholder="Age"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("phoneNumber")}
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...providerForm.register("emergencyContact")}
                      type="tel"
                      placeholder="Emergency Contact"
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...providerForm.register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-200"
                >
                  Register as Provider
                </motion.button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full border py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Sign up with Google
                </motion.button>
              </motion.form>
            )}
            provider form ends
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Registration;
