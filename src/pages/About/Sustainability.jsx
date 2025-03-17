import React from "react";
import { Link } from "react-router";
import sustainability from "../../assets/Images/about/Sustainability.jpg"
const Sustainability = () => {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2  p-20 gap-20 mb-[100px]">
        <div>
          <img src={sustainability} alt="" />
        </div>
        <div>
          <h3 className="text-4xl font-medium py-10">Sustainability</h3>
          <p>
            Uber is committing to becoming a fully electric, zero-emission
            platform by 2040, with 100% of rides taking place in zero-emission
            vehicles, on public transit, or with micromobility. It is our
            responsibility as the largest mobility platform in the world to more
            aggressively tackle the challenge of climate change. We will do this
            by offering riders more ways to ride green, helping drivers go
            electric, making transparency a priority and partnering with NGOs
            and the private sector to help expedite a clean and just energy
            transition.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Sustainability;
