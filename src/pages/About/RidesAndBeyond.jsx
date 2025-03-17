import React from 'react';
import Highway from "../../assets/Images/about/highway.jpg"
const RidesAndBeyond = () => {
    return (
        <div className='container mx-auto'>
            <div className='grid lg:grid-cols-2 p-20 gap-20 mb-[100px]'>
                <div cla>
                    <img src={Highway} alt="" />
                </div>
                <div>
                    <h3 className='text-4xl font-medium py-10'>Rides and beyond</h3>
                    <p>
                    In addition to helping riders find a way to go from point A to point B, we're helping people order food quickly and affordably, removing barriers to healthcare, creating new freight-booking solutions, and helping companies provide a seamless employee travel experience. And always helping drivers and couriers earn.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RidesAndBeyond;