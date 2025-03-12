import React from 'react';
import CarCategories from '../../components/HomePage/CarCategories';
import TrendingOffers from '../../components/HomePage/TrendingOffers';
import BangaloreSection from '../../components/HomePage/BangaloreSection';
import ExploreSlider from '../../components/HomePage/ExploreSlider';

const Home = () => {
    return (
        <div>
            <CarCategories></CarCategories>
            <TrendingOffers></TrendingOffers>
            <BangaloreSection></BangaloreSection>
            <ExploreSlider></ExploreSlider>
        </div>
    );
};

export default Home;