import React from "react";
import { AsyncStorage } from "react-native";
export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};

export const saveArticle = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
// const value = AsyncStorage.getItem("userId");
