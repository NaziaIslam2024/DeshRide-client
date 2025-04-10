import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, X, Car, Info } from "lucide-react";

// Mock data for demonstration
const rentalRequests = [
  {
    _id: 1,
    vehicleName: "Tesla Model 3",
    model: "2024",
    rentPerDay: 75,
    type: "Sedan",
    fuelType: "Electric",
    seats: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?auto=format&fit=crop&q=80&w=1200",
    rentMessage:
      "I would like to rent this car for my business trip. I will take good care of it.",
    requesterName: "John Doe",
    requesterEmail: "john@example.com",
    requesterUsername: "johndoe",
    requesterPhone: "+1 234 567 8900",
    rentStatus: "pending",
    rentDuration: 5,
    totalMoney: 375,
    startDate: "2024-03-20",
    endDate: "2024-03-25",
  },
  {
    _id: 2,
    vehicleName: "BMW X5",
    model: "2023",
    rentPerDay: 95,
    type: "SUV",
    fuelType: "Hybrid",
    seats: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1656468014942-fc3f9895f131?auto=format&fit=crop&q=80&w=1200",
    rentMessage: "Need this for a family vacation. We are 5 people.",
    requesterName: "Jane Smith",
    requesterEmail: "jane@example.com",
    requesterUsername: "janesmith",
    requesterPhone: "+1 234 567 8901",
    rentStatus: "ongoing",
    rentDuration: 3,
    totalMoney: 285,
    startDate: "2024-03-22",
    endDate: "2024-03-24",
  },
];

function MyRentalCars() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAccept = (_id) => {
    console.log("Accepted request:", _id);
    // Add your accept logic here
  };

  const handleReject = (_id) => {
    console.log("Rejected request:", _id);
    // Add your reject logic here
  };

  const filteredRequests =
    statusFilter === "all"
      ? rentalRequests
      : rentalRequests.filter((request) => request.rentStatus === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Rental Requests
            </h1>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={request.imageUrl}
                          alt={request.vehicleName}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.vehicleName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.requesterName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.requesterPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.rentDuration} days
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.startDate} - {request.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.rentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.rentStatus === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.rentStatus.charAt(0).toUpperCase() +
                          request.rentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${request.totalMoney}
                      </div>
                      <div className="text-xs text-gray-500">
                        (${request.rentPerDay}/day)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        {request.rentStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleAccept(request._id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(request._id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                        <Link to={`/dashboard/car-details/${request._id}`}>
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Info className="w-4 h-4 mr-1" />
                            Details
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRentalCars;
