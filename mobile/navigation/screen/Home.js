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

function Gender (){
  if (dataCat.gender === "Đực") {
    return (
      <FontAwesome5 name="mars"  color={colors.red} size={16}/>
      );
  }
  else{
    return(
      <FontAwesome5 name="venus"  color={colors.red} size={16}/>
    );
  }
}
return (

    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
      <SafeAreaView>
        <View style={styles.titleWrapper}>
        <View style={{alignSelf: 'flex-end', padding: 30}}>
          <TouchableOpacity onPress={() => navigation.navigate("ListCat")} style={{paddingTop: 20}}>
            <FontAwesome5 name="clipboard-list"  color={colors.white} size={30}/>
          </TouchableOpacity>
        </View>
        </View>
        <Image style={styles.avatar} source={require("../../assets/image/cat.png")} />
        
        <View style={styles.container}>
            <View style={{flexDirection:"row", alignSelf: "center", justifyContent: "center"}}>

            <Text style={styles.nameCat}>{dataCat.catName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("UpdateCat")} style={{justifyContent: "center", marginLeft: 10}}>      
              <FontAwesome5 name="pen"  color={colors.black} size={24}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.ageCat}>{dataCat.age} tháng tuổi</Text>
            <Gender />
            </View>
            <Text style={styles.ageCat}> {dataCat.breed} </Text>
            <View style={styles.about}>
                <Text style={styles.ttCat}>Về bé:</Text>
                <Text style={styles.aboutCat}>{dataCat.bio}</Text>
            </View>
            
            <View style={styles.weight}>
                <Text style={styles.ttCat}> Cân nặng hiện tại</Text>
                <Text style={styles.info}>{dataCat.weight[0].catWeight} kg</Text>
            </View>
            <View style={styles.weight}>
                <Text style={styles.ttCat}> Mục tiêu </Text>
                <Text style={styles.info}>{dataCat.goal[0].catGoal} kg</Text>
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
  },
  avatar: {
    marginTop: 80,
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
    flex: 1,
    backgroundColor: colors.white,
    position: "relative",
    marginTop: -80,
    paddingTop: 80,
    width: "100%",
    height: 700,
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
    marginRight: 10,
  },
  aboutCat:{
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },
  about: {
      alignSelf: "center",
      borderWidth: 1.5,
      borderColor: colors.dark_gray,
      borderRadius: 10,
      height: 80,
      width: "85%",
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
    fontWeight: "600",
    color: colors.black,    
  },
  info:{
    fontSize: 24,
    fontWeight: "500",
    color: colors.dark_purple,
  }
});

export default Home;
