import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AsyncStorage } from "react-native";

const Stack = createNativeStackNavigator();

import MainContainer from "./navigation/MainContainer";
import LoginSign from "./navigation/LoginSign";
function App() {
  return <MainContainer />;
  //return <LoginSign />;
}

export default App;
