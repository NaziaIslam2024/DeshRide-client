import React from 'react';
import CarCategories from '../../components/HomePage/CarCategories';
import TrendingOffers from '../../components/HomePage/TrendingOffers';
import BangaloreSection from '../../components/HomePage/BangaloreSection';
import ExploreSlider from '../../components/HomePage/ExploreSlider';
import Promotion from '../../components/HomePage/Promotion';
import Stories from '../../components/HomePage/Stories';
import DownloadBanner from '../../components/HomePage/DownloadBanner';
import HostBanner from '../../components/HomePage/HostBanner';

const Home = () => {
    return (
        <div>
            <CarCategories></CarCategories>
            <TrendingOffers></TrendingOffers>
            <BangaloreSection></BangaloreSection>
            <ExploreSlider></ExploreSlider>
            <Promotion></Promotion>
            <Stories></Stories>
            <DownloadBanner></DownloadBanner>
            <HostBanner></HostBanner>
        </div>
    );
};

export default Home;