import * as React from "react";
import { useState } from "react";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";
export default function itemFood({ item }) {
  // const [value, onChangeText] = React.useState();

  return (
    <View style={styles.FoodIteamWrapper}>
      <View style={styles.leftImage}>
        <Image source={item.image} style={styles.imageFood} />
      </View>
      <View style={styles.rightWrapper}>
        <View>
          <Text style={styles.text_s16_w600}>{item.name}</Text>
        </View>
        <View>
          <TextInput
            style={styles.text_s16_w400}
            value={value}
            onChangeText={(text) => onChangeText(text)}
          />
          <Feather name="pencel" size={16} color={colors.black} />
        </View>
        <View style={styles.kcalWrap}>
          <Text style={styles.text_s24_w600}>{item.kcal} Kcal</Text>
        </View>
      </View>
      <Feather
        name="x"
        color={colors.yellow}
        size={16}
        style={{ position: "absolute", right: 5, top: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  FoodIteamWrapper: {
    flex: 1,
    height: 100,
    flexDirection: "row",
    borderColor: colors.dark_yellow,
    marginBottom: 5,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: colors.white,
  },
  leftImage: {
    flex: 3,
    justifyContent: "center",
  },
  imageFood: {
    width: 75,
    height: 55,
    alignSelf: "center",
  },
  rightWrapper: {
    flex: 7,
  },
  text_s16_w600: { fontSize: 16, fontWeight: "600" },
  text_s24_w600: { fontSize: 24, fontWeight: "500" },
  text_s16_w400: {
    width: 50,
    fontSize: 16,
    fontWeight: "400",
    borderBottomWidth: 1.5,
    borderColor: colors.black,
  },
  kcalWrap: {},
});
