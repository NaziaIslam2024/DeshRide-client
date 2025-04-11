import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Check, X, Car, Info, RefreshCcw } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { useRentCar } from "../../../providers/RentACarProvider";
// import useRentalCarDetails from "../../../hooks/useRentalCarDetails";

function MyRentalCars() {
  const [statusFilter, setStatusFilter] = useState("all");

  const axiosPublic = useAxiosPublic();
  const [, userData] = useRole();
  const ownerEmail = userData?.email;

  const {
    selectedCar,
    setSelectedCar,
    showRentModal,
    setShowRentModal,
    rentMessage,
    setRentMessage,

    handleRentRequest,
    setCar,

    dateRange,
    setDateRange,
    startDate,
    endDate,

    //
    handleAccept,
    handleReject,
  } = useRentCar();

  const [rentalRequests, setRentalRequests] = useState([]);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["rentalRequests", ownerEmail],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/car-rental/get-car-rentals/${ownerEmail}`
      );
      setRentalRequests(response.data);
      return response.data;
    },
    enabled: !!ownerEmail, // Only run the query if ownerEmail is available
    onSuccess: (data) => {
      console.log("Rental requests fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching rental requests:", error);
    },
  });
  // console.log(data[0]?.dateRange);

  // useEffect for updating the data
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                {filteredRequests?.map((request) => (
                  <tr key={request?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={request?.imageUrl}
                          alt={request?.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request?.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request?.requesterName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request?.requesterPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {(() => {
                          const [start, end] = request?.dateRange || [];
                          if (start && end) {
                            const startDate = new Date(start);
                            const endDate = new Date(end);
                            const diffTime = Math.abs(endDate - startDate);
                            const diffDays = Math.ceil(
                              diffTime / (1000 * 60 * 60 * 24)
                            );
                            return `${diffDays} days`;
                          }
                          return "Duration unknown";
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request?.rentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request?.rentStatus === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request?.rentStatus?.charAt(0).toUpperCase() +
                          request?.rentStatus?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {(() => {
                          const [start, end] = request?.dateRange || [];
                          const pricePerDay = request?.price || 0;

                          if (start && end && pricePerDay) {
                            const startDate = new Date(start);
                            const endDate = new Date(end);
                            const diffTime = Math.abs(endDate - startDate);
                            const diffDays = Math.ceil(
                              diffTime / (1000 * 60 * 60 * 24)
                            );
                            const total = diffDays * pricePerDay;
                            return `$${total}`;
                          }

                          return "$0";
                        })()}
                      </div>

                      <div className="text-xs text-gray-500">
                        (${request?.price}/day)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        {request?.rentStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleAccept(request?._id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(request?._id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                        {request?.rentStatus === "ongoing" && (
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Ongoing
                          </button>
                        )}
                        <Link to={`/dashboard/car-details/${request?._id}`}>
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
