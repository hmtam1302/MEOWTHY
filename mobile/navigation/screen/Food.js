import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import categoriesData from "../../assets/data/categoriesData";
import popularData from "../../assets/data/popularData";
import colors from "../../assets/colors/colors";
const image = require("../../assets/image/bgyl.png");

function Food({}) {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <Ionicons
            name="arrow-back-outline"
            size={32}
            color={colors.white}
            style={{ paddingTop: 20 }}
          />

          <View style={styles.titleWrapper}>
            <Text style={styles.titleTitle}>Tập luyện</Text>
          </View>

          <Text style={styles.subTitle}>Bạn đã cho bé ăn gì hôm nay nào?</Text>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
    padding: 30,
  },

  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 30,
  },

  titleTitle: {
    // paddingVertical: 10,
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },

  text_s13_w600: {
    fontSize: 13,
    fontWeight: "600",
  },
  text_s13_w400: {
    fontSize: 13,
    fontWeight: "400",
  },
  text_s32_w600: {
    fontSize: 32,
    fontWeight: "600",
  },
  text_s16_w600: { fontSize: 16, fontWeight: "bold" },
  text_s13_w600: { fontSize: 13, fontWeight: "bold" },
});

export default Food;
