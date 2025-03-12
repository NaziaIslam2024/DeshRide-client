import img1 from "../../assets/Bangalore.webp";
import img2 from "../../assets/Usecase-1.webp";
import img3 from "../../assets/Usecase-2.webp";
import img4 from "../../assets/Usecase-3.webp";

const BangaloreSection = () => {
  return (
    <div className="w-11/12 mt-10 bg-slate-100 mx-auto p-6">
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <img
          src={img1}
          alt="Bangalore"
          className="rounded-lg w-full lg:w-1/3"
        />

        
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold">
            Explore Bangalore like a <span className="border-b-2 border-gray-700">Local</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Discover the freedom of driving around Bangalore on your own schedule. 
            With short-term bookings starting at just ₹799, Zoomcar gives you the perfect way to 
            experience the city for business, leisure, and everything in between.
          </p>
          <p className="text-gray-600 mt-2">
            Get self-drive cars for work meetings across town, in-city exploration, wedding ceremonies, 
            processions, and more on one self-drive car-sharing platform.
          </p>

          <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:opacity-80">
            BOOK CAR IN BANGALORE
          </button>
        </div>
      </div>

     
      <div className="mt-10">
        <h3 className="text-xl text-center font-semibold">
          Short-term rentals starting at 
          <span className="bg-green-600 text-white px-2 py-1 rounded ml-2">₹799</span>
        </h3>
        <p className="text-gray-600 text-center text-sm">Get convenience, comfort, and privacy in your self-drive car in Bangalore.</p>
      </div>

      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img src={img2} alt="Attractions" className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h4 className="font-semibold">Discover Bangalore's Local Attractions <span className="ml-2">↗</span></h4>
            <p className="text-gray-600 text-sm mt-2">
              Drive to iconic spots like Lalbagh Gardens, Cubbon Park, and MG Road with Zoomcar Bangalore.
            </p>
          </div>
        </div>

        
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img src={img3} alt="Business Travel" className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h4 className="font-semibold flex items-center">
              Get Cars for Business Travel and Work Meetings 
              <span className="ml-2">↗</span>
            </h4>
            <p className="text-gray-600 text-sm mt-2">
              Navigate seamlessly between meetings & conferences with a self-drive car.
            </p>
          </div>
        </div>

        
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img src={img4} alt="Airport Transfer" className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h4 className="font-semibold flex items-center">
              Seamlessly Access Bangalore Airport Transfers 
              <span className="ml-2">↗</span>
            </h4>
            <p className="text-gray-600 text-sm mt-2">
              Skip the cab queues and get a comfortable car to or from Kempegowda International Airport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangaloreSection;