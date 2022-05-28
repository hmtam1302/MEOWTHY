import React from "react";
import { AsyncStorage } from "react-native";
const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};
// const value = AsyncStorage.getItem("userId");
export default _retrieveData;
