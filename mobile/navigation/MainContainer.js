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

const nameDiary = "Diary";
const nameNotification = "Notification";
const nameUser = "User";
const nameAboutCat = "AboutCat";
const nameExercise = "Exercise";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DiaryStack() {
  return (
    <Stack.Navigator initialRouteName={nameDiary}>
      <Stack.Screen
        name={nameDiary}
        component={Diary}
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

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={nameDiary}
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
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.gray,
        })}
        tabBarOptions={{
          lableStyle: { paddingBottom: 10, fontSize: 10, fontWeight: "bold" },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name={nameDiary}
          component={DiaryStack}
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
