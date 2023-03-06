import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Screens
import { LoginScreen } from './screens/login/login.screen';
import { RegisterScreen } from './screens/register/register.screen';
import { MapScreen } from './screens/map/map.screen';
import { AdminDashboardScreen } from './screens/admin-dashboard/admin-dashboard.screen';
import { ImageScreen } from './screens/image/image.screen';
import { ImageAdminScreen } from './screens/image/imageAdmin.screen';
import { ProfileScreen } from './screens/profile/profile.screen';
import { SettingsScreen }  from './screens/settings/settings.screen';

// assets
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

const Stack = createNativeStackNavigator();

const App = () => {
  const lastScreen = window.localStorage.getItem('currentPage');
  const [theme,setTheme] = useState("light");

  /* Set the initial screen to the last screen the user was on,
  or the login screen if they haven't been on the app before. */
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState<string>(lastScreen || 'Login');

  useEffect(() => {
    if (theme ==="dark"){
      document.documentElement.classList.add("dark");
    } else{
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // eslint-disable-next-line
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentPage}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="ImageAdmin" component={ImageAdminScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
