import React from "react";
import { Button, View, ImageBackground } from "react-native";

import "./register.styles.css";

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {

    return <>
        <div className="vline1"></div>
        <div className="vline2"></div>
        <div className="vline3"></div>
        <div style={{"margin": "10px"}}>
                    <button onClick={() => {navigation.navigate('Login')}}>Back</button>
                </div>
        <img className="logo" src={"images/cacherr.png"} alt="cacher logo" style={{"width": "10%"}} />
        <div className="register">
            <form>
                <div className="forminner">
                    <div className="formInput">
                    <label htmlFor="email"> Email: </label>
                    <input type="text" id="email" name="Email" placeholder="E-mail"/>
                    </div>
                    <div className="formInput">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" id="password" name="Password" placeholder="Password"/>
                    </div>	
                    <div className="formInput">
                    <label htmlFor="password_confirm"> Confirm Password: </label>
                    <input type="password" id="password_confirm" name="Password" placeholder="Confirm Password"/>
                    </div>
                    <div className="formInput">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id="username" name="Username" placeholder="Username"/>
                    </div>

                    <div style={{"marginBottom": "35px", "marginTop": "35px"}}>
                    <div className="hline"></div>
                    <div className="hline"></div>
                    </div>

                    <div className="formInputBottom">
                    <label htmlFor="name"> Name: </label>
                    <input type="text" id="fname" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" name="lname" placeholder="Surname"/>
                    </div>
                    <div className="formInputBottom">
                    <label htmlFor="dob"> Date of Birth: </label>
                    <input type="date" id="dob" name="dob"/>
                    </div>
                    <div style={{"marginTop": "35px"}}>
                    <input type="checkbox" id="registerCheckbox" name="registerCheckbox" value="registerAgree"/>
                    <label htmlFor="registerCheckbox">I agree to my details being processed</label>
                    </div>
                </div>
                <div style={{"margin": "10px"}}>
                    <button onClick={() => {navigation.navigate('Login')}}>Register</button>
                </div>
            </form>

        
        </div>
    </>
};