import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";


interface SettingsScreenProps {
    navigation: any;
};

export const SettingsScreen = ({navigation}: SettingsScreenProps) => {
    return <View>
        <h1 className="font-bold underline text-3xl">Settings Screen</h1>
    </View>
}