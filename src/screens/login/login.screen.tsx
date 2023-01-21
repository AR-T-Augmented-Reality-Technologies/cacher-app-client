import React from "react";
import { Button, View, ImageBackground } from "react-native";

import "./login.styles.css";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {

    return <>
        <div className="vline1"></div>
        <div className="vline2"></div>
        <div className="vline3"></div>
        <img className="logo" src={"images/cacherr.png"} alt="cacher logo" style={{"width": "10%"}} />
        <div className="login">
            <form>
                <div className="forminner">
                    <label htmlFor="email"> Email: </label><br />
                    <input type="text" id="email" name="Email" /><br />
                    <label htmlFor="password"> Password: </label><br />
                    <input type="password" id="password" name="Password" /><br />	
                </div>
                <div style={{"margin": "10px"}}>
                    <button onClick={() => {navigation.navigate('Register')}}>Register</button>
                    <button>Login</button>
                </div>
            </form>
        </div>
    </>
};