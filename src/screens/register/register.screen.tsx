import React, {useState} from "react";
import { Button, View, ImageBackground } from "react-native";

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    // States for Form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname]= useState("");
    const [dob, setDob] = useState("");
    const [registerCheckbox, setRegisterCheckbox] = useState(false);

    const validateForm = (e: any) => {
        e.preventDefault(); 
        // TODO: form validation
        return true;
    };

    const submitForm = () => {
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "dob": dob,
            "username": username
        };

        fetch('http://localhost:4000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            // Set our user
            return data;
        }
        );

        navigation.navigate('Login')
    };

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
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="emailLabel">Email</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="email-input" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="usernameLabel">Username</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="username-input" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="passwordLabel">Password</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="password-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="passwordLabel">Confirm Password</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="confirmPassword-input" type="password" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between">
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="fnameLabel">First Name</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="fname-input" type="text" onChange={(e) => setFirstname(e.target.value)}/>
                    </div>
                    <div className="ml-6 mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="lnameLabel">Last Name</label>
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="lname-input" type="text" onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="dobLabel">Date of Birth</label>
                        <input className="bg-gray-200 appearance-none border-2 h-10 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue" id="dob-input" type="date" onChange={(e) => setDob(e.target.value)}/>
                    </div>
                    <div className="flex mb-8">
                        <input className="form-checkbox accent-custom-blue" type="checkbox" id="registerCheckbox" onChange={(e) => setRegisterCheckbox(e.target.checked)}/>
                        <label className="ml-2" htmlFor="registerCheckbox">I agree to my details being registered</label>
                    </div>
                    <div className="flex justify-center mb-8">
                        <button className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" type="button" onClick={(e) => {validateForm(e) && submitForm()}}>Register</button>
                    </div>
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