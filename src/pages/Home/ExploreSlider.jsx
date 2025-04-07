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
    title: "Explore the Best of Dhaka and Beyond with DeshRide",
    description: "Dhaka, the vibrant capital of Bangladesh, is a perfect mix of history, culture, and modernity.",
  },
  {
    image: image2,
    title: "Exploring the Natural Beauty of Sylhet with DeshRide",
    description: "Sylhet, known for its lush tea gardens and breathtaking landscapes, is a must-visit destination in Bangladesh.",
  },
  {
    image: image3,
    title: "Cox’s Bazar: The Longest Sea Beach Awaits Your Road Trip",
    description: "Take a scenic road trip to Cox’s Bazar, home to the world's longest unbroken sandy beach.",
  },
  {
    image: image4,
    title: "A Historic Journey to Sonargaon: The Ancient Capital of Bengal",
    description: "Step back in time with a visit to Sonargaon, a treasure trove of history, culture, and beautiful architecture.",
  },
  {
    image: image5,
    title: "Unwind at Kuakata: The Land of Sunrise & Sunset",
    description: "Enjoy the breathtaking view of both sunrise and sunset over the sea at Kuakata, a hidden gem of Bangladesh.",
  }
];


const ExploreSlider = () => {
  return (
    <div className="w-11/12 mx-auto py-10 px-4 mb-[100px]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Places to explore around Bangladesh</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        
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
          className="bg-accent-light-100 p-4 rounded-lg shadow-lg min-h-[420px] flex flex-col"
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
        <button className="bg-primary-light-800 text-white px-6 py-2 rounded-lg">DISCOVER MORE</button>
      </div>
    </div>
  );
};

export default ExploreSlider;
