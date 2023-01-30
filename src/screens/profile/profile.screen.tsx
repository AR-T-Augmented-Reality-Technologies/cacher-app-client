import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";

interface ProfileScreenProps {
    navigation: any;
};

export const ProfileScreen = ({navigation}: ProfileScreenProps) => {
    const [enabled, setEnabled] = useState(true);

    // Delete account 
    const deleteAccount = () => {
    };

    // Change profile picture 
    const changeProfilePicture = () => {
    };

    // Edit account details
    const editDetails = () => {
    };

    // Sign out
    const signOut = () => {
    //TODO end session
    navigation.navigate('Login');
    };

    // Display public scrabooks
    const displayPublicSB = () => {
    };

    // Handle edit button action
    const editButtonHandler= () => {
        if(enabled) {
            console.log('Editing enabled');
            
        } 
        else {
            console.log('Editing disabled');

        }
        setEnabled(!enabled);
    };

    // Display private scrabooks
    const displayPrivateSB = () => {
    };

    // Display friends list
    const displayFriendsList = () => {
    };

    // Temporary solution to render placeholder gallery
    const numOfImages = 15;
    const images = [];
    for (let i = 0; i < numOfImages; i++) {
        images.push(
        <button key={i} className="mx-1 my-1" onClick={() => {}}>
            <img src="images/image-placeholder.png" className="border-solid border-2 rounded border-black"></img>
        </button>
        );
    }

    return <>
    <div className="grid grid-cols-5">

        {/* Home button */}
        <button className=" text-black bg-white text-sm font-bold py-1 px-2 rounded-full border-solid border-2 border-black fixed top-2 left-2 " type="button" onClick={() => {navigation.navigate('Map')}}>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-h h-6 inline-block pr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
        1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>Home</button>

        {/* Username, Email and password */}
        <div className="col-start-1 col-span-3 row-start-1 pt-20 pl-5">
        <label className="block text-gray-500 font-bold mb-2" htmlFor="usernameLabel">Username: </label>
        <input className="text-black" type="text" id="username-input" name="usernameInput" disabled={enabled}/>

        <label className="block text-gray-500 font-bold mb-2 pt-6 " htmlFor="emailLabel">Email: </label>
        <input className="text-black" type="email" id="email-input" name="emailLabel" disabled={enabled}/>

        <label className="block text-gray-500 font-bold mb-2 pt-6" htmlFor="paswordLabel">Password: </label>
        <input className="text-black" type="password" id="password-input" name="passwordInput" disabled={enabled}/>
        </div>

        {/* Name and DoB */}
        <div className="col-start-1 col-span-5 row-start-2 pt-6 pl-5 flex h-16">
        <div>
            <label className="block text-gray-500 font-bold mb-2" htmlFor="nameLabel">Name: </label>
            <input className="text-black" type="text" id="name-input" name="nameInput" disabled={enabled}/>
        </div>
        <div className="ml-5">
            <label className="block text-gray-500 font-bold mb-2" htmlFor="dobLabel">Date of Birth: </label>
            <input className="text-black right-0 bg-white" type="date" id="dob-input" name="dobInput" disabled={enabled}/>
        </div>
        </div>

        {/* Profile picture*/}
        <div className="col-start-4 col-span-2 row-start-1 row-span-1 pt-3 pr-5 pb-2">
        <button onClick={changeProfilePicture}><img src="images/avatar-image.jpg" className="border-solid border-2 border-black rounded"></img></button>

        {/* Edit my info button */}
        <button className={` ${enabled ? "bg-gray-400 hover:bg-gray-500" : "bg-green-400 hover:bg-green-500"}  text-white pr-2 pl-2 pb-2 mb-2 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full`} type="button" onClick={editButtonHandler}>{enabled ? "Edit details" : "Save "}</button>

        {/* Sing out button */}
        <button className="bg-gray-400 hover:bg-gray-500 text-white pr-2 pl-2 pb-2 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full" type="button" onClick={signOut}>Sign out </button>

        {/* Delete account button */}
        <button className="bg-red-500 hover:bg-red-700 text-white pr-2 pl-2 pb-2 mt-6 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full" type="button" onClick={deleteAccount}>Delete account </button>
        </div>

        {/* Scrapbooks and friends buttons */}
        <div className="col-start-1 col-span-5 row-start-2 row-span-1 pt-28 pb-3">
        <div className="flex ml-5 mr-5">
        <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32" type="button" onClick={() => displayPublicSB()}>Public Scrabooks</button>
        <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32" type="button" onClick={() => displayPrivateSB()}>Private Scrabooks</button>
        <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm w-32" type="button" onClick={() => displayFriendsList()}>Friends</button>
        </div> 
        </div>
    </div>

        <div className="grid grid-cols-5"></div>
    {/* Gallery to display scrapbooks or friends list */}   
        <div className="grid grid-cols-5 grid-rows-3">
        <div className="row-span-1 col-span-5 h-16">
            <hr className="w-full border-2 border-custom-orange col-span-5 mt-2"/>
            <label className="block text-gray-500 font-bold mb-2 ml-5 mt-2" htmlFor="usernameLabel">Public Scrapbooks </label>
            <hr className="w-full border-2 border-custom-orange col-span-5 mt-2"/>
      </div>
      {images}
    </div>
    
    </>;
}