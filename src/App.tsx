import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Screens
import { LoginScreen } from './screens/login/login.screen';
import { RegisterScreen } from './screens/register/register.screen';

// assets
import logo from './logo.svg';
import './App.css';

// const AppNavigator = createStackNavigator({
//     Login: {
//       screen: LoginScreen
//     },
//     Register: {
//         screen: RegisterScreen
//     }
//   },
//   {
//     initialRouteName: "Login"
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default App;