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
    <div className="relative h-auto min-h-[400px] md:h-[666px] overflow-hidden">
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
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" /> {/* Overlay for mobile readability */}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8">
          {/* Form Section */}
          <div className="w-full md:w-1/3 flex-shrink-0 z-10">
            <div className="card w-full shadow-xl bg-white/95 backdrop-blur-sm rounded-xl">
              <div className="card-body p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">Drive anywhere, anytime with</p>
                <h2 className="text-xl sm:text-2xl font-medium mb-4">Self-drive car rentals</h2>

                <fieldset className="fieldset space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Location"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="w-full sm:w-1/2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Trip Starts
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Trip Ends
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-[#4445fb] text-white mt-4 sm:mt-6 py-2 sm:py-3 rounded-xl hover:bg-[#3a3bd8] transition-colors text-sm sm:text-base">
                    Search
                  </button>
                </fieldset>
              </div>
            </div>
          </div>

          {/* Dynamic Content Section */}
          <div className="w-full md:w-2/3 flex-shrink-0 relative hidden md:block">
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
                  className="w-full h-full object-contain transform transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-1 sm:gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-4 sm:w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;