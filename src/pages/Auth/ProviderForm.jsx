import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
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
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Minivan",
  "Luxury",
  "Electric",
];

export default function ProviderForm() {
  const [hasCar, setHasCar] = useState(null);
  const [carUsage, setCarUsage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, setUser, updateUser } = useAuth();

  // ? checking purpose
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // ? checking purpose

  const providerForm = useForm();
  const {
    watch,
    formState: { errors },
  } = providerForm;
  const password = watch("pass");

  const handleSubmit = (data) => {
    const formData = {
      ...data,
      hasCar: hasCar || false,
      carUsage: hasCar ? carUsage : undefined,
    };

    const name = data.fullName;
    const email = data.email;
    const password = data.pass;
    const userName = `${name.toLowerCase()}_${Date.now()}`;

    const { pass, ...withoutPasswordData } = formData;

    // Determine role based on car ownership and usage
    let role = "provider"; // default fallback
    if (hasCar === false) {
      role = "driver";
    } else if (hasCar === true && carUsage === "drive") {
      role = "ownerDriver";
    } else if (hasCar === true && carUsage === "rent") {
      role = "providerOnly";
    }

    const providerData = {
      ...withoutPasswordData,
      userName,
      role,
    };

    // console.log(providerData);
    // create the profile (firebase & backend save data)
    createNewUser(email, password)
      .then(async (result) => {
        const user = result.user;
        setUser(user);
        toast.success("Congratulations! Successfully created a new account", {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });

        //  send the data in backend
        try {
          const response = await axiosPublic.post(
            "/users/all_users",
            providerData
          );
          console.log("Data sent successfully:", response.data);
        } catch (error) {
          console.error("Error sending data:", error);
        }
        //
        // Update user profile using updateUser
        updateUser({ displayName: name })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        // setError("Failed to create account. Please try again.");
      });
  };

  return (
    <motion.form
      key="provider"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
      onSubmit={providerForm.handleSubmit(handleSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            {...providerForm.register("fullName", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            {...providerForm.register("email", {
              required: "Email is required",
            })}
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
            {...providerForm.register("phoneNumber", {
              required: "Phone Number is required",
            })}
            type="tel"
            placeholder="Phone Number"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            {...providerForm.register("emergencyContact", {
              required: "Emergency Contact is required",
            })}
            type="tel"
            placeholder="Emergency Contact"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* // todo: password related works here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-fit">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            {...providerForm.register("pass", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* // re-enter password field  */}
        <div className="flex-1 ">
          <div className="relative h-fit ">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              {...providerForm.register("confirmPass", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === providerForm.getValues("pass") ||
                  "Passwords do not match",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPass && (
            <p className="text-sm text-red-500 mt-1 ">
              {errors.confirmPass.message}
            </p>
          )}
        </div>
      </div>
      {/* // todo: password related works here */}

      <div className="relative">
        <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          {...providerForm.register("nid", {
            required: "NID is required",
          })}
          type="text"
          placeholder="NID Number"
          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          {...providerForm.register("address", {
            required: "Address is required",
          })}
          type="text"
          placeholder="Address"
          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-700">Do you own a car?</p>
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
                {...providerForm.register("vehicleModel", {
                  required: "Field is required",
                })}
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
            {...providerForm.register("drivingLicense", {
              required: "Field is required",
            })}
            type="text"
            placeholder="Driving License Number"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          {...providerForm.register("termsAccepted", {
            required: "Field is required",
          })}
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
  );
}
