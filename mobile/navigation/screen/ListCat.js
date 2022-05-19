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
  ScrollView,
} from "react-native";

import colors from "../../assets/colors/colors";
import itemCatList from "../../components/notify/itemCatList";
import catData from "../../assets/data/catData";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const image = require("../../assets/image/bggreen.png");

function ListCat({ navigation }) {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
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
        <Text style={{color: colors.white, fontSize: 16, fontWeight: '400', paddingLeft: 20}}> Các bé đang ở bên bạn </Text>
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
              <FontAwesome5 name="plus-circle"  color={colors.downy} size={50}/>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      </ScrollView>
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
  itemWrap: {
    padding: 20,
  },
  addCat:{
      alignItems: "center",
      padding: 30,
  }
});

export default ListCat;
