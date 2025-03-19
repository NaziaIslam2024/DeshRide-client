import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserCheck, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

export default function ConsumerForm() {
  const [showPassword, setShowPassword] = useState(false);
  const consumerForm = useForm();
  const { createNewUser, setUser, updateUser } = useAuth();
  //   console.log(createNewUser);

  // ? checking purpose
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // ? checking purpose

  const handleSubmit = async (data) => {
    const name = data.fullName;
    const email = data.email;
    const password = data.pass;
    const userName = `${name.toLowerCase()}_${Date.now()}`;

    const { pass, ...withoutPasswordData } = data;
    const consumerData = { ...withoutPasswordData, userName, role: "consumer" };

    // console.log(consumerData);

    // todo : Validate password
    // if (!passwordRegex.test(password)) {
    //   // setError(
    //   //   "Password must be at least 6 characters long and include an uppercase and a lowercase letter."
    //   // );
    //   return;
    // }

    // setError("");  // error state need to set

    // create user
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
        // send the data in backend
        try {
          const response = await axiosPublic.post(
            "/users/consumerUsers",
            consumerData
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
      key="consumer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
      onSubmit={consumerForm.handleSubmit(handleSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            {...consumerForm.register("fullName", {
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
            {...consumerForm.register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          {...consumerForm.register("phoneNumber", {
            required: "Phone Number is required",
          })}
          type="tel"
          placeholder="Phone Number"
          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          {...consumerForm.register("pass", {
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
  );
}
