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
        <div className="max-w-3xl mx-auto px-4 mt-10 relative">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">Trending Offers</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.3}
        spaceBetween={20}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        pagination={{ clickable: true, el: ".pagination-dots" }}
        breakpoints={{
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 1.3 },
        }}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className=" p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
              <p className="mb-4">{offer.description}</p>
              <hr className="mb-2"></hr>
              <button className="text-blue-600 px-4 py-2 rounded bg-white mt-auto">
                 BOOK NOW
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="prev-btn absolute top-1/2 -left-8 text-white bg-gray-700 p-2 rounded-full">
        <FaArrowLeft />
      </button>
      <button className="next-btn absolute top-1/2 -right-8 text-white bg-gray-700 p-2 rounded-full">
        <FaArrowRight />
      </button>

      <div className="pagination-dots mt-4 flex justify-center space-x-2">

      </div>
    </div>
  );
};

export default TrendingOffers;