import React, { useState } from 'react';
import Carousel1 from "../assets/Carousel1.webp";
import Carousel2 from "../assets/Carousel2.png";
import Carousel3 from "../assets/Carousel3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const DemoCarousel = () => {

    return (
        <Carousel className='mt-[50px]' width={"110%"}  swipeable={true}  showArrows={false} showStatus={false} showIndicators={false} showThumbs={false}>
            <div>
                <img src={Carousel3} alt="Slide 3" />
            </div>
        </Carousel>
    );
};

export default DemoCarousel;
