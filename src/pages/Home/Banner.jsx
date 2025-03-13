import React, { useState, useEffect } from "react";
import bannerContent1 from "../../assets/Images/banner/banner-content-1.svg";
import bannerContent2 from "../../assets/Images/banner/banner-content-2.svg";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    contentImage: bannerContent1,
    title: "Premium Cars for Every Journey",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530127676576-acdb8fbb5690?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    contentImage: bannerContent2,
    title: "Premium Cars for Every Journey",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[666px] overflow-hidden">
      {/* Slider Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center p-4 max-w-7xl mx-auto w-full">
        <div className="flex w-full gap-8">
          {/* Form Section - 1/3 width */}
          <div className="w-1/3 flex-shrink-0">
            <div className="card w-full shadow-xl bg-white/90 backdrop-blur-sm">
              <div className="card-body">
                <p className="text-gray-600">Drive anywhere, anytime with</p>
                <h2 className="text-2xl font-medium">Self-drive car rentals in</h2>

                <fieldset className="fieldset">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Location"
                  />
                  <div className="flex gap-5 mt-4">
                    <div className="w-1/2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Trip Starts
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Trip Ends
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-[#4445fb] text-white mt-6 py-3 rounded-xl hover:bg-[#3a3bd8] transition-colors">
                    Search
                  </button>
                </fieldset>
              </div>
            </div>
          </div>

          {/* Dynamic Content Section - 2/3 width */}
          <div className="w-2/3 flex-shrink-0 relative hidden md:block">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.contentImage}
                  alt={slide.title}
                  className="w-full h-full object-contain transform  transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 w-2 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;