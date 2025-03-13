import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  User,
  Mail,
  Phone,
  Lock,
  PhoneCall,
  UserCheck,
  MapPin,
  FileCheck,
  CarFront,
  ClipboardCheck,
  CreditCard,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";

function Registration() {
  const [userType, setUserType] = useState("consumer");
  const [hasCar, setHasCar] = useState(null);
  const [carUsage, setCarUsage] = useState(null);
  const [showConsumerPassword, setShowConsumerPassword] = useState(false);
  const [showProviderPassword, setShowProviderPassword] = useState(false);

  const consumerForm = useForm();
  const providerForm = useForm();

  const handleConsumerSubmit = (data) => {
    console.log("Consumer Form Data:", data);
  };

  const handleProviderSubmit = (data) => {
    const formData = {
      ...data,
      hasCar: hasCar || false,
      carUsage: hasCar ? carUsage : undefined,
    };
    console.log("Provider Form Data:", formData);
  };

  const vehicleTypes = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Minivan",
    "Luxury",
    "Electric",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
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
          {userType === "consumer" && (
            <motion.form
              key="consumer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
              onSubmit={consumerForm.handleSubmit(handleConsumerSubmit)}
            >
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
                  type={showConsumerPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConsumerPassword(!showConsumerPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConsumerPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
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

          {userType === "provider" && (
            <motion.form
              key="provider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
              onSubmit={providerForm.handleSubmit(handleProviderSubmit)}
            >
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
                  type={showProviderPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowProviderPassword(!showProviderPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showProviderPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="relative">
                <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  {...providerForm.register("nid")}
                  type="text"
                  placeholder="NID Number"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  {...providerForm.register("address")}
                  type="text"
                  placeholder="Address"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-700">
                  Do you own a car?
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setHasCar(true)}
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      hasCar === true
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-blue-200 bg-white"
                    }`}
                  >
                    <CarFront className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">Yes, I have a car</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHasCar(false);
                      setCarUsage(null);
                    }}
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      hasCar === false
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-blue-200 bg-white"
                    }`}
                  >
                    <KeyRound className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">No, I don't have a car</p>
                  </button>
                </div>
              </div>

              {hasCar && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    How would you like to use your car?
                  </p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCarUsage("drive")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        carUsage === "drive"
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-200 bg-white"
                      }`}
                    >
                      <Car className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm">Drive my own car</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarUsage("rent")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        carUsage === "rent"
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-200 bg-white"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm">Rent my car</p>
                    </button>
                  </div>
                </div>
              )}

              {hasCar && carUsage && (
                <>
                  <div className="relative">
                    <CarFront className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <select
                      {...providerForm.register("vehicleType")}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white"
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...providerForm.register("vehicleModel")}
                        type="text"
                        placeholder="Vehicle Model"
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="relative md:col-span-2">
                      <ClipboardCheck className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        {...providerForm.register("vehicleDetails")}
                        placeholder="Vehicle Details (Color, Year, Special Features, etc.)"
                        rows={3}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {hasCar === false && (
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...providerForm.register("drivingLicense")}
                    type="text"
                    placeholder="Driving License Number"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  {...providerForm.register("termsAccepted")}
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms and Conditions
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-200"
              >
                Register as Provider
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Registration;
