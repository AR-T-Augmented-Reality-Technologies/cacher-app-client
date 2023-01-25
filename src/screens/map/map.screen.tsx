import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";


interface MapScreenProps {
    navigation: any;
}

export const MapScreen = ({ navigation }: MapScreenProps) => {
    const [location, setLocation] = useState("");
    const validateForm = (e: any) => {
        e.preventDefault();

        // TODO: Form validation here
        
        return false;
    };

    const submitForm = () => {
        // TODO: Form submit to server using REST API.
        return true;
    };

    return<>
    <h1 className="font-bold underline text-3xl">Map Screen</h1>
        <form>
            <div className = "searchbar">
            <input type="text" id="search" name="SearchBar" value = "Search" onChange={(e) => setLocation(e.target.value)}/><br />
            <button onClick={(e) => {validateForm(e) && submitForm()}}>Search</button>
            </div>
        </form>
        <div className = "options">
            <img id="options" src="images/options.png" onClick={() => {navigation.navigate('MapScreenwithOptions')}}/>  

        </div>
    </>
    };