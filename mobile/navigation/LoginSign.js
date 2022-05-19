import {
    BottomTabBar,
    createBottomTabNavigator,
  } from "@react-navigation/bottom-tabs";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { NavigationContainer } from "@react-navigation/native";

  import Login from "./screen/Login/Login";
  import Signup from "./screen/Signup/Signup";
  import Onboarding from "./screen/Onboarding";

  import LoginForgot1 from "./screen/Login/LoginForgot1";
  import LoginForgot2 from "./screen/Login/LoginForgot2";
  import LoginChange from "./screen/Login/LoginChange";
  import Signup2 from "./screen/Signup/Signup2";
  import SignupGoal from "./screen/Signup/SignupGoal";

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
      <Stack.Navigator initialRouteName={nameLogin}>
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
          name={nameOnboarding}
          component={Onboarding}
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
      </Stack.Navigator>
      </NavigationContainer>

    );
  }
  
  export default LoginSign;
