import React, { useState, useRef, useEffect } from "react";
import {
  What3wordsAutosuggest,
  What3wordsMap,
} from "@what3words/react-components";
// eslint-disable-next-line
import { Button, View, ImageBackground } from "react-native";

interface AdmiDashboardProps {
  navigation: any;
}

export const AdminDashboardScreen = ({ navigation }: AdmiDashboardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState("AdminDashboard");
  const [showPostMenu, setShowPostMenu] = useState(false);
  const popupRefPost = useRef<HTMLUListElement>(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const popupRefDel = useRef<HTMLDivElement>(null);

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

  const openReportsDashboard = () => { };

  // options when clicked on a post marker
  const postOptions = () => {
    setShowPostMenu(!showPostMenu);
  }

  // pop-up to explain reason for deletion
  const deletePost = () => {
    setShowDeleteMenu(!showDeleteMenu);
  };

  // Dismiss the window when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRefDel.current && !popupRefDel.current.contains(event.target as Node)) {
      setShowDeleteMenu(false);
    }
    if (popupRefPost.current && !popupRefPost.current.contains(event.target as Node)) {
      setShowPostMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keys
  // const API_KEY = process.env.W3W_API_KEY;
  // const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  // Temporary solution
  const API_KEY = "08GV0ZDL";
  const MAP_API_KEY = "AIzaSyB76yjKhPw2y6Fmx6Ym5OlOSFnb-HsZQzc";

  return (
    <>
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

          {/* Options button */}
          <button
            className={`dark:bg-dback dark:text-white w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 ${showOptions ? "border-custom-blue dark:border-dorange" : "border-black"
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

          {/* default post on map */}
          <button onClick={() => { postOptions() }}>
            <img src="images/map-marker.png" className="rounded-full text-xs font-bold absolute left-48 top-64" alt="marker" />
          </button>

          {/* Reports button */}
          <button>
            {/* eslint-disable-next-line */}
            <img
              src="images/envelope-icon.png"
              onClick={() => {
                openReportsDashboard();
              }}
              className="fixed top-0 right-2"
            />
          </button>
        </div>
      </What3wordsMap>

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

      {/* post menu - Display when a post marker is clicked*/}
      {showPostMenu && (
        <>
          <ul
            ref={popupRefPost}
            className={`${showPostMenu ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out duration-300 text-xs font-bold absolute`}
            id="menu"
            style={{ color: "black", backgroundColor: "white", left: "14rem", top: "18rem", borderRadius: "10px", border: "1px solid grey" }}>
            <li style={{ borderBottom: "1px solid grey", padding: "5px" }}><button onClick={() => { navigation.navigate('ImageAdmin') }}>View</button></li>
            <li style={{ color: "red", padding: "5px" }}><button onClick={() => { deletePost() }}>Delete</button></li>
          </ul>
        </>
      )}

      {/* Pop up to explain reason for deletion */}
      {showDeleteMenu && (
        <>
          <div
            ref={popupRefDel}
            className={`${showDeleteMenu ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out duration-300 left-48 top-64`}
            style={{ color: "rgb(219,219,219)", backgroundColor: "rgb(66,66,66)", position: "fixed", borderRadius: "5px", border: "0.2rem solid rgb(153,0,0)", textAlign: "left", padding: "20px" }}>

            <span>Reason for Deletion</span>

            <br /><br />

            <form action="" method="post" id="reasonForDelete">
              {/* Reason for deleting */}
              <div>
                <select name="reason" id="reason" form="reasonForDelete" required style={{ color: "rgb(69,69,69)", width: "100%" }}>
                  <option value="reason 1">Self injury</option>
                  <option value="reason 2">Harassment or bullying</option>
                  <option value="reason 3">Sale or promotion of drugs</option>
                  <option value="reason 4">Sale or promotion of firearms</option>
                  <option value="reason 5">Nudity or pornography</option>
                  <option value="reason 6">Violence or harm</option>
                  <option value="reason 7">Hate speech or symbols</option>
                  <option value="reason 8">Intellectual property violation</option>
                  <option value="other" selected>other</option>
                </select>
              </div>
              <br />
              {/* If other, explain by text */}
              <div>
                <input type="text" name="otherReason" id="otherReason" placeholder="If other, enter your reason here" style={{ color: "rgb(69,69,69)", width: "100%", borderRadius: "5px" }} />
              </div>
              <br />
              {/* Unique ID of post being deleted */}
              <div>
                <input type="hidden" name="postUniqueID" id="postUniqueID" value={"UNIQUE ID OF POST HERE"} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignContent: "space-between" }}>
                <div style={{ flex: "1" }}>
                  <input type="submit" value="Cancel" onClick={() => { deletePost() }} style={{ cursor: "pointer" }} />
                </div>
                <div style={{ flex: "0" }}>
                  <input type="submit" value="Delete" style={{ cursor: "pointer", color: "rgb(230,0,0)" }} />
                </div>
              </div>

            </form>
          </div>
        </>
      )}
    </>
  );
};
