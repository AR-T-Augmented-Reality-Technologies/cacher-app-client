import React from "react";
import { Button, View } from "react-native";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({}: LoginScreenProps) => {
    return <View>
        LoginScreen
        <Button title="Press me" onPress={() => {
            navigation.navigate('Register');
        }}></Button>
    </View>
};