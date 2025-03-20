import React from 'react';
import { CircleUser, CircleCheckBig, Car, SquareUser, SquareUserRound } from 'lucide-react';

const services = [
    {
        title: "Active Users",
        stat: "3.2M+",
        icon: <CircleUser className="w-12 h-12 text-green-500" />,
    },
    {
        title: "Ride completion",
        stat: "12000+",
        icon: <CircleCheckBig className="w-12 h-12 text-blue-500" />,
    },
    {
        title: "Available Cars",
        stat: "2K+ cars for rent",
        icon: <Car className="w-12 h-12 text-orange-500" />,
    },
    {
        title: "Working as Hosts",
        stat: "1K+ work as Driver",
        icon: <SquareUser className="w-12 h-12 text-purple-500" />,
    },
    {
        title: "Invetors",
        stat: "300+ has invested",
        icon: <SquareUserRound className="w-12 h-12 text-yellow-500" />,
    },
];


const Statistics = () => {
    return (
        <section className="w-11/12 mx-auto mb-[100px]">
            <h2 className="text-center text-2xl font-semibold mb-4">
                What is DeshRide?
            </h2>
            <p className='text-center max-w-3xl mx-auto mb-8'>
                DeshRide is a marketplace where anyone book any car they want and hosts build successful businesses sharing their cars.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-[#f3f4f6] rounded-lg p-6 shadow-md text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex justify-center">{service.icon}</div>
                        <p className="text-xl font-semibold">{service.stat}</p>
                        <h3 className="text-gray-600 mt-2">{service.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;