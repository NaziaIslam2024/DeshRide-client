import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Car,
  Calendar,
  Users,
  Fuel,
  DollarSign,
  Clock,
  MessageCircle,
  RefreshCcw,
  CreditCard,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useRentCar } from "../../../providers/RentACarProvider";
import ChatModalWithOwner from "./ChatModalWithOwner";

function MyRentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const {
  //   selectedCar,
  //   setSelectedCar,
  //   showRentModal,
  //   setShowRentModal,
  //   rentMessage,
  //   setRentMessage,

  //   handleRentRequest,
  //   setCar,

  //   dateRange,
  //   setDateRange,
  //   startDate,
  //   endDate,

  //   //
  //   handleAccept,
  //   handleReject,
  //   showChatModal,
  //   setShowChatModal,
  // } = useRentCar();
  const [showChat, setShowChat] = useState(false);

  // find the data by id, and show
  const [rentalRequests, setRentalRequests] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["rentalRequests", id],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/car-rental/get-car-rental/${id}`
      );
      setRentalRequests(response.data);
      // console.log(response.data);
      return response.data;
    },
    enabled: !!id,
    onSuccess: (data) => {
      console.log("Rental requests fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching rental requests:", error);
    },
  });
  useEffect(() => {
    if (data) {
      setRentalRequests(data);
    }
  }, [data]);

  const handleChat = () => {
    console.log("Opening chat with:", request?.requesterUsername);
    // Add your chat logic here
  };

  if (!rentalRequests) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Rental request not found
          </h1>
          <Link to="/dashboard/my-rentals">
            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to list
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to list
          </button>

          <div className="flex gap-3">
            {/* {rentalRequests?.rentStatus === "pending" && (
              <>
                <p>i got </p>
              </>
            )} */}
            {rentalRequests?.rentStatus === "ongoing" && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Ongoing
              </button>
            )}
            <button
              onClick={() => setShowChat(!showChat)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Requester
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Vehicle Image */}
          <div className="relative h-64 w-full">
            <img
              src={rentalRequests?.imageUrl}
              alt={rentalRequests?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">
                {rentalRequests?.name || "Unknown Vehicle"}
              </h1>
              <p className="text-white/90">{rentalRequests?.model}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
                  rentalRequests?.rentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : rentalRequests?.rentStatus === "ongoing"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {rentalRequests?.rentStatus}
              </span>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Vehicle Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Car className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {rentalRequests?.type || "Unknown Type"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {rentalRequests?.seats} seats
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {rentalRequests?.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      ${rentalRequests?.price}/day
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Rental Details
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {(() => {
                        const [start, end] = rentalRequests?.dateRange || [];

                        const formatDate = (dateStr) => {
                          if (!dateStr) return "";
                          const date = new Date(dateStr);
                          const day = String(date.getDate()).padStart(2, "0");
                          const month = date.toLocaleString("default", {
                            month: "short",
                          }); // Apr
                          const year = date.getFullYear(); // 2025
                          return `${day} ${month}, ${year}`;
                        };

                        return `${formatDate(start)} to ${formatDate(end)}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {(() => {
                        const [start, end] = rentalRequests?.dateRange || [];
                        if (!start || !end) return "0 days";

                        const startDate = new Date(start);
                        const endDate = new Date(end);
                        const diffTime = endDate - startDate;
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );

                        return `${diffDays} days`;
                      })()}
                    </span>
                  </div>
                  <div className="mt-2 p-3 bg-green-50 rounded-md">
                    <span className="text-green-700 font-semibold">
                      Total :{" "}
                      {(() => {
                        const [start, end] = rentalRequests?.dateRange || [];
                        const pricePerDay = rentalRequests?.price || 0;

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
                    </span>
                    {/* //todo: need to make it dynamic */}
                    <span className="text-green-700 font-semibold ml-5">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        className="btn bg-transparent border-none hover:bg-green-200"
                      >
                        <CreditCard />
                        Pay Now
                      </button>
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
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requester Information */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                My Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900">
                    {rentalRequests?.requesterName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">
                    {rentalRequests?.requesterUserName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">
                    {rentalRequests?.requesterEmail}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">
                    {rentalRequests?.requesterPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Rent Message */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Rental Message
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{rentalRequests?.rentMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Modal */}
      {showChat && <ChatModalWithOwner onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default MyRentDetails;
