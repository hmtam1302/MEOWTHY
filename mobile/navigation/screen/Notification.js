import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from "react-native";

import colors from "../../assets/colors/colors";
import itemNotify from "../../components/notify/itemNotify";
import notificationData from "../../assets/data/notificationData";

const image = require("../../assets/image/bgyl.png");

function Notification() {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <SafeAreaView>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTitle}>Thông báo</Text>
        </View>
        <View style={styles.itemWrap}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={notificationData}
            renderItem={itemNotify}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 60,
    marginLeft: 30,
  },
  titleTitle: {
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  itemWrap: {},
});

export default Notification;
