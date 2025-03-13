import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How much does it cost to rent a car in Bangalore?", answer: "The cost varies based on the car type and duration." },
  { question: "Which website is best to rent a car?", answer: "There are multiple options like Zoomcar, Revv, and Myles." },
  { question: "Is renting a car cheaper than buying one?", answer: "Renting can be cheaper if you don't need a car daily." },
  { question: "What is the process to rent a car in Bangalore?", answer: "You need to book online, provide documents, and make payment." },
  { question: "What are the popular types of cars available for rent in Bangalore and how do their features vary?", answer: "Sedans, SUVs, and hatchbacks are available with different comfort and mileage features." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 relative">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 shadow-md">
            <button
              className="flex justify-between items-center w-full text-left font-semibold"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-sm md:text-base">Q. {faq.question}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;