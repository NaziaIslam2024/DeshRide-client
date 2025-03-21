import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const stories = [
  {
    id: 1,
    name: "Sunson Thomas",
    car: "Maruti Suzuki XL6 2020",
    rating: 4.46,
    trips: 166,
    bookedDaysAgo: 231,
    review:
      "I had an outstanding experience with the car I rented. The vehicle was in pristine condition, offering a smooth and comfortable ride.",
  },
  {
    id: 2,
    name: "Masum Reja",
    car: "Hyundai Venue 2021",
    rating: 4.99,
    trips: 102,
    bookedDaysAgo: 231,
    review:
      "The car was in great condition, and the process was smooth and hassle-free. I will definitely rent again!",
  },
  {
    id: 3,
    name: "Kaushik H Pawar",
    car: "Maruti Suzuki Brezza 2023",
    rating: 4.51,
    trips: 70,
    bookedDaysAgo: 231,
    review:
      "Nice car, friendly host. Helped us reach the car and dropped us back to our location as the cabs were getting canceled.",
  },
  {
    id: 4,
    name: "Syed Javeed",
    car: "Mahindra Thar 2023",
    rating: 4.81,
    trips: 124,
    bookedDaysAgo: 230,
    review:
      "Excellent experience! The car was clean and well-maintained. Made our trip memorable!",
  },
  {
    id: 5,
    name: "Sanskar Sharma",
    car: "Hyundai Creta 2022",
    rating: 4.75,
    trips: 95,
    bookedDaysAgo: 227,
    review:
      "Fantastic car, smooth ride. The booking process was easy, and the host was very accommodating!",
  },
];

const Stories = () => {
  return (
    <div className="w-11/12 mx-auto px-4 mb-[100px]">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Zoomcar Stories</h2>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={15}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 }, 
          768: { slidesPerView: 2 }, 
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }, 
        }}
        className="relative"
      >
        {stories.map((story) => (
          <SwiperSlide 
            key={story.id} 
            className="border rounded-lg p-4 shadow-md bg-accent-light-100 flex flex-col justify-between h-[320px] md:h-[340px] lg:h-[360px]"
          >
            <div>
              <h3 className="font-bold text-base md:text-lg">{story.name}</h3>
              <p className="text-xs md:text-sm text-gray-600">Booked {story.bookedDaysAgo} days ago</p>
              <p className="font-semibold mt-2 text-sm md:text-base">{story.car}</p>
              <p className="text-text-light-600 font-bold text-sm md:text-base">⭐ {story.rating} | {story.trips} trips</p>
            </div>
            <p className="text-gray-700 text-sm md:text-base mt-2 line-clamp-3">{story.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4">
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default Stories;