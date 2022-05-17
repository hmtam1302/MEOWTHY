import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import colors from "../../assets/colors/colors";
import itemCatList from "../../components/notify/itemCatList";
import catData from "../../assets/data/catData";
import Ionicons from "react-native-vector-icons/Ionicons";

const image = require("../../assets/image/bggreen.png");

function ListCat({ navigation }) {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
            
          <Text style={styles.titleTitle}>Danh sách </Text>
          
        </View>
        <Text style={{color: colors.white, size: 16, weight: 400}}> Các bé đang ở bên bạn </Text>
        <View style={styles.itemWrap}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={catData}
            renderItem={itemCatList}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.addCat}>
            <TouchableOpacity onPress={() => navigation.navigate("AddCat")}>
                <Image style={{width: 30, height: 30}} source={require("../../assets/image/add.png")}  />
            </TouchableOpacity>
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
  addCat:{
      alignItems: "center",
      padding: 30
  }
});

export default ListCat;
