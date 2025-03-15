import React from "react";
import Marquee from "react-fast-marquee";

const Gallery = () => {
return (
    <div className="w-11/12 mx-auto my-10 border-b-4 border-t-4 pt-10 border-gray-200 pb-10 ">
        <h1 className="text-3xl font-bold text-center pb-10 ">Moments from DeshRide </h1>
        <Marquee gradient={false} className="marquee-space" pauseOnHover speed={40}>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <img src="https://i.ibb.co.com/4nbWCvfJ/close-up-mobile-with-map-directions.jpg" alt="Stock 1" className="w-full h-40 object-cover rounded gap-2" />
                </div>
                <div><img src="https://i.ibb.co.com/KYk39x2/couple-consulting-gps-while-traveling.jpg" alt="Stock 2" className="w-full h-40 object-cover rounded gap-2" /></div>
                <div><img src="https://i.ibb.co.com/PvS78xjs/pexels-rndiid-19577737.jpg" alt="Stock 3" className="w-full h-40 object-cover rounded gap-2" /></div>
                <div><img src="https://i.ibb.co.com/xtmCpP9z/pexels-mhmdims-11017273.jpg" alt="Stock 4" className="w-full h-40 object-cover rounded gap-2" /></div>
                <div className="col-span-2"><img src="https://i.ibb.co.com/7tDvN34W/pexels-pragyanbezbo-1878220.jpg" alt="Stock 5" className="w-full h-40 object-cover rounded gap-2" /></div>
                <div><img src="https://i.ibb.co.com/Wp6cbwHN/freepik-upload-57806.jpg" alt="Stock 6" className="w-full h-40 object-cover rounded gap-2" /></div>
                <div><img src="https://i.ibb.co.com/nsgDCsc1/pexels-hape-monaheng-653365681-19548262.jpg" alt="Stock 7" className="w-full h-40 object-cover rounded gap-2" /></div>





            </div>
            
        </Marquee>
    </div>
);
};

export default Gallery;
