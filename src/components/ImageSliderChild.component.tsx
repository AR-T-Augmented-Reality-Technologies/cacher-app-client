import React from 'react';
import { SplideSlide } from '@splidejs/react-splide';

interface ImageSliderChildProps {
    srcUrl: string
}

export const ImageSliderChild = ({ srcUrl }: ImageSliderChildProps) => {
    return (
        <SplideSlide>
            <img className="h-screen w-screen" src={srcUrl} alt="Image 2"/>
        </SplideSlide>
    );
};