import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Screens
import { LoginScreen } from './screens/login/login.screen';
import { RegisterScreen } from './screens/register/register.screen';
import { MapScreen } from './screens/map/map.screen';
import { AdminDashboardScreen } from './screens/admin-dashboard/admin-dashboard.screen';
import { ImageScreen } from './screens/image/image.screen';
import { ProfileScreen } from './screens/profile/profile.screen';

// assets
import logo from './logo.svg';
import './App.css';

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="Image" component={ImageScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default App;