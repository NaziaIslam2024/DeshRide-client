import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bannerContent1 from "../../assets/Images/banner/banner-content-1.svg";
import bannerContent2 from "../../assets/Images/banner/banner-content-2.svg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay,  Pagination} from 'swiper/modules';

import './Testimonial.css';


const reviews = [
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Jhankar Mahbub",
        title: "Excellent service! The booking process was smooth, and the car was in perfect condition. Highly recommended!",
        profession: "Engineer",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Nazia Islam",
        title: "Great experience! The car was clean, well-maintained, and the pick-up/drop-off process was seamless. Will definitely use this service again!",
        profession: "Web Developer",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Al Nahian Mugdho",
        title: "Affordable rates and a wide selection of cars. Customer support was very helpful when I had a query. Loved the experience!",
        profession: "Doctor",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Tondra Habiba",
        title: "Super convenient and reliable service. The booking process was straightforward, and there were no hidden charges. A great alternative to traditional rentals!",
        profession: "Engineer",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Mehedi Hasan",
        title: "Rented a car for a weekend trip, and it was a hassle-free experience. The GPS feature was a lifesaver! 10/10 would book again.",
        profession: "Software Engineer",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Inzamul Haque",
        title: "Decent service, but the verification process took longer than expected. The car itself was in great condition, though!",
        profession: "Bussiness Man",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userName: "Abdullah Al Hadee",
        profession: "Teacher",
        title: "Faced some issues with car availability. The customer service team tried to help, but it was still frustrating.",
    },
];



const Testimonial = () => {

    return (
        <div className='mb-[100px] p-5 w-11/12 mx-auto'>
            <h1 className="text-center text-2xl font-semibold mb-4">Story of satisfaction</h1>
            <p className="text-center max-w-3xl mx-auto mb-8">
                Our consumers has shared their valuable thoughts and feedback which encourage us to provide the best service to our customers.
            </p>
            <Swiper
                navigation={true}
                slidesPerView={1}
                spaceBetween={5}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="custom-swiper"
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="py-4 flex flex-col w-full shadow-lg backdrop-blur-sm text-center items-center h-72 bg-accent-light-100 rounded-lg">
                                <img
                                    src={review.userAvatar}
                                    alt={review.userName}
                                    className="w-12 h-12 rounded-full mr-4 mb-6"
                                />
                                <div className="flex flex-col justify-between flex-1 w-full px-6">
                                    <p className="min-h-[60px] flex items-center justify-center text-justify">
                                        {review.title}
                                    </p>
                                    <h2 className="mt-auto">{review.userName}</h2>
                                    <h4 className="text-[12px]">{review.profession}</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;