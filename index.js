import React from "react";
import ReactDOM from "react-dom/client";
// require("./index.css");
import reportWebVitals from "./src/reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";
import { store, persistor } from "./src/store";

import { name as appName } from './app.json';
import { AppRegistry } from "react-native";

const root = () => {
  
  return <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
};
// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }


AppRegistry.registerComponent(appName, () => root);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
