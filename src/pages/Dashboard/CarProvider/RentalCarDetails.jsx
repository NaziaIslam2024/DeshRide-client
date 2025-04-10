import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Car,
  Calendar,
  Users,
  Fuel,
  DollarSign,
  Clock,
  Check,
  X,
  MessageCircle,
} from "lucide-react";

// Mock data - in a real app, this would come from your backend
const rentalRequests = [
  {
    id: 1,
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
    id: 2,
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

function RentalCarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = rentalRequests.find((r) => r.id === Number(id));

  const handleAccept = () => {
    console.log("Accepted request:", id);
    // Add your accept logic here
  };

  const handleReject = () => {
    console.log("Rejected request:", id);
    // Add your reject logic here
  };

  const handleChat = () => {
    console.log("Opening chat with:", request.requesterUsername);
    // Add your chat logic here
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Rental request not found
          </h1>
          <Link to={-1}>
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to list
          </button>

          <div className="flex gap-3">
            {request.rentStatus === "pending" && (
              <>
                <button
                  onClick={handleAccept}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept Request
                </button>
                <button
                  onClick={handleReject}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Request
                </button>
              </>
            )}
            <button
              onClick={handleChat}
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
              src={request.imageUrl}
              alt={request.vehicleName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">
                {request.vehicleName}
              </h1>
              <p className="text-white/90">{request.model}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
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
                    <span className="text-gray-600">{request.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{request.seats} seats</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{request.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      ${request.rentPerDay}/day
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
                      {request.startDate} to {request.endDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {request.rentDuration} days
                    </span>
                  </div>
                  <div className="mt-2 p-3 bg-green-50 rounded-md">
                    <span className="text-green-700 font-semibold">
                      Total Amount: ${request.totalMoney}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requester Information */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requester Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900">{request.requesterName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">{request.requesterUsername}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{request.requesterEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{request.requesterPhone}</p>
                </div>
              </div>
            </div>

            {/* Rent Message */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Rental Message
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{request.rentMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentalCarDetails;
