import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import MainContainer from "./navigation/MainContainer";
import Login from "./navigation/screen/Login/Login";
function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    if (isLoggedIn) return <MainContainer />;
    else return <Login setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
