import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";

import "./login.styles.css";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = (e: any) => {
        e.preventDefault();

        // TODO: Form validation here
        
        return false;
    };

    const submitForm = () => {
        // TODO: Form submit to server using REST API.
        return true;
    };

    return <>
        <div className="vline1"></div>
        <div className="vline2"></div>
        <div className="vline3"></div>
        <img className="logo" src={"images/cacherr.png"} alt="cacher logo" style={{"width": "10%"}} />
        <div className="login">
            <form>
                <div className="forminner">
                    <label htmlFor="email"> Email: </label><br />
                    <input type="text" id="email" name="Email" onChange={(e) => setEmail(e.target.value)}/><br />
                    <label htmlFor="password"> Password: </label><br />
                    <input type="password" id="password" name="Password" onChange={(e) => setPassword(e.target.value)} /><br />	
                </div>
                <div style={{"margin": "10px"}}>
                    <button onClick={() => {navigation.navigate('Register')}}>Register</button>
                    <button onClick={(e) => {validateForm(e) && submitForm()}}>Login</button>
                </div>
            </form>
        </div>
    </>
};