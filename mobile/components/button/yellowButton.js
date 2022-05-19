import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import colors from "../../assets/colors/colors";

export default function BlueButton(props) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: colors.yellow,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: colors.white,
  },
});
