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

    const displayOptions = () => {
      console.log("Options button clicked");
    };

    // Keys
    // const API_KEY = process.env.W3W_API_KEY;
    // const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    // Temporary solution
    const API_KEY = "08GV0ZDL";
    const MAP_API_KEY = "AIzaSyB76yjKhPw2y6Fmx6Ym5OlOSFnb-HsZQzc";

    return<>
    <What3wordsMap
      api_key={API_KEY}
      map_api_key={MAP_API_KEY}
      zoom={30}
      selected_zoom={30}
      lng={-0.114637} //TODO: Replace with user location
      lat={51.454843} //TODO: Replace with user location
      search_control_position={1}
      map_type_control={false}
      zoom_control={false}
      fullscreen_control={false}
      fullscreen_control_position={3}
      current_location_control_position={9}
      disable_default_ui={true}
      map_type_id="satellite"
      words="motor.pushed.deals"
      marker_icon="images/map-marker.png"
      watch_location={true}
    >
      <div slot="map" style={{ width: "100%", height: "100vh" }} />
      <div slot="search-control" style={{ margin: "10px 0 0 10px" }}>
        <What3wordsAutosuggest>
          <input
            type="text"
            placeholder="Search for location"
            className="rounded-lg w-54 h-9"
            autoComplete="off"
          />
        </What3wordsAutosuggest>

        {/* options button */}
        <button className="w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-2 left-2" onClick={() => {displayOptions()}}><svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto my-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>Options</button>

      </div>
    </What3wordsMap>
    </>
    };