import React from "react";
import Banner from "./Banner";
import CarCategories from "./CarCategories";
import TrendingOffers from "./TrendingOffers";
import BangaloreSection from "./BangaloreSection";
import ExploreSlider from "./ExploreSlider";
import Promotion from "./Promotion";
import Stories from "./Stories";
import Download from "./Download";
import Host from "./Host";
import FAQ from "./FAQ";
import Testimonial from "./Testimonial";
import ShowUserLocation from "./ShowUserLocation";

import Gallery from "./Gallery";
import Services from "./Services";
import Statistics from "./Statistics";
import WhyChooseUs from "./WhyChooseUs";
import EidCountdown from "./Eid/EidCountdown";
import FloatingStar from "./Eid/FloatingStar";
import TrendingCars from "./TrendingCars";
// import { PricingCard, CheckIcon } from "./PricingCard";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
    {/* <PricingCard></PricingCard> */}
      {/* <FloatingStar></FloatingStar> */}
      <div className="container mx-auto">
        {/* <EidCountdown></EidCountdown> */}
        <Services></Services>
        <TrendingCars></TrendingCars>
        <CarCategories></CarCategories>
        <Statistics></Statistics>
        <TrendingOffers></TrendingOffers>
        <BangaloreSection></BangaloreSection>
        <ExploreSlider></ExploreSlider>
        <Promotion></Promotion>
      </div>

      <Gallery></Gallery>

      <div className="container mx-auto">
        <Stories></Stories>
        <WhyChooseUs></WhyChooseUs>
        <Host></Host>
        <Testimonial></Testimonial>
      </div>

      <ShowUserLocation></ShowUserLocation>
      <div className="container mx-auto">
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
