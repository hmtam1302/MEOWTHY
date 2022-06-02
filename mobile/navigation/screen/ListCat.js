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
import catData from "../../assets/data/catData";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const image = require("../../assets/image/bggreen.png");
const catimage = require("../../assets/image/cat.png");

function ListCat({ navigation }) {
  function itemCatList({item}){
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.catItemWrapper}>
          <View style={styles.leftItem}>
            <Image source={catimage} style={styles.profileImage} />
          </View>
          <View style={styles.rightItem}>
            <View style={styles.topRightItem}>
              <Text style={styles.title}>{item.catName}</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={()=> {alert("delete");}}>
                <Feather name="x" size={16} color={colors.dark_gray} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>

            <View style={styles.weightInfo}>
            <Text style={styles.content}>Hiện tại (kg)</Text>
            <Text style={styles.contenti}>{item.weight[0].catWeight}</Text>
            </View>
            <View style={styles.weightInfo}>
            <Text style={styles.content}>Mục tiêu (kg)</Text>
            <Text style={styles.contenti}>{item.goal[0].catGoal}</Text>
            </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };
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
            keyExtractor={(item) => item._id}
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
    height: 520,
  },
  addCat:{
      alignItems: "center",
      padding: 30,
  },

  //catItem
  catItemWrapper: {
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

export default ListCat;
