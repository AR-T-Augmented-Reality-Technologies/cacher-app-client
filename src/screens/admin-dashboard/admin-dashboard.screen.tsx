import React from "react";
import { Button, View, ImageBackground } from "react-native";

interface AdminScreenProps {
    navigation: any;
}

export const AdminDashboardScreen = ({ navigation }: AdminScreenProps) => {
    return <>
        <h1 className="font-bold underline text-3xl">Admin dashboard</h1>
        {/* TODO: Create components to add here */}
    </>
};

export default AdminDashboardScreen;