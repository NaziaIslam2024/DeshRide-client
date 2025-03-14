import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bannerContent1 from "../../assets/Images/banner/banner-content-1.svg";
import bannerContent2 from "../../assets/Images/banner/banner-content-2.svg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const reviews = [
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent2,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
    {
        userAvatar:
            "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        contentImage: bannerContent1,
        title: "Premium Cars for Every Journey",
    },
];



const Testimonial = () => {

    return (
        <div className='mt-10 px-5 w-11/12 mx-auto'>
            <h1 className="text-center text-2xl font-semibold mb-4">Story of satisfaction</h1>
            <p className="text-center max-w-3xl mx-auto mb-8">
              Our consumers has shared their valuable thoughts and feedback which encourage us to provide the best service to our customers.
           </p>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
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
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="card w-full shadow-xl bg-white/90 backdrop-blur-sm text-center items-center">
                                <img
                                    src={review.userAvatar}
                                    alt={review.userName}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div className="card-body">
                                    <p className="text-gray-600">Drive anywhere, anytime with</p>
                                    <h2 className="text-2xl font-medium">Self-drive car rentals in</h2>
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