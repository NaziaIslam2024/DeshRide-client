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
        <div className="md:w-[60%] w-11/12 mx-auto mt-10 px-4 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1.3}
          spaceBetween={30}
          centeredSlides={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1, spaceBetween: 40 },
            1024: { slidesPerView: 1.3, spaceBetween: 50 },
          }}
          className="relative"
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id} className="flex justify-center">
              <img src={promo.image} alt="Promotion" className="w-full rounded-lg shadow-lg" />
            </SwiperSlide>
          ))}
          <div className="flex justify-center mt-4">
          <div className="swiper-pagination"></div>
        </div>
        </Swiper>
        
        <button className="prev-btn absolute top-1/2 -left-8 text-white bg-gray-700 p-2 rounded-full z-10">
          <FaArrowLeft />
        </button>
        <button className="next-btn absolute top-1/2 -right-8 text-white bg-gray-700 p-2 rounded-full z-10">
          <FaArrowRight />
        </button>

        </div>
    );
};

export default Promotion;