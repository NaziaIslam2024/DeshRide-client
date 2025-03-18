import React from 'react';
import Sustainability from './Sustainability';
import RidesAndBeyond from './RidesAndBeyond';
import bannerImag from "../../assets/Images/about/parked-vehicles.jpg"
const About = () => {
    return (
        <div>
            <div className='h-[500px] grid items-center justify-center mb-[100px]'  style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.64),rgba(0,0,0,0.64)),url(${bannerImag})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

              }}>
                <div>
                    <h2 className='text-5xl font-bold text-center text-white'>About Us</h2>
                </div>
            </div>
            <Sustainability></Sustainability>
            <RidesAndBeyond></RidesAndBeyond>
        </div>
    );
};

export default About;