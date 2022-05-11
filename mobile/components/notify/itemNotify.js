import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

export default function itemNotify({ item }) {
  return (
    <View style={styles.thongBaoIteamWrapper}>
      <View style={styles.leftItem}>
        <Image source={item.image} style={styles.profileImage} />
      </View>
      <View style={styles.rightItem}>
        <View style={styles.topRightItem}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.row}>
            <Text style={styles.date}>{item.date}</Text>
            <Feather name="chevron-right" size={16} color={colors.dark_gray} />
          </View>
        </View>

        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thongBaoIteamWrapper: {
    flexDirection: "row",
    borderBottomColor: colors.gray,
    borderTopColor: colors.gray,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 5,
    backgroundColor: "white",
    flex: 1,
  },
  leftItem: {
    alignSelf: "center",

    paddingRight: 8,
  },
  rightItem: {
    flexDirection: "column",
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },

  topRightItem: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  date: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.dark_gray,
  },
  content: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },
});
