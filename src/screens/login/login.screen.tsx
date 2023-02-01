import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = (e: any) => {
        e.preventDefault();

        // TODO: Form validation here
        return true;
    };

    const submitForm = () => {
        // TODO: Form submit to server using REST API.
        const payload = {
            email: email,
            password: password
        };

        fetch('http://localhost:4000/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
            // Set our user
            console.log(data);
            const token = data.token;
        });

        navigation.navigate('Map');
    };

    return <>
        <div className="grid grid-cols-8 min-h-screen">
            {/* Middle column with the logo and login form */}
            <div className="col-start-2 col-span-6">
                <img src="images/cacher-logo.png" alt="Logo" className="w-1/2 md:w-1/6 mx-auto mt-4"></img>
                <form className="w-full max-w-sm sm:w-full mt-6 mx-auto">
                    <div className="mb-6">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="emailLabel">Email</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="email-input" type="email"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="passwordLabel">Password</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="password-input" type="password"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" type="button" onClick={(e) => {validateForm(e) && submitForm()}}>Sign In</button>
                        <button className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigation.navigate('Register')}}>Register</button>
                    </div>
                </form>
            </div>
            {/* A column on the right of the screen to display vertial lines.
            All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
            <div className="col-start-8 col-span-1 flex h-full">
            <div className="border-r-2 border-custom-orange h-full ml-4"></div>
            <div className="border-r-4 border-custom-orange h-full ml-5"></div>
            <div className="hidden md:block border-r-8 border-custom-orange h-full ml-6"></div>
            </div>
        </div>
    </>
};