import React from 'react';
import CarCategories from './CarCategories';
import TrendingOffers from './TrendingOffers';
import BangaloreSection from './BangaloreSection';
import ExploreSlider from './ExploreSlider';
import Promotion from './Promotion'
import Stories from './Stories';

const Home = () => {
    return (
        <div>
            <CarCategories></CarCategories>
            <TrendingOffers></TrendingOffers>
            <BangaloreSection></BangaloreSection>
            <ExploreSlider></ExploreSlider>
            <Promotion></Promotion>
            <Stories></Stories>
        </div>
    );
};

export default Home;