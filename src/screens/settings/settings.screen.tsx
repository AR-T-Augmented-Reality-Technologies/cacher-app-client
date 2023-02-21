import React, {useState} from "react";
import { Button, View, ImageBackground } from "react-native";

interface SettingsScreenProps {
    navigation: any;
}

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
    // States for Form data
    const [darkMode, setDarkMode] = useState(false);
    const [privateMode, setPrivateMode] = useState(false);



    return <>
        <div className="grid grid-cols-8 min-h-screen">

            {/* Left column to display the back button*/}
            {/* The arrow icon on back button will only appear when viewed on larger screens due to limited column size on mobile*/}
            <div className="col-start-1 col-span-1 mt-2 ml-2">

            <button className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigation.navigate('Login')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>Back</button>
            
            </div>

            {/* Middle column with the logo and register form */}
            <div className="col-start-2 col-span-6">
                <img src="images/cacher-logo.png" alt="Logo" className="w-1/2 md:w-1/6 mx-auto mt-4"></img>
                <form className="w-full max-w-sm sm:w-full mt-4 mx-auto">
                    <div className="flex items-center justify-between">
                    </div>
                    <div className="flex mb-8">
                        <h1> App Settings</h1>
                        <input className="form-checkbox accent-custom-blue" type="checkbox" id="darkMode"/>
                        <label className="ml-2" htmlFor="darkMode">Apply Dark Mode</label>
                    </div>
                </form>
                <form className="w-full max-w-sm sm:w-full mt-4 mx-auto">
                    <h1><b>Privacy</b></h1>
                    <div className="flex mb-8">
                        <input className="form-checkbox accent-custom-blue" type="checkbox" id="privateMode"/>
                        <label className="ml-2" htmlFor="darkMode">Private Profile</label>
                    </div>
                    <h1><b>Blocked Users</b></h1>
                </form>
            </div>


            {/* A column on the right of the screen to display vertial lines. All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
            <div className="col-start-8 col-span-1 flex h-full">
            <div className="border-r-2 border-custom-orange h-full ml-4"></div>
            <div className="border-r-4 border-custom-orange h-full ml-5"></div>
            <div className="hidden md:block border-r-8 border-custom-orange h-full ml-6"></div>
        </div>
    </div>
    </>
};