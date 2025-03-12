import React from 'react';
import CarCategories from '../../components/HomePage/CarCategories';
import TrendingOffers from '../../components/HomePage/TrendingOffers';
import BangaloreSection from '../../components/HomePage/BangaloreSection';
import ExploreSlider from '../../components/HomePage/ExploreSlider';
import Promotion from '../../components/HomePage/Promotion';
import Stories from '../../components/HomePage/Stories';

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