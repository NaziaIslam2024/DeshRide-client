import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MyAddedCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDocTab, setActiveDocTab] = useState("insurance");
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        if (!user?.email) return;
        const response = await axios.get(
          `http://localhost:5001/cars/my-cars?ownerEmail=${user.email}`
        );
        setCars(response.data.cars || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchMyCars();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50">
        <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-700 font-medium animate-pulse">
          Fetching your vehicles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xs w-full animate-fade-in">
          <div className="w-10 h-10 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-1">
            Something Went Wrong
          </h2>
          <p className="text-center text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-14 h-14 mb-5 bg-indigo-100 rounded-full flex items-center justify-center animate-bounce">
          <svg
            className="w-7 h-7 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
          Your Garage is Empty
        </h1>
        <p className="text-gray-600 text-center max-w-sm mb-5">
          Add your first vehicle to start your collection!
        </p>
        <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
          Add Vehicle
        </button>
      </div>
    );
  }

  const handleDocView = (docType, url) => {
    setActiveDocTab(docType);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Your Vehicle Collection
          </h1>
          <p className="mt-2 text-gray-600 text-lg max-w-2xl mx-auto">
            Curate and manage your fleet with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Car Image */}
              <div className="relative group">
                <img
                  src={car.imageUrl || "/default-car.jpg"}
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Vehicle+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium shadow-sm">
                    ${car.price}/day
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 truncate">
                      {car.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {car.model} • {car.yearOfManufacture}
                    </p>
                  </div>
                  {/* Status Indicators (Only if not empty) */}
                  <div className="flex flex-col gap-1">
                    {car.carStatus && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          car.carStatus === "Approved"
                            ? "bg-green-100 text-green-700"
                            : car.carStatus === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {car.carStatus}
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    {
                      icon: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM12 8v8m-4-4h8",
                      label: "Type",
                      value: car.type,
                    },
                    {
                      icon: "M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4",
                      label: "Trans",
                      value: car.transmission,
                    },
                    {
                      icon: "M13 10V3L4 14h7v7l9-11h-7z",
                      label: "Fuel",
                      value: car.fuelType,
                    },
                    {
                      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                      label: "Seats",
                      value: car.seats,
                    },
                    {
                      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                      label: "Mileage",
                      value: `${car.mileage} km`,
                    },
                    {
                      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                      label: "Color",
                      value: car.color,
                    },
                  ].map((spec, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={spec.icon}
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{spec.label}</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {car.carLocation}
                  </p>
                </div>

                <p className="my-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Booking Status:</span>
                  {car.bookingStatus && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${
                        car.bookingStatus === "Available"
                          ? "bg-green-800 text-white"
                          : "bg-amber-800 text-white"
                      }`}
                    >
                      {car.bookingStatus}
                    </span>
                  )}
                </p>

                {/* Features */}
                {car.features?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-1.5">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {car.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Documents
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        type: "insurance",
                        url: car.insuranceDocsUrl,
                        label: "Insurance",
                      },
                      {
                        type: "registration",
                        url: car.registrationCopyUrl,
                        label: "Registration",
                      },
                      {
                        type: "permit",
                        url: car.roadPermitUrl,
                        label: "Permit",
                      },
                      { type: "tax", url: car.taxTokenUrl, label: "Tax" },
                    ].map((doc) => (
                      <button
                        key={doc.type}
                        onClick={() => handleDocView(doc.type, doc.url)}
                        className="flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-all duration-200 hover:scale-105"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        {doc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAddedCar;
