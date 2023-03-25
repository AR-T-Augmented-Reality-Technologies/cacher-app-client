import React from 'react';
import { SplideSlide } from '@splidejs/react-splide';

interface ImageSliderChildProps {
    srcUrl: string;
    idx: number;
}

export const ImageSliderChild = ({ srcUrl, idx }: ImageSliderChildProps) => {
    return (
        <SplideSlide >
             {/* eslint-disable-next-line */}
            <img className="h-screen w-screen" src={srcUrl} key={idx}/>
        </SplideSlide>
        
    );
};