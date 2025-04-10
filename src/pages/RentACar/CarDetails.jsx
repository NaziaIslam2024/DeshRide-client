import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, User, Mail, Gauge, Fuel } from "lucide-react";

const car = {
  id: 1,
  name: "Tesla Model 3",
  type: "Electric",
  price: 150,
  location: "New York",
  seats: 5,
  features: ["Autopilot", "Premium Sound", "360 Camera"],
  image:
    "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=2000",
  ownerName: "John Smith",
  transmission: "Automatic",
  fuelType: "Electric",
  modelYear: "2023",
  mileage: "15,000",
  ownerEmail: "john.smith@example.com",
  description:
    "Experience the future of driving with this fully electric Tesla Model 3. Features include enhanced autopilot, premium sound system, and full self-driving capability.",
};

const CarDetails = () => {
  //?

  console.log(car);
  //?
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 mt-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="h-96 relative">
            <img
              src={car?.image}
              alt={car?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {car?.name}
                </h2>
                <p className="text-xl text-[#00A63E] font-semibold">
                  ${car?.price}/day
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin size={20} />
                  <span>{car?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} />
                  <span>{car?.modelYear}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Owner</p>
                    <p className="font-medium text-gray-900">
                      {car?.ownerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium text-gray-900">
                      {car?.ownerEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Gauge size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Mileage</p>
                    <p className="font-medium text-gray-900">
                      {car?.mileage} miles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-medium text-gray-900">{car?.fuelType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {car?.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Features
              </h3>
              <div className="flex flex-wrap gap-3">
                {car?.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#00A63E]/10 text-[#00A63E] rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCarDetails(false);
                  setShowRentModal(true);
                }}
                className="flex-1 bg-[#00A63E] text-white py-3 px-6 rounded-lg hover:bg-[#00A63E]/90 transition-colors font-medium"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetails;
