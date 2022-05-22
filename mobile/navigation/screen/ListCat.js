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
      <SafeAreaView>
        <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
        </TouchableOpacity>            
        <Text style={styles.titleTitle}>Danh sách </Text>
          
        </View>
        <Text style={styles.subTitle}> Các bé đang ở bên bạn </Text>
        <View style={styles.itemWrap}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={catData}
            renderItem={itemCatList}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.addCat}>
              <TouchableOpacity onPress={() => navigation.navigate("AddCat")}>
                <FontAwesome5 name="plus-circle"  color={colors.downy} size={50}/>
              </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  titleWrapper:{
    paddingLeft: 30,
    paddingTop: 30,
  },
  
  titleTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  subTitle: {
    color: colors.white, 
    fontSize: 16, 
    fontWeight: '400', 
    paddingLeft: 30, 
    paddingTop: 20, 
    paddingBottom: 10
  },
  itemWrap: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    height: 900,
  },
  addCat:{
      alignItems: "center",
      padding: 30,
  }
});

export default ListCat;
