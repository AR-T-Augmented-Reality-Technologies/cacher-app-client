import React from 'react';
import { SplideSlide } from '@splidejs/react-splide';

interface ImageSliderChildProps {
    srcUrl: string
}

export const ImageSliderChild = ({ srcUrl }: ImageSliderChildProps) => {
    return (
        <SplideSlide>
             {/* eslint-disable-next-line */}
            <img className="h-screen w-screen" src={srcUrl}/>
        </SplideSlide>
        
    );
};