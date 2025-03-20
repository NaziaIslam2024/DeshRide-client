import React from 'react';
import { SquareCheckBig } from 'lucide-react';

const services = [
    {
        title: "Safe & trusted community",
        description: "Every guest is screened and verified and must meet minimum driver standards, so you can have complete confidence when you hand over your keys",
        icon: <SquareCheckBig className="w-12 h-12 text-blue-500" />,
      },
      {
        title: "Support along the way",
        description: "Our dedicated 24/7 customer support is just a click away, and your guests have easy access to Turo roadside assistance when they need it",
        icon: <SquareCheckBig className="w-12 h-12 text-green-500" />,
      },
      {
        title: "An easy-to-use Web app",
        description: "Manage your business and bookings seamlessly on the go — accept trips, tweak your pricing, message your guests, and more from the Turo app",
        icon: <SquareCheckBig className="w-12 h-12 text-orange-500" />,
      },
      {
        title: "Transparent pricing",
        description: "Set your own prices, and we’ll show you what similar cars are renting for in your area. You can always adjust your prices to maximize your earnings",
        icon: <SquareCheckBig className="w-12 h-12 text-purple-500" />,
      },
];

const WhyChooseUs = () => {
    return (
        <section className="w-11/12 mx-auto mb-[100px]">
            <h2 className="text-center text-2xl font-semibold mb-4">
                Why You Choose Us?
            </h2>
            <p className='text-center max-w-3xl mx-auto mb-8'>
                We’ve got your back. These are the reasons to make relationship with DeshRide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="border border-black rounded-lg p-6 shadow-md text-left flex flex-col items-start"
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

export default WhyChooseUs;