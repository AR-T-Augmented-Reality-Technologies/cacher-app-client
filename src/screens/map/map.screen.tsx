import { useState, useEffect, useRef } from "react";
import {
  What3wordsAutosuggest,
  What3wordsMap,
} from "@what3words/react-components";
import GoogleMap from "google-maps-react-markers";
// import { Marker }§ from "@react-google-maps/api";
import Marker from "../../components/marker";

interface MapScreenProps {
  navigation: any;
}

export const MapScreen = ({ navigation }: MapScreenProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState("Map");
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const [latsarr, setLatsArr] = useState<number[]>([]);
  const [lngsarr, setLngsArr] = useState<number[]>([]);
  const [marksarr, setMarksArr] = useState<string[]>([]);

  let lats = [0];
  let lngs = [0];
  let marks = [""];

  type GoogleMarker = google.maps.Marker;

  const getMarkers = async () => {
    //Gets all scrapbooks
    const response = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/scrap/getBooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const scrapNum = data.data.books.length;

    //Fetches locations for each scrapbook
    for (let i = 0; i < scrapNum; i++) {
      const bookLocation = data.data.books[i].location;
      console.log('lOCAITON ' + bookLocation);
      const cords = await fetch(
        `https://api.what3words.com/v3/convert-to-coordinates?key=276EJMT4&words=${bookLocation}&format=json`,
        {
          method: "GET",
        }
      );
      const datacord = await cords.json(); //gets coordinates

      lats[i] = datacord.coordinates.lat;
      lngs[i] = datacord.coordinates.lng;
      marks[i] = bookLocation;
    }

    setLatsArr(lats); //thanks kacper
    setLngsArr(lngs);
    setMarksArr(marks);
  };

  const onGoogleApiLoaded = async ({ map, maps }: { map: any; maps: any }) => {
    mapRef.current = map;
    await getMarkers();
    setMapReady(true);
  };

  const onMarkerClick = (markerId: any) => {
    navigation.navigate("Image");
  };

  // Store current page in local storage
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Display options
  const displayOptions = () => {
    setShowOptions(!showOptions);
  };

  // Keys
  const API_KEY = process.env.REACT_APP_W3W_API_KEY;
  const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


  //Takes in coordinates
  const addMarker = async (location: string) => {
    //Splits the string of lat and lon into an array of 2 elements
    var locations = location.split(",");
    console.log("We're here")


    //Gets the w3w value as a string
    const response = await fetch(
      //Fix this future Albaraa
      `https://api.what3words.com/v3/convert-to-3wa?key=${API_KEY}&coordinates=${locations[0]}%2C${locations[1]}&language=en&format=json`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    var temp = latsarr.length;

    const payload = {
      loc: data.words, //placeholder because currently it is not saving images
    };
    const responseget = await fetch(`${process.env.REACT_APP_REST_API_HOST}/scrap/setBooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(payload),
    });

    latsarr.push(Number(locations[0]))
    lngsarr.push(Number(locations[1]))
    marksarr.push(data.words);
    
  };

  // print all markers
  return (
    <>
      {mapReady}
      <button onClick={() => addMarker("55.945734,-3.191305")}> Test</button>
      <GoogleMap
        apiKey={MAP_API_KEY}
        defaultCenter={{ lat: 55.911155, lng: -3.321666 }}
        defaultZoom={50}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        Marker
      >
        {latsarr.map((lat, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lngsarr[index]}
            markerId={marksarr[index]}
            onClick={onMarkerClick}
            className="marker"
          />

        ))}

      </GoogleMap>
      {/* options button */}

      <button
        className={`dark:bg-dback w-16 h-16 rounded-full text-xs text-black dark:text-white bg-white font-bold border-solid border-2 ${showOptions
          ? "border-custom-blue dark:border-dorange"
          : "border-black"
          } text-center fixed bottom-2 left-2`}
        onClick={displayOptions}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mx-auto my-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
        Options
      </button>
      {/* options button */}
      <button
        className={`w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 ${showOptions ? "border-custom-blue" : "border-black"
          } text-center fixed bottom-2 left-2`}
        onClick={displayOptions}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mx-auto my-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
        Options
      </button>
      {/* options menu - Display when the Options button is clicked*/}
      {showOptions && (
        <>
          {/* Profile button */}
          <button
            className="dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-40 left-2 transition duration-500 ease-in-out"
            onClick={() => {
              navigation.navigate("Profile");
            }}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6 mx-auto my-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Profile
          </button>

          {/* Settings button */}
          <button
            className="dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-20 left-2 transition duration-500 ease-in-out"
            onClick={() => {
              navigation.navigate("Settings");
            }}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6 mx-auto my-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </button>
        </>
      )}
    </>
  );
};
