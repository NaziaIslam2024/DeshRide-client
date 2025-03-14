import React from "react";
import Marquee from "react-fast-marquee";

const Gallery = () => {
return (
    <div className="w-11/12 mx-auto my-10">
        <div className="grid grid-cols-4 gap-4">
            <div>
                <img src="https://i.ibb.co.com/4nbWCvfJ/close-up-mobile-with-map-directions.jpg" alt="Stock 1" className="w-full h-40 object-cover rounded" />" 
            </div>
            <div><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 2" className="w-full h-40 object-cover rounded" />" </div>
            <div><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 3" className="w-full h-40 object-cover rounded" />" </div>
            <div><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 4" className="w-full h-40 object-cover rounded" />" </div>
            <div className="col-span-2"><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 5" className="w-full h-40 object-cover rounded" />" </div>
            <div><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 6" className="w-full h-40 object-cover rounded" />" </div>
            <div><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" alt="Stock 7" className="w-full h-40 object-cover rounded" />" </div>
        </div>
    </div>
);
};

export default Gallery;
