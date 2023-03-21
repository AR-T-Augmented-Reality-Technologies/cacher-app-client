import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import { What3wordsAutosuggest } from "@what3words/react-components";
import GoogleMap from "google-maps-react-markers";
import Marker from "../../components/marker";
import mapStyle from "../../mapStyle.json";
import Webcam from "react-webcam";

interface AdmiDashboardProps {
  navigation: any;
}

export const AdminDashboardScreen = ({ navigation }: AdmiDashboardProps) => {
  const API_KEY = process.env.REACT_APP_W3W_API_KEY;
  const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [value, setValue] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);
  const [showOptions, setShowOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState("AdminDashboard");
  const [mapReady, setMapReady] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const [showAddToScrapbook, setShowAddToScrapbook] = useState(false);
  const popupRefFlag = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [showPostMenu, setShowPostMenu] = useState(false);
  const popupRefPost = useRef<HTMLUListElement>(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const popupRefDel = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const openReportsDashboard = () => {
    navigation.navigate('TicketScreen');
  };

  // options when clicked on a post marker
  const postOptions = () => {
    setShowPostMenu(!showPostMenu);
  }

  // pop-up to explain reason for deletion
  const deletePost = () => {
    setShowDeleteMenu(!showDeleteMenu);
  };

  // eslint-disable-next-line
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const [w3wUserLocation, setW3wUserLocation] = useState("");

  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "environment",
  };

  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImageSrc(imageSrc ?? null);
  }, [webcamRef]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationEnabled(false);
      setShowPopup(true);
    } else {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "denied") {
            setLocationEnabled(false);
            setShowPopup(true);
          }
        });
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Dismiss the window when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      popupRefFlag.current &&
      !popupRef.current.contains(event.target as Node) &&
      !popupRefFlag.current.contains(event.target as Node)
    ) {
      setShowMarkerPopup(false);
      setShowAddToScrapbook(false);
    } else if (
      popupRef.current &&
      !popupRefFlag.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
      setShowMarkerPopup(false);
      setShowAddToScrapbook(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // On map load
  const onGoogleApiLoaded = async ({
    map,
    maps,
  }: {
    map: any;
    maps: any;
  }) => {
    maps.event.addListener(map, "zoom_changed", () => {
      const zoomLevel = map.getZoom();
      const scaleFactor = Math.pow(2, zoomLevel) / 2;
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
        map.setCenter({ lat: userLat, lng: userLng });

        const getPlaceholder = async () => {
          const response = await fetch(
            `https://api.what3words.com/v3/convert-to-3wa?key=${API_KEY}&coordinates=${userLat}%2C${userLng}&language=en&format=json`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setW3wUserLocation(data.words);
        };

        getPlaceholder();
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    mapRef.current = map;
    getMarkers();
    setMapReady(true);
  };

  // Get Markers
  const getMarkers = async () => {
    try {
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

      const markers = data.data.books.map(async (book: any) => {
        const bookLocation = book.location;
        const cords = await fetch(
          `https://api.what3words.com/v3/convert-to-coordinates?key=${API_KEY}&words=${bookLocation}&format=json`,
          {
            method: "GET",
          }
        );
        const datacord = await cords.json();
        const lat = datacord.coordinates.lat;
        const lng = datacord.coordinates.lng;
        const marker = {
          lat,
          lng,
          id: bookLocation,
        };
        return marker;
      });

      Promise.all(markers).then((marksarr) => {
        setMarkers(marksarr);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getBlockedSquares = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API_HOST}/scrap/getBlocked`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      return data.data.books;
    } catch (err) {
      console.error(err);
    }
  };

  // On marker click
  const onMarkerClick = (markerId: any, lat: any, lng: any) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
    setShowMarkerPopup(true);
    // navigation.navigate(Image);
  };

  const locBlocker = async (location: string, curr: string) => {
    var locations = location.split(",");

    var haversineOffset = require("haversine-offset");
    var a = {
      latitude: parseFloat(locations[0]),
      longitude: parseFloat(locations[1]),
    };
    var offsetx0 = { x: 0, y: 0 };
    var offsetx1 = { x: 3, y: 0 };
    var offsetx2 = { x: 6, y: 0 };
    var offsetx3 = { x: -3, y: 0 };
    var offsetx4 = { x: -6, y: 0 };

    var offsety0 = { x: 0, y: 0 };
    var offsety1 = { x: 0, y: 3 };
    var offsety2 = { x: 0, y: 6 };
    var offsety3 = { x: 0, y: -3 };
    var offsety4 = { x: 0, y: -6 };

    var h1 = haversineOffset(a, offsetx1);
    var h2 = haversineOffset(a, offsetx2);
    var h0 = haversineOffset(a, offsetx0);
    var h3 = haversineOffset(a, offsetx3);
    var h4 = haversineOffset(a, offsetx4);

    var hocloc = [h1, h2, h0, h3, h4];

    var blockedcoord = [];
    for (var i = 0; i < hocloc.length; i++) {
      var temp = { latitude: hocloc[i].lat, longitude: hocloc[i].lng };
      var tempBlock = haversineOffset(temp, offsety0);
      blockedcoord.push(tempBlock);
      var tempBlock2 = haversineOffset(temp, offsety1);
      blockedcoord.push(tempBlock2);
      var tempBlock3 = haversineOffset(temp, offsety2);
      blockedcoord.push(tempBlock3);
      var tempBlock4 = haversineOffset(temp, offsety3);
      blockedcoord.push(tempBlock4);
      var tempBlock5 = haversineOffset(temp, offsety4);
      blockedcoord.push(tempBlock5);
    }

    var words = [];

    for (var j = 0; j < blockedcoord.length; j++) {
      // console.log("Lat " + blockedcoord[j].lat + "Long" + blockedcoord[j].lng);
      const response = await fetch(
        //Fix this future Albaraa1
        `https://api.what3words.com/v3/convert-to-3wa?key=${API_KEY}&coordinates=${blockedcoord[j].lat}%2C${blockedcoord[j].lng}&language=en&format=json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      words.push(data.words);
    }

    for (var k = 0; k < words.length; k++) {
      const payload = {
        loc: words[k],
        bestloc: words[0],
      };
      const responseget = await fetch(
        `${process.env.REACT_APP_REST_API_HOST}/scrap/setBlocked`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(payload),
        }
      );
    }
  };

  // Adds a marker to the map
  const addMarker = async (location: string) => {
    //Splits the string of lat and lon into an array of 2 elements
    var locations = location.split(",");

    //Gets the w3w value as a string
    const response = await fetch(
      `https://api.what3words.com/v3/convert-to-3wa?key=${API_KEY}&coordinates=${locations[0]}%2C${locations[1]}&language=en&format=json`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    const blocked = await getBlockedSquares();

    // Check if the location is already occupied
    if (blocked.some((item: any) => item.location === data.words)) {
      console.log("A scrapbook already exists here");
      setMessage("A scrapbook already exists here");
      setShowMessage(true);
      return;
    }

    const payload = {
      loc: data.words, //placeholder because currently it is not saving images
    };
    const responseget = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/scrap/setBooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(payload),
      }
    );

    // Block surrounding squares
    locBlocker(location, "");

    console.log("Marker added at: ", data.words);
    setMessage("Scrapbook created");
    setShowMessage(true);

    // Add new marker to the map
    getMarkers();

    // Move map to the new marker
    const map = mapRef.current;
    map.panTo({
      lat: parseFloat(locations[0]),
      lng: parseFloat(locations[1]),
    });
    setShowAddToScrapbook(true);
  };

  const hideTime = new Date().getTime() + 2000;

  const interval = setInterval(() => {
    if (new Date().getTime() > hideTime) {
      setShowMessage(false);
      clearInterval(interval);
    }
  }, 10);

  // Google map component
  return (
    <>
      <GoogleMap
        apiKey={MAP_API_KEY}
        defaultZoom={14}
        defaultCenter={{ lat: 55.911293, lng: -3.321045 }}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        options={{
          styles: mapStyle,
          disableDefaultUI: true, // disable all default controls and buttons
        }}
      >
        {markers.map((marker, idx) => (
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            markerId={marker.id}
            className="marker"
            key={idx}
            onClick={() =>
              onMarkerClick(marker.id, marker.lat, marker.lng)
            }
            scaledSize={new google.maps.Size(32, 32)}
            url="https://i.imgur.com/4Z0ZQ9A.png"
          />
        ))}
      </GoogleMap>
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


      <div className="fixed top-2 left-2">
        <>
          <What3wordsAutosuggest
            api_key={API_KEY}
            onSelected_suggestion={async ({ detail }) => {
              const cords = await fetch(
                `https://api.what3words.com/v3/convert-to-coordinates?key=${API_KEY}&words=${detail.suggestion.words}&format=json`,
                {
                  method: "GET",
                }
              );
              const datacord = await cords.json();
              const lat = datacord.coordinates.lat;
              const lng = datacord.coordinates.lng;
              console.log(
                "navigating to: ",
                lat,
                lng,
                detail.suggestion.words
              );
              mapRef.current.panTo({ lat, lng });
            }}
          >
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              id="w3w"
              type="text"
              value={value}
              onChange={onChange}
              placeholder={`/// ${w3wUserLocation}`}
            />
          </What3wordsAutosuggest>
        </>
      </div>
      <div>
        {showMarkerPopup && (
          <>
            <div
              ref={popupRef}
              className={`${showMarkerPopup ? "opacity-100" : "opacity-0"
                } transition-opacity ease-in-out duration-300`}
            >
              <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/2 bg-white border-solid border-2 p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-2">
                  <div className="col-start-1 justify-self-center">
                    <button
                      className="bg-custom-blue text-white rounded-lg p-2"
                      onClick={() => {
                        navigation.navigate("Image");
                      }}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="mr-1">
                          View
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className="col-start-2 justify-self-center">
                    <button
                      className="bg-custom-blue text-white rounded-lg p-2"
                      onClick={() => {
                        setShowMarkerPopup(false);
                        setShowAddToScrapbook(true);
                      }}
                    >
                      <div className="bg-custom-blue text-white rounded-lg mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 inline-block mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        <span className="mr-1">
                          Add
                        </span>
                      </div>
                    </button>
                  </div>
                  <hr className="my-4 col-start-1 col-span-2" />
                  <div className="col-start-1 col-span-1 text-right pr-4">
                    <label
                      className="font-bold"
                      htmlFor="authorLabel"
                    >
                      Author:
                    </label>
                  </div>
                  <div className="col-start-2 col-span-1 pl-2">
                    <input
                      className="border-none rounded-lg"
                      type="text"
                      id="authorField"
                      value="John Doe"
                      disabled={true}
                    />
                  </div>

                  <div className="col-start-1 col-span-1 text-right pr-4">
                    <label
                      className="font-bold"
                      htmlFor="pagesLabel"
                    >
                      Pages:
                    </label>
                  </div>
                  <div className="col-start-2 col-span-1 pl-2">
                    <input
                      className="border-none rounded-lg"
                      type="text"
                      id="pagesField"
                      value="10"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        {showAddToScrapbook && (
          <>
            <div
              ref={popupRef}
              className={`${showAddToScrapbook ? "opacity-100" : "opacity-0"
                } transition-opacity ease-in-out duration-300`}
            >
              <div className="fixed top-1/3 left-1/3 transform -translate-x-1/4 -translate-y-1/2 bg-white border-solid border-2 p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-2">
                  <div className="col-start-1 justify-self-center inline-flex pr-3 ml-1">
                    <button className="bg-custom-blue text-white rounded-lg p-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-10 h-10"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span className="text-sm">
                          Upload Photo
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className="col-start-2 justify-self-center inline-block pl-3 mr-1">
                    <button
                      className="bg-custom-blue text-white rounded-lg p-2 inline-flex"
                      onClick={capture}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-10 h-10"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                          />
                        </svg>
                        <span className="text-sm">
                          Take a Picture
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className="col-start-1 col-span-2 justify-self-center inline-flex pt-2">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="captured"
                      />
                    ) : (

                      <Webcam
                        audio={false}
                        height={videoConstraints.height}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={videoConstraints.width}
                        videoConstraints={
                          videoConstraints
                        }
                      />

                    )}
                  </div>

                  <div className="col-start-1 col-span-2 justify-self-center inline-flex pt-2 w-full">
                    <input
                      className="border-solid border-2 rounded-lg m-2 p-1 w-full"
                      type="text"
                      id="pagesField"
                      placeholder="Add a caption... (optional)"
                    />
                  </div>
                  <div className="col-start-1 col-span-2 justify-self-center inline-flex pt-2">
                    <button className="bg-custom-orange text-white rounded-lg p-3 inline-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>

                      <span className="mr-1">Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        {showPopup && (
          <div
            className="fixed inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-64 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Geolocation disabled
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You can only view existing
                          scrapbooks. To create a new
                          scrapbook, please enable
                          geolocation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-blue text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showMessage && (
        <>
          {/* Message popup */}
          <div
            className={`${showMessage ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out duration-500`}
          >
            <div className="dark:bg-dback bg-white p-3 rounded-lg shadow-lg fixed bottom-24 right-5 left-5 border-solid border-2 border-black">
              <p className="text-center">{message}</p>
            </div>
          </div>
        </>
      )}

      {/* Add new scrapbook button */}
      <button
        className="dark:text-white dark:bg-dback w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 border-black text-center fixed bottom-2 right-2 transition duration-500 ease-in-out"
        onClick={() => {
          if (!locationEnabled) {
            setShowPopup(true);
          } else {
            navigator.geolocation.getCurrentPosition((position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              addMarker(
                userLocation.lat + "," + userLocation.lng
              );
            });
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mx-auto my-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        New
      </button>
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
        className={`dark:border-dorange dark:bg-dback dark:text-white w-16 h-16 rounded-full text-xs text-black bg-white font-bold border-solid border-2 ${showOptions ? "border-custom-blue" : "border-black"
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
