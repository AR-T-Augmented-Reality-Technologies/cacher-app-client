import React, { useState, useEffect } from "react";
import { Button, View, ImageBackground } from "react-native";

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  // States for Form data
  const [darkMode, setDarkMode] = useState(false);
  const [showPrivate, setPrivate] = useState(false);
  const [showApp, setApp] = useState(false);
  const [currentPage, setCurrentPage] = useState("Settings");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Display options
  const displayPrivate = () => {
    setPrivate(!showPrivate);
  };
  const displayApp = () => {
    setApp(!showApp);
  };

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

  return (
    <>
      <div className="grid grid-cols-8 min-h-screen dark:bg-dback">
        {/* Left column to display the back button*/}
        {/* The arrow icon on back button will only appear when viewed on larger screens due to limited column size on mobile*/}
        <div className="col-start-1 col-span-1 mt-2 ml-2">
          <button
            className="bg-custom-blue dark:bg-dblue hover:bg-custom-blue-hover hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              navigation.navigate("Map");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hidden md:inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Middle column with the logo and register form */}
        <div className="col-start-2 col-span-6">
          <img
            src="images/cacher-logo.png"
            alt="Logo"
            className="w-1/2 md:w-1/6 mx-auto mt-4"
          ></img>
          <form className="">
            <div className="flex flex-col justify-center items-center">
              {showApp ? (
                <>
                  <label
                    className="flex justify-center items-center text-gray-500 font-bold mb-2"
                    onClick={displayApp}
                  >
                    App Settings ▸
                  </label>
                </>
              ) : (
                <>
                  {" "}
                  <label
                    className="text-gray-500 font-bold mb-2 pb-10"
                    onClick={displayApp}
                  >
                    App Settings ▼
                  </label>
                </>
              )}
              {showApp && (
                <div className="pb-10">
                  <button
                    className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={toggleTheme}
                  >
                    {" "}
                    Dark Mode
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center">
              {showPrivate ? (
                <>
                  <label
                    className="block text-gray-500 font-bold mb-2"
                    onClick={displayPrivate}
                  >
                    Privacy Settings ▸{" "}
                  </label>
                </>
              ) : (
                <>
                  {" "}
                  <label
                    className="block text-gray-500 font-bold mb-2 pb-10"
                    onClick={displayPrivate}
                  >
                    Privacy Settings ▼{" "}
                  </label>
                </>
              )}
              {showPrivate && (
                <div className="flex flex-col justify-center items-center">
                  <div className="pb-10">
                    <button
                      className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      {" "}
                      Privatise Profile
                    </button>
                  </div>
                  <label className="block text-gray-500 font-bold mb-2 ">
                    Blocked Users
                  </label>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* A column on the right of the screen to display vertial lines. All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
        <div className="col-start-8 col-span-1 flex h-full">
          <div className="border-r-2 border-custom-orange dark:border-dorange h-full ml-4"></div>
          <div className="border-r-4 border-custom-orange dark:border-dorange h-full ml-5"></div>
          <div className="hidden md:block border-r-8 border-custom-orange dark:border-dorange h-full ml-6"></div>
        </div>
      </div>
    </>
  );
};
