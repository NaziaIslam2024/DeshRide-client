import React, { useState, useEffect } from "react";
import bannerContent1 from "../../assets/Images/banner/banner-content-1.svg";
import bannerContent2 from "../../assets/Images/banner/banner-content-2.svg";

import { IoMdPaperPlane } from "react-icons/io";
import car from "../../../src/assets/Images/banner/icons8-sedan-64.png";
import taxi from "../../../src/assets/Images/banner/icons8-taxi-50.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay  } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";
const slides = [
  {
    image:
    //   "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // contentImage: bannerContent1,
    "../../../src/assets/Images/banner/young-woman-testing-car-car-showroom.jpg",
    title: "Get to your destination <br> with peace of mind",
  },
  {
    image:
    //   "https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // contentImage: bannerContent2,
    "../../../src/assets/Images/banner/woman-charging-her-car-looking-cherger-bher-phone.jpg",
    title: "Experience the best <br> comfort and style on the road",
  },
  {
    image:
    //   "https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // contentImage: bannerContent2,
    "../../../src/assets/Images/banner/beard-young-man-sitting-with-his-friend-car-taking-selfie.jpg",
    title: "Experience the best <br> comfort and style on the road",
  },
];

const Banner = () => {
  return (
    <div className="pagination-custom mb-[100px]">
      <Swiper
        autoplay={{
          delay: 3000, // Change slide every 3 seconds
          disableOnInteraction: false, // Keeps autoplay working after user interaction
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          // el: ".swiper-pagination-banner"
        }}
        navigation={false}
        modules={[Pagination, Navigation, Autoplay ]}
        className="mySwiperBanner relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[600px] flex  pr-20"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.64),rgba(0,0,0,0.64)),url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

              }}
            >
              <div className="  text-white  hidden lg:block absolute  right-[0px] md:right-[30px] md:top-[240px] 2xl:right-[400px] ">
                <h2
                  className="font-bold text-4xl text-right"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                ></h2>
              </div>
            </div>
            {/* <img className="h-[400px] w-full" src={slide.image} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* search card design  */}
      <div className="p-2 w-[370px] md:w-md xl:w-xl absolute left-[0px] md:left-[30px] top-[260px] 2xl:left-[400px] z-20  ">
        <div className="flex">
          <div className="flex w-1/2 justify-center gap-2 items-center bg-white py-3 px-8 rounded-t-xl mr-2 ">
            <img src={taxi} alt="" className="w-5 h-5" />
            <Link>Share Ride </Link>
          </div>
          <div className="flex w-1/2  justify-center items-center gap-2 bg-white py-3 px-8 rounded-t-xl">
            <img src={car} alt="" className="w-5 h-5" />
            <Link className="">Rent a car</Link>
          </div>
        </div>
        <div className=" bg-white px-4 py-4 rounded-b-xl ">
          <div className="join w-full mt-5">
            <input className="input w-xl join-item" placeholder="Email" />
            <button className="btn join-item rounded-r-xl">Subscribe</button>
          </div>
          <div className="flex py-3 items-center">
            <IoMdPaperPlane className="mr-2 text-blue-500" />
            <Link>Find my current location</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
