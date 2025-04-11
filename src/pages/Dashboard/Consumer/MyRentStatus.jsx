import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useRole from "../../../hooks/useRole";
import { Car, Check, CreditCard, Info, RefreshCcw, X } from "lucide-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { toast } from "react-toastify";

const MyRentStatus = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const axiosPublic = useAxiosPublic();

  const handleCancel = async (_id) => {
    console.log(_id);

    const rentRequestData = {
      rentStatus: "cancelled",
    };

    const res = await axiosPublic.put(
      `/car-rental/update-car-rental/${_id}`,
      rentRequestData
    );
    console.log(res.data);
    if (res.data) {
      toast.success("Car rental request accepted successfully!", {
        position: "top-left",
      });
    }
  };

  //?
  const [, userData] = useRole();
  const requesterEmail = userData?.email;

  const [rentalRequests, setRentalRequests] = useState([]);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["rentalRequests", requesterEmail],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/car-rental/get-car/${requesterEmail}`
      );
      setRentalRequests(response.data);
      return response.data;
    },
    enabled: !!requesterEmail, // Only run the query if ownerEmail is available
    onSuccess: (data) => {
      console.log("Rental requests fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching rental requests:", error);
    },
  });
  //?
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
            <h1 className="text-2xl font-bold text-gray-900">All My Rentals</h1>
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
              <option value="cancelled">Cancelled</option>
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
                        <Link to={`/dashboard/my-rents/${request?._id}`}>
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Info className="w-4 h-4 mr-1" />
                            Details
                          </button>
                        </Link>
                        {request?.rentStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleCancel(request?._id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </button>
                          </>
                        )}
                        {request?.rentStatus === "ongoing" && (
                          <button
                            onClick={() =>
                              document.getElementById("my_modal_1").showModal()
                            }
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay Now
                          </button>
                        )}
                        {/* //todo: payment dialogue  */}
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <div className="p-6 bg-white rounded-2xl max-w-md w-full text-left">
                              <h3 className="font-bold text-xl text-gray-800">
                                Choose Payment Method
                              </h3>
                              <p className="py-3 text-gray-600">
                                Select your preferred payment gateway below:
                              </p>

                              <div className="flex flex-col gap-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-green-900 transition">
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="stripe"
                                    className="radio text-green-700 mr-3"
                                  />
                                  <span className="text-gray-800 font-medium">
                                    Stripe
                                  </span>
                                </label>

                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-green-900 transition">
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="sslcommerz"
                                    className="radio  text-green-700 mr-3"
                                  />
                                  <span className="text-gray-800 font-medium">
                                    SSLCOMMERZ
                                  </span>
                                </label>
                              </div>

                              <div className="modal-action mt-5 flex justify-between items-center">
                                <form method="dialog">
                                  <button className="btn btn-outline">
                                    Close
                                  </button>
                                </form>
                                <button className="btn bg-green-700 text-white px-6">
                                  Pay Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </dialog>
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
};

export default MyRentStatus;
