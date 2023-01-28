import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


interface ImageScreenProps {
    navigation: any;
}

export const ImageScreen = ({ navigation }: ImageScreenProps) => {
    const [showText, setShowText] = useState(false);

    const handleClick = () => {
        setShowText(!showText);
    }

    return <>
    <div className="grid grid-cols-1 flex-grow">
    <div className="col-start-1 col-span-1 h-fit flex-grow">
    <div className="relative bg-black">
        {/* Image slider */}
        <Splide hasTrack={ false } aria-label="...">
        <SplideTrack>
        <SplideSlide>
        <img className="w-full" src="images/image1.jpg" alt="Image 1"/>
        </SplideSlide>
        <SplideSlide>
        <img className="w-full" src="images/image2.jpg" alt="Image 2"/>
        </SplideSlide>
        </SplideTrack>
        <div className="splide__arrows">
        </div> 
        </Splide>

        {/* Home button */}
        <button className=" text-black bg-white font-bold py-2 px-4 rounded-full border-solid border-2 border-black absolute top-2 left-2 " type="button" onClick={() => {navigation.navigate('Map')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-h h-6 inline-block pr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
        1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>Home</button>
    </div>
    </div>
    </div>
    </>
    }


//     import React, { useState } from 'react';

// interface Props {}

// const MyComponent: React.FC<Props> = () => {
//   const [showText, setShowText] = useState(false);

//   const handleClick = () => {
//     setShowText(true);
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Click me</button>
//       {showText && <p>Text displayed when button is clicked</p>}
//     </div>
//   );
// };

// export default MyComponent;
