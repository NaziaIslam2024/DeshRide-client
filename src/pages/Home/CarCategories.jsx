import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarCategories = () => {
    const categories = [
        {
          title: "Sedans",
          description:
            "Enjoy a premium driving experience with Sedans. Ideal for business travel or longer drives, they provide comfort, elegance, and plenty of legroom.",
          button: "Rent Sedans",
        },
        {
          title: "Hatchbacks",
          description:
            "Spacious, convenient, and economical, hatchbacks are great for zipping around the city. They're easy to park, fuel-efficient, and perfect for short drives or long trips!",
          button: "Rent Hatchbacks",
        },
        {
          title: "Electric Cars",   
          description:
            "Go green with electric vehicles. Experience the latest in eco-friendly technology while saving on fuel costs. Perfect for city commutes and short getaways.",
          button: "Rent EVs ",
        },
        {
          title: "SUVs and Family Cars",
          description:
            "Perfect for road trips with your family or group outings, SUVs offer ample space and comfort for 6-7 passengers. Whether it's a weekend getaway or a wedding trip, these cars are built for Bangladeshi families and friend groups.",
          button: "Rent SUVs",
        },
        {
          title: "Minivans",
          description:
            "Need extra space? Minivans are perfect for large families or group trips. Travel comfortably with plenty of room for passengers and luggage.",
          button: "Rent Minivans ",
        },
        {
          title: "Luxury Cars",
          description:
            "Experience top-tier comfort and style with our luxury cars. Ideal for special occasions, business events, or simply enjoying a premium ride.",
          button: "Rent Luxury Cars",
        },
      ];

    return (
        <div className="mb-[100px] px-5 w-11/12 mx-auto">
           <h2 className="text-center text-2xl font-semibold mb-4">
              Perfect Car for Every Journey in Bangladesh
           </h2>
           <p className="text-center max-w-3xl mx-auto mb-8">
              Whether you're traveling with family, heading out for a solo trip, or simply looking for a great drive in a premium car, DeshRide offers a variety of cars to suit your needs.
           </p>

           <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              // navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="pb-10"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center p-6 rounded-lg shadow-lg flex flex-col justify-between h-full min-h-[300px] bg-accent-light-100">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <p className="my-4 text-sm">{category.description}</p>
                    </div>
                    <button className="mt-auto bg-primary-light-700 text-white px-4 py-2 rounded font-medium hover:bg-primary-light-500">
                      {category.button}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
           </Swiper>
        </div>
    );
};

export default CarCategories;