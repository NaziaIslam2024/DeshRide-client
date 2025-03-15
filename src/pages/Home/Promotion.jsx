import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import promo1 from "../../assets/marketing-card-2.webp";
import promo2 from "../../assets/marketing-card-3.webp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Promotion = () => {
  const promotions = [
    {
      id: 1,
      image: promo1,
    },
    {
      id: 2,
      image: promo2,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 lg:px-8 relative mb-[100px]">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 1.3, spaceBetween: 30 },
            1280: { slidesPerView: 1.3, spaceBetween: 40 },
          }}
          className="relative"
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id} className="flex justify-center">
              <img
                src={promo.image}
                alt="Promotion"
                className="w-full max-w-[800px] h-auto rounded-lg shadow-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn absolute top-1/2 -left-4 sm:-left-6 lg:-left-8 text-white bg-gray-700 p-1.5 sm:p-2 rounded-full transform -translate-y-1/2 hidden sm:flex items-center justify-center hover:bg-gray-600 transition-colors z-10">
          <FaArrowLeft size={16} />
        </button>
        <button className="next-btn absolute top-1/2 -right-4 sm:-right-6 lg:-right-8 text-white bg-gray-700 p-1.5 sm:p-2 rounded-full transform -translate-y-1/2 hidden sm:flex items-center justify-center hover:bg-gray-600 transition-colors z-10">
          <FaArrowRight size={16} />
        </button>

        {/* Pagination */}
        <div className="swiper-pagination mt-3 sm:mt-4 flex justify-center space-x-2" />
      </div>
    </div>
  );
};

export default Promotion;