import React from 'react';
import Banner from './Banner';
import CarCategories from './CarCategories';
import TrendingOffers from './TrendingOffers';
import BangaloreSection from './BangaloreSection';
import ExploreSlider from './ExploreSlider';
import Promotion from './Promotion'
import Stories from './Stories';
import Download from './Download';
import Host from './Host';
import FAQ from './FAQ';
import Testimonial from './Testimonial';
import Gallery from './Gallery';

const Home = () => {
    return (

        <div className=''>
            <Banner></Banner>
            <div className='container mx-auto'>
                <CarCategories></CarCategories>
                <TrendingOffers></TrendingOffers>
                <BangaloreSection></BangaloreSection>
                <ExploreSlider></ExploreSlider>
                <Promotion></Promotion>
                <Gallery></Gallery>
                <Stories></Stories>
                <Download></Download>
                <Host></Host>
                <Testimonial></Testimonial>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;