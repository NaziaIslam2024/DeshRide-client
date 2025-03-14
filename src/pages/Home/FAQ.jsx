import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How much does it cost to rent a car with DeshRide?", answer: "DeshRide offers competitive rates based on the car type, rental duration, and location within Bangladesh." },
  { question: "How do I book a car on DeshRide?", answer: "You can book a car through our website by selecting a vehicle, choosing rental dates, and confirming your booking with payment." },
  { question: "Is renting a car cheaper than buying one?", answer: "Renting can be cheaper if you don't need a car daily." },
  { question: "Can I rent a car with a driver on DeshRide?", answer: "Yes, DeshRide provides both self-drive and chauffeur-driven car rental options for your convenience." },
  { question: "What types of cars are available on DeshRide?", answer: "Sedans, SUVs, and hatchbacks are available with different comfort and mileage features." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-wrap gap-4 items-start">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 shadow-md w-full md:w-[48%] transition-all duration-300"
          >
            <button
              className="flex justify-between items-center w-full text-left font-semibold"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-sm md:text-base">Q. {faq.question}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;