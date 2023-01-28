import React, { useState } from "react";
import { What3wordsAutosuggest, What3wordsMap } from "@what3words/react-components";
import { Button, View, ImageBackground } from "react-native";
import { config } from "dotenv";


interface MapScreenProps {
    navigation: any;
}

export const MapScreen = ({ navigation }: MapScreenProps) => {
    const [location, setLocation] = useState("");
    const [value, setValue] = useState("");

    // Keys
    const API_KEY = process.env.W3W_API_KEY;
    const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

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
    <What3wordsMap
      api_key={API_KEY}
      map_api_key={MAP_API_KEY}
      zoom={18}
      selected_zoom={20}
      lng={-0.114637} //TODO: Replace with user location
      lat={51.454843} //TODO: Replace with user location
      search_control_position={1}
      map_type_control={true}
      zoom_control={true}
      fullscreen_control={true}
      fullscreen_control_position={3}
      current_location_control_position={9}
      disable_default_ui={true}
      map_type_id="satellite"
      words="filled.count.soap"
    >
      <div slot="map" style={{ width: "100%", height: "97vh" }} />
      <div slot="search-control" style={{ margin: "10px 0 0 10px" }}>
        <What3wordsAutosuggest>
          <input
            type="text"
            placeholder="Find your address"
            style={{ width: "300px" }}
            autoComplete="off"
          />
        </What3wordsAutosuggest>
      </div>
    </What3wordsMap>
        {/* <What3wordsAutosuggest api_key="2EKIDB1X">
            <input
            id="w3w"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
      </What3wordsAutosuggest> */}
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