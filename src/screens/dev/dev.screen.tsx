import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";


interface DevScreenProps {
    navigation: any;
};

export const DevScreen = ({navigation}: DevScreenProps) => {
    return <View>
        <h1 className="font-bold underline text-3xl text-center">Dev navigation panel</h1>
        <h2 className="font-bold text-2xl text-center text-red-500">To be deleted once front-end completed</h2>
        <button onClick={() => {navigation.navigate('Login')}}>Login</button>
        <button onClick={() => {navigation.navigate('Register')}}>Register</button>
        <button onClick={() => {navigation.navigate('Profile')}}>Profile</button>
        <button onClick={() => {navigation.navigate('Map')}}>Map view</button>
        <button onClick={() => {navigation.navigate('Image')}}>Post view</button>
        <button onClick={() => {navigation.navigate('AdminDashboard')}}>AdminDashboard</button>
    </View>
}

// DELETE THIS SCREEN ONCE THE FRONT-END IS COMPLETE !