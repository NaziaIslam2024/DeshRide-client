import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import image1 from "../../assets/Bangalore.webp";
import image2 from "../../assets/Img1.jpg";
import image3 from "../../assets/Img2.jpg";
import image4 from "../../assets/Img3.jpg";
import image5 from "../../assets/Img4.jpg";

const places = [
  {
    image: image1,
    title: 'Explore the Best of Chennai and Beyond with Zoomcar',
    description: 'Chennai, the cultural heart of South India, is a fascinating blend of tradition and modernity.',
  },
  {
    image: image2,
    title: 'Explore the Best of Bangalore and Beyond with Zoomcar',
    description: 'Bangalore, fondly known as the Garden City and the Silicon Valley of India.',
  },
  {
    image: image3,
    title: 'Cruising the Coastal Beauty: Unforgettable Road Trips in South India',
    description: 'Embark on a journey like never before with our guide to road trips in South India.',
  },
  {
    image: image4,
    title: 'Beyond the City Limits: Unleashing the Family Road Trip with Self-Drive Car Rentals in Bangalore',
    description: 'Embark on a memorable family road trip with our self-drive car rentals in Bangalore.',
  },
  {
    image: image5,
    title: 'Choosing the Right Time: A Seasonal Guide for Bangalore to Ooty Travel',
    description: 'Discover the ultimate seasonal guide for your Bangalore to Ooty trip with Zoomcar.',
  }
];

const ExploreSlider = () => {
  return (
    <div className="w-11/12 mx-auto mt-10 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Places to explore around Bangalore</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {places.map((place, index) => (
          <SwiperSlide 
          key={index} 
          className="bg-white p-4 rounded-lg shadow-lg min-h-[420px] flex flex-col"
        >
          <div className="relative h-2/3">
            <img 
              src={place.image} 
              alt={place.title} 
              className="w-full h-56 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
              <FaArrowUpRightFromSquare className="text-gray-600" />
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <h3 className="font-semibold mt-4 text-lg line-clamp-2">{place.title}</h3>
            <p className="text-gray-600 mt-2 text-sm line-clamp-2 overflow-hidden">
              {place.description}
            </p>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-6">
        <button className="bg-black text-white px-6 py-2 rounded-lg">DISCOVER MORE</button>
      </div>
    </div>
  );
};

export default ExploreSlider;
