import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//const HStack = createNativeStackNavigator();
function DiaryStack() {
  return (
    <Stack.Navigator initialRouteName={nameDiary}>
      <Stack.Screen
        name={nameDiary}
        component={Diary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameFood}
        component={Food}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameAboutCat}
        component={AboutCat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameExercise}
        component={Exercise}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={nameHome}>
      <Stack.Screen
        name={nameHome}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameListCat}
        component={ListCat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameAddCat}
        component={AddCat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={nameUpdateCat}
        component={UpdateCat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={nameHome}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === nameDiary) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (rn === nameNotification) {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (rn === nameUser) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === nameHome) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === nameReport) {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.gray,
        })}
        // tabBarOptions={{
        //   lableStyle: { paddingBottom: 10, fontSize: 10, fontWeight: "bold" },
        //   style: { padding: 10, height: 70 },
        // }}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameHome}
          component={HomeStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameDiary}
          component={DiaryStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameReport}
          component={Report}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameNotification}
          component={Notification}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameUser}
          component={User}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
