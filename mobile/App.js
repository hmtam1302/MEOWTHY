import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import MainContainer from "./navigation/MainContainer";

function App() {
  return <MainContainer />;
}

export default App;
