import React from "react";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

const Error = ({
  title = "Oops! Page Not Found",
  message = "The page you're looking for might have been moved or doesn't exist.",
  onBack = () => window.history.back(),
}) => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-72 h-72  rounded-full animate-blob"></div>
      </div>

      <div className="relative max-w-lg w-full">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/20">
          <div className="flex justify-center mb-8 relative">
            <div className="absolute"></div>
            <AlertCircle className="h-20 w-20 text-red-500 relative animate-bounce" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {title}
          </h1>

          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onBack}
              className="group inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all duration-200 gap-2 hover:gap-3 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="group inline-flex items-center px-6 py-3 text-base font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all duration-200 gap-2 hover:gap-3 w-full sm:w-auto justify-center"
            >
              <Home className="h-5 w-5" />
              Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
