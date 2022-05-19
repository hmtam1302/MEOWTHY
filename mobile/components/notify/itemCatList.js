import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

export default function itemCatList({ item }) {
  return (
    <View style={styles.thongBaoIteamWrapper}>
      <View style={styles.leftItem}>
        <Image source={item.image} style={styles.profileImage} />
      </View>
      <View style={styles.rightItem}>
        <View style={styles.topRightItem}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={()=> {alert("delete");}}>
            <Feather name="x" size={16} color={colors.dark_gray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>

        <View style={styles.weightInfo}>
        <Text style={styles.content}>Hiện tại (kg)</Text>
        <Text style={styles.contenti}>{item.weight}</Text>
        </View>
        <View style={styles.weightInfo}>
        <Text style={styles.content}>Mục tiêu (kg)</Text>
        <Text style={styles.contenti}>{item.target}</Text>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thongBaoIteamWrapper: {
    flexDirection: "row",
    borderColor: colors.purple,
    borderRadius: 10,
    borderWidth: 1.5,
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 5,
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    margin: 5
  },
  leftItem: {
    alignSelf: "center",
    paddingLeft: 10,
    paddingRight: 15,
    
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
    backgroundColor: colors.dark_gray,
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
  weightInfo:{
    paddingRight: "10%",
    alignItems: "center"
  },
  content: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.black,
  },
  contenti:{
    fontSize: 24,
    fontWeight: "500",
    color: colors.black,
  }
});
