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
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae maiores iure quo enim cum quisquam velit, sit molestias fugit autem? Ab optio unde quibusdam cum saepe odit blanditiis pariatur veritatis tempore quos deserunt harum tempora, consequatur molestias nam a reprehenderit commodi fugit. Repudiandae aperiam maiores inventore blanditiis nam eveniet harum praesentium, nobis iste aliquid quod ea cupiditate vero fuga. Labore.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Sustainability;
