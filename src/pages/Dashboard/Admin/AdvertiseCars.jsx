// AdvertiseCars.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdvertiseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5001/cars"
          "http://localhost:5001"
        );
        setCars(response.data.cars || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchAllCars();
  }, []);

  const handleAdvertiseToggle = async (carId, advertiseStatus) => {
    try {
      await axios.put("http://localhost:5001/cars/update-advertise", {
        carId,
        advertise: advertiseStatus,
      });
      setCars(
        cars.map((car) =>
          car._id === carId
            ? {
                ...car,
                advertiseStatus: advertiseStatus ? "Active" : "Inactive",
              }
            : car
        )
      );
      toast.success(
        `Car advertisement ${
          advertiseStatus ? "enabled" : "disabled"
        } successfully!`
      );
    } catch (err) {
      console.error("Error updating advertise status:", err);
      toast.error("Failed to update advertise status");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 font-semibold text-xl bg-red-100 rounded-lg mx-4 mt-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Image</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Name & Model
                </th>
                <th className="py-4 px-6 text-left font-semibold">Added By</th>
                <th className="py-4 px-6 text-left font-semibold">Price</th>
                <th className="py-4 px-6 text-left font-semibold">Location</th>
                <th className="py-4 px-6 text-left font-semibold">
                  Advertise Status
                </th>
                <th className="py-4 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCars.map((car, index) => (
                <tr
                  key={car._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-all duration-200`}
                >
                  <td className="py-4 px-6">
                    <img
                      src={car.imageUrl}
                      alt={`${car.name} ${car.model}`}
                      className="w-20 h-14 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {car.name} {car.model}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{car.addedBy}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    ${car.price.toLocaleString()}/day
                  </td>
                  <td className="py-4 px-6 text-gray-600">{car.carLocation}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        car.advertiseStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          car.advertiseStatus === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {car.advertiseStatus === "Active"
                        ? "Advertised"
                        : "Not Advertised"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAdvertiseToggle(car._id, true)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          car.advertiseStatus === "Active"
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                        }`}
                        disabled={car.advertiseStatus === "Active"}
                      >
                        Advertise On
                      </button>
                      <button
                        onClick={() => handleAdvertiseToggle(car._id, false)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          car.advertiseStatus !== "Active"
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
                        }`}
                        disabled={car.advertiseStatus !== "Active"}
                      >
                        Advertise Off
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700">
            Items per page:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-all duration-200`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-600 font-medium">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, cars.length)} of {cars.length} vehicles
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCars;
