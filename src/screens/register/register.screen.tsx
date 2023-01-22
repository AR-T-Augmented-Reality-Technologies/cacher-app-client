import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";

import "./register.styles.css";

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

        return false;
    };

    const submitForm = () => {
        return true;
    };

    return <>
        <div className="vline1"></div>
        <div className="vline2"></div>
        <div className="vline3"></div>
        <div style={{"margin": "10px"}}>
                    <button onClick={() => {navigation.navigate('Login')}}>Login</button>
                </div>
        <img className="logo" src={"images/cacherr.png"} alt="cacher logo" style={{"width": "10%"}} />
        <div className="register">
            <form>
                <div className="forminner">
                    <div className="formInput">
                    <label htmlFor="email"> Email: </label>
                    <input type="text" id="email" name="Email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="formInput">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" id="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>	
                    <div className="formInput">
                    <label htmlFor="password_confirm"> Confirm Password: </label>
                    <input type="password" id="password_confirm" name="Password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </div>
                    <div className="formInput">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id="username" name="Username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div style={{"marginBottom": "35px", "marginTop": "35px"}}>
                    <div className="hline"></div>
                    <div className="hline"></div>
                    </div>

                    <div className="formInputBottom">
                    <label htmlFor="name"> Name: </label>
                    <input type="text" id="fname" name="fname" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)}/>
                    <input type="text" id="lname" name="lname" placeholder="Surname" onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                    <div className="formInputBottom">
                    <label htmlFor="dob"> Date of Birth: </label>
                    <input type="date" id="dob" name="dob" onChange={(e) => setDob(e.target.value)}/>
                    </div>
                    <div style={{"marginTop": "35px"}}>
                    <input type="checkbox" id="registerCheckbox" name="registerCheckbox" value="registerAgree" checked={registerCheckbox} onChange={(e) => setRegisterCheckbox(!registerCheckbox)}/>
                    <label htmlFor="registerCheckbox">I agree to my details being processed</label>
                    </div>
                </div>
                <div style={{"margin": "10px"}}>
                    <button onClick={(e) => {validateForm(e) && submitForm()}}>Register</button>
                </div>
            </form>

        
        </div>
    </>
};