import React from "react";
import { Car, Users, Key } from "lucide-react";

const services = [
  {
    title: "Rent a Car",
    description: "Choose from a variety of cars and rent them at affordable prices for personal or business use.",
    icon: <Car className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Share a Ride",
    description: "Offer or join rides with others to split travel costs and enjoy a budget-friendly journey.",
    icon: <Users className="w-12 h-12 text-green-500" />,
  },
  {
    title: "List Your Car",
    description: "Earn money by listing your car for rent when you're not using it.",
    icon: <Key className="w-12 h-12 text-orange-500" />,
  },
];

const Services = () => {
  return (
    <section className="w-11/12 mx-auto mb-[100px]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-accent-light-100 border rounded-lg p-6 shadow-md text-center transition-transform hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;