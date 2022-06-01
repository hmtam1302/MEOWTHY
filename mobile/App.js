import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AsyncStorage } from "react-native";

const Stack = createNativeStackNavigator();
import MainContainer from "./navigation/MainContainer";
import LoginSign from "./navigation/LoginSign";
import {AuthContext} from './context/AuthContext';
//import Test from "./context/test";
function App() {
  //return <MainContainer />;
  
  return (
    <AuthContext.Provider>
      <LoginSign />
    </AuthContext.Provider>
  );
}

export default App;
