import * as React from "react";
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  FlatList,  TouchableOpacity,  ScrollView
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import catData from "../../assets/data/catData";

const image = require("../../assets/image/bggreen.png");

function Home({ navigation }) {

const [dataCat, setDataCat] = React.useState(...catData);
return (

    <ImageBackground source={image} style={styles.imageBgContainer}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
      <SafeAreaView>
        <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("ListCat")}>
            <Image style={{width: 22.5, height: 30}} source={require("../../assets/image/Vector.png")}  />
        </TouchableOpacity>
        </View>
        <Image style={styles.avatar} source={require("../../assets/image/cat.png")} />
        
        <View style={styles.container}>
            <View style={{flexDirection:"row", alignSelf: "center", justifyContent: "center"}}>

            <Text style={styles.nameCat}>{dataCat.name}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdateCat")}
            >
              <Feather
                name="edit-2"
                size={32}
                color={colors.black}
                paddingRight={5}
              />
            </TouchableOpacity>
            </View>
            <Text style={styles.ageCat}>{dataCat.age} tháng tuổi</Text>
            <Text style={styles.ageCat}> {dataCat.kind} </Text>
            <View style={styles.about}>
                <Text style={styles.aboutCat}>Về bé:</Text>
                <Text style={styles.aboutCat}>{dataCat.about}</Text>
            </View>
            
            <View style={styles.weight}>
                <Text style={styles.ttCat}> Cân nặng hiện tại</Text>
                <Text style={styles.info}>{dataCat.weight} kg</Text>
            </View>
            <View style={styles.weight}>
                <Text style={styles.ttCat}> Mục tiêu </Text>
                <Text style={styles.info}>{dataCat.target} kg</Text>
            </View>
             
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
  titleWrapper:{
    
    alignItems: "right",
  },
  avatar: {
    flex: 1,
    marginTop: 150,
    position: "relative",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: colors.white,
    resizeMode: "cover",
    zIndex: 10,
    backgroundColor: colors.dark_gray,
    alignSelf: "center",

  },
  container: {
    backgroundColor: colors.white,
    position: "relative",
    marginTop: -50,
    paddingTop: 50,
    width: "100%",
    height: 450,
    borderRadius: 10,
  },
  nameCat: {
    alignSelf: "center",

    paddingVertical: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.black,
  },
  ageCat: {
    alignSelf: "center",
    fontSize: 16,
    color: colors.dark_gray,
    paddingBottom: 5,
  },
  about: {
      alignSelf: "center",
      borderWidth: 1.5,
      borderColor: colors.dark_gray,
      borderRadius: 10,
      height: 70,
      width: "90%",
      padding: 10,
      paddingBottom: 30,
      margin: 10,    
  },
  weight:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    width: "90%",
    paddingLeft:"10%",
  },
  ttCat:{
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,    
  },
  info:{
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark_purple,
  }
});

export default Home;
