import React from 'react';
import CarCategories from './CarCategories';
import TrendingOffers from './TrendingOffers';
import BangaloreSection from './BangaloreSection';
import ExploreSlider from './ExploreSlider';
import Promotion from './Promotion'
import Stories from './Stories';
import Download from './Download';
import Host from './Host';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <CarCategories></CarCategories>
            <TrendingOffers></TrendingOffers>
            <BangaloreSection></BangaloreSection>
            <ExploreSlider></ExploreSlider>
            <Promotion></Promotion>
            <Stories></Stories>
            <Download></Download>
            <Host></Host>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;