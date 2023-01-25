import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";


interface ImageScreenProps {
    navigation: any;
}

export const ImageScreen = ({ navigation }: ImageScreenProps) => {
    const [location, setLocation] = useState("");

    return <>
        <h1 className="font-bold underline text-3xl">Image Screen</h1>
        {/* <div className = "homebut">
            <button onClick={() => {navigation.navigate('MapScreen')}}>Comment</button>
        </div>
        <div className = "userengage">
            <button onClick={() => {navigation.navigate('LikedImage')}}>Like</button>
            <button onClick={() => {navigation.navigate('ShareImage')}}>Share</button>
            <button onClick={() => {navigation.navigate('Commented')}}>Comment</button>
        </div>
        <div className = "options">
            <img id="options" src="images/options.png" onClick={() => {navigation.navigate('MapScreenwithOptions')}}/>  
        </div>
        <label htmlFor="Caption">Caption:</label>
        <input type="text" id="Caption" name="Caption" placeholder="User Caption"> </input> */}

        {/* TODO: above components break displaying the page. Need to fix. */}
    </>
    };