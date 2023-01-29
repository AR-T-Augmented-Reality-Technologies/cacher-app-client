import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface ImageScreenProps {
    navigation: any;
}

export const ImageScreen = ({ navigation }: ImageScreenProps) => {

    // Share post
    const sharePost = () => {
    };

    // Like post
    const likePost = () => {
    };

    // Comment post
    const commentPost = () => {
    };

    // Display comments
    const displayComments = () => {
    };

    // Display options
    const displayOptions = () => {
    };
    
    return <>
    <div>
        {/* Image slider */}
        <div>
        <Splide aria-label="Image carousel" options={{arrows: false, pagination: false, autoHeight: true}}>
        <SplideSlide>
        <img className="h-screen w-screen" src="images/image1.jpg" alt="Image 1"/>
        </SplideSlide>
        <SplideSlide>
        <img className="h-screen w-screen" src="images/image2.jpg" alt="Image 2"/>
        </SplideSlide>
        </Splide>
        </div>

        {/* Home button */}
        <button className=" text-black bg-white text-sm font-bold py-1 px-2 rounded-full border-solid border-2 border-black fixed top-2 left-2 " type="button" onClick={() => {navigation.navigate('Map')}}>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-h h-6 inline-block pr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
        1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>Home</button>

        {/* share button */}
        <button className="w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-40 right-2" onClick={() => {sharePost()}}><svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto my-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg> Share</button>

        {/* like button */}
        <button className="w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-20 right-2" onClick={() => {likePost()}}><svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto my-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
        </svg>Like</button>

        {/* comment button */}
        <button className="w-16 h-16 rounded-full text-tiny text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-2 right-2" onClick={() => {commentPost()}}><svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto my-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>Comment</button>

        {/* options button */}
        <button className="w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-2 left-2" onClick={() => {displayOptions()}}><svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto my-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>Options</button>

        {/* bottom comment */}
        <button className="h-16 bg-white border-solid border-2 border-black fixed bottom-0 left-20 right-20 rounded-t-3xl border-b-0" onClick={displayComments}>
        <div className="grid grid-rows-2">
            <div className="row-start-1">
            <div className="pt-2 px-2 text-s">Your pets are so cute!</div>
            </div>
            <div className="row-start-2">
            <div className="pb-2 px-2 text-s text-right">- User123</div>
            </div>
        </div>
        </button>
    </div>
    </>
    }
