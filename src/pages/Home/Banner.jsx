import React from "react";

const Banner = () => {
  return (
    <div className="h-[500px] flex items-center p-4">
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-xl">
        <div className="card-body">
          <p>Drive anywhere, anytime with</p>
          <h2 className="text-2xl font-medium">Self-drive car rentals in</h2>

          <fieldset className="fieldset">
            <label className="fieldset-label">Location</label>
            <input type="text" className="input w-full" placeholder="Location" />
            <div className="flex gap-5 ">
              <div className="w-1/2">
                <label className="fieldset-label">Trip Starts</label>
                <input type="date" className="input" placeholder="Start Date" />
              </div>
              <div className="w-1/2">
                <label className="fieldset-label">Trip Ends</label>
                <input type="date" className="input" placeholder="Start Date" />
              </div>
            </div>

            <button className="btn bg-[#4445fb] text-white mt-4 rounded-xl">Search</button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Banner;
