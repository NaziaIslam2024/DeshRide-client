import React from "react";
import { Link } from "react-router";

// Function to generate random cars with random speeds
const generateRandomCars = () => {
  const cars = [
    {
      id: 1,
      src: "https://png.pngtree.com/png-vector/20220504/ourmid/pngtree-red-convertible-car-stylish-and-luxurious-isolated-on-white-vector-png-image_30251826.png",
      speed: Math.random() * 10 + 5,
    },
    {
      id: 2,
      src: "https://static.vecteezy.com/system/resources/thumbnails/035/858/067/small_2x/police-car-side-view-png.png",
      speed: Math.random() * 10 + 5,
    },
    {
      id: 3,
      src: "https://pngimg.com/d/tesla_cybertruck_PNG17.png",
      speed: Math.random() * 10 + 5,
    },
  ];
  return cars;
};

const ErrorPage = () => {
  const cars = generateRandomCars();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 overflow-hidden">
      {/* Moving Car Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-10 sm:top-20 left-0 animate-cloud1">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/049/513/630/small_2x/moody-dark-clouds-on-black-background-cut-out-transparent-png.png"
            alt="Cloud"
            className="w-16 sm:w-24 opacity-50"
          />
        </div>
        <div className="absolute top-20 sm:top-40 right-0 animate-cloud2">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/049/513/630/small_2x/moody-dark-clouds-on-black-background-cut-out-transparent-png.png"
            alt="Cloud"
            className="w-20 sm:w-32 opacity-50"
          />
        </div>

        {/* Road */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gray-700"></div>
        <div className="absolute bottom-8 sm:bottom-12 left-0 w-[50%] h-1 bg-yellow-400 animate-road-line"></div>
        <div className="absolute bottom-8 sm:bottom-12 left-96 w-[50%] h-1 bg-yellow-400 animate-road-line"></div>

        {/* Multiple Moving Cars */}
        {cars.map((car) => (
          <div
            key={car.id}
            className="absolute bottom-10 sm:bottom-16 left-0"
            style={{
              animation: `car ${car.speed}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <img
              src={car.src}
              alt="Car"
              className="w-16 sm:w-24 transform -scale-x-100"
            />
          </div>
        ))}
      </div>

      {/* Error Content */}
      <div className="text-center w-full max-w-md sm:max-w-lg md:max-w-2xl relative z-10 px-4 sm:px-6">
        {/* Animated Colorful Border Container */}
        <div className="relative p-4 sm:p-6 bg-white/90 rounded-3xl shadow-2xl animated-border">
          {/* Error Message */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 mb-4 animate-bounce">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold  mb-4 sm:mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
            Oops! Page Not Found
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 font-medium">
            It looks like you've taken a wrong turn. The page you're looking for
            doesn't exist or has been moved.
          </p>

          {/* Enhanced Call-to-Action Button */}
          <Link
            to="/"
            className="relative inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-110 active:scale-95 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center text-sm sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transform group-hover:rotate-180 transition-transform duration-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Go Back Home
            </span>
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 animate-shine" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
