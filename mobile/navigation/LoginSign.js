import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React, {useContext} from 'react';

import Login from "./screen/Login/Login";
import Signup from "./screen/Signup/Signup";
import Onboarding from "./screen/Onboarding";

import LoginForgot1 from "./screen/Login/LoginForgot1";
import LoginForgot2 from "./screen/Login/LoginForgot2";
import LoginChange from "./screen/Login/LoginChange";
import Signup2 from "./screen/Signup/Signup2";
import SignupGoal from "./screen/Signup/SignupGoal";

import {AuthContext} from '../context/AuthContext';

import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../assets/colors/colors";

import Diary from "./screen/Diary";
import Notification from "./screen/Notification";
import User from "./screen/User";
import AboutCat from "./screen/AboutCat";
import Exercise from "./screen/Exercise";
import Home from "./screen/Home";
import ListCat from "./screen/ListCat";
import AddCat from "./screen/AddCat";
import UpdateCat from "./screen/UpdateCat";
import Food from "./screen/Food";
import Report from "./screen/Report";
  
const nameDiary = "Nhật ký";
const nameNotification = "Thông Báo";
const nameUser = "Tôi";
const nameFood = "Food";
const nameReport = "Báo cáo";

const nameAboutCat = "AboutCat";
const nameExercise = "Exercise";
const nameHome = "Home";
const nameListCat = "ListCat";
const nameAddCat = "AddCat";
const nameUpdateCat = "UpdateCat";

const nameLogin = "Login";
const nameSignup = "Signup";
const nameSignup2 = "Signup2";
const nameSignupGoal = "SignupGoal";

const nameOnboarding = "Onboarding";
const nameLogin1 = "LoginForgot1";
const nameLogin2 = "LoginForgot2";
const nameLoginChange = "LoginChange";

const Stack = createNativeStackNavigator();

function LoginSign() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={nameOnboarding}>
      <Stack.Screen
        name={nameLogin}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameSignup}
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameSignup2}
        component={Signup2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameSignupGoal}
        component={SignupGoal}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={nameLogin1}
        component={LoginForgot1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameLogin2}
        component={LoginForgot2}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={nameLoginChange}
        component={LoginChange}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={nameOnboarding}
        component={Onboarding}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default LoginSign;
