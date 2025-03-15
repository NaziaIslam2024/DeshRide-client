import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TrendingOffers = () => {
  const offers = [
    {
      id: 1,
      title: "FREEAIRPORT",
      description: "Get Zoomcar delivered to the Airport terminal for free",
    },
    {
      id: 2,
      title: "FREEHD",
      description: "Get Zoomcar delivered to your doorstep for free",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 relative">
      <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
        Trending Offers
      </h2>
      
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          pagination={{ clickable: true, el: ".pagination-dots" }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 1.3, spaceBetween: 20 },
            1024: { slidesPerView: 1.5, spaceBetween: 20 },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="p-4 sm:p-6 rounded-lg shadow-lg bg-white">
                <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-800">
                  {offer.title}
                </h3>
                <p className="text-sm sm:text-base mb-4 text-gray-600">
                  {offer.description}
                </p>
                <hr className="mb-2 border-gray-200" />
                <button className="w-full sm:w-auto text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-white border border-blue-600 hover:bg-blue-50 transition-colors text-sm sm:text-base">
                  BOOK NOW
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn absolute top-1/2 -left-4 sm:-left-8 text-white bg-gray-700 p-1.5 sm:p-2 rounded-full transform -translate-y-1/2 hidden sm:flex items-center justify-center hover:bg-gray-600 transition-colors z-10">
          <FaArrowLeft size={16} />
        </button>
        <button className="next-btn absolute top-1/2 -right-4 sm:-right-8 text-white bg-gray-700 p-1.5 sm:p-2 rounded-full transform -translate-y-1/2 hidden sm:flex items-center justify-center hover:bg-gray-600 transition-colors z-10">
          <FaArrowRight size={16} />
        </button>

        {/* Pagination Dots */}
        <div className="pagination-dots mt-3 sm:mt-4 flex justify-center space-x-2" />
      </div>
    </div>
  );
};

export default TrendingOffers;