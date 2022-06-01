import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import MainContainer from "./navigation/MainContainer";
import LoginSign from "./navigation/LoginSign";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return <MainContainer />;

  return;
  // <AuthProvider>
  //   <LoginSign />
  // </AuthProvider>;
}

export default App;
