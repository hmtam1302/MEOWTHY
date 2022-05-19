import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import MainContainer from "./navigation/MainContainer";
import LoginSign from "./navigation/LoginSign";
function App() {
  return <MainContainer />;
  //return <LoginSign />;
}

export default App;
