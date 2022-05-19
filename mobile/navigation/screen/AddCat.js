import * as React from "react";
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  FlatList,  TouchableOpacity,  ScrollView, TextInput
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import catData from "../../assets/data/catData";

import BlueButton from "../../components/button/blueButton";

const image = require("../../assets/image/bggreen.png");

function AddCat({ props, navigation }) {
const [value, onChangeText] = React.useState();

const [dataCat, setDataCat] = React.useState(...catData);
return (

    <ImageBackground source={image} style={styles.imageBgContainer}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
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
        <View style={styles.titleWrapper}>
            
          <Text style={styles.titleTitle}>Thêm </Text>
          
        </View>
        </View>
        <Image style={styles.avatar} source={require("../../assets/image/cat.png")} />
        
        <View style={styles.container}>
            <View style={{alignSelf: 'center'}}>
            <TextInput style={styles.info_tt}
            placeholder={dataCat.name}
            />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headertt}>Tuổi</Text>
              <TextInput style={styles.info}
              placeholder={dataCat.age}
              />
              <Text style={styles.headertt}>Giới tính</Text>
              <TextInput style={styles.info}
              placeholder={dataCat.gender}
              />
            </View>
            <View style={styles.divinfo}>
              <Text style={styles.headertt}>Giống</Text>
              <TextInput style={styles.info}
              placeholder={dataCat.kind}
              />
            </View>
            <View  style={styles.divinfo}>
              <Text style={styles.headertt}>Cân nặng</Text>
              <TextInput style={styles.info}
              placeholder={dataCat.weight}
              />
            </View>
            <TextInput
            style={styles.inputText}
            multiline
            value={value}
            onChangeText={(text) => onChangeText(text)}
            numberOfLines={3}
            placeholder={dataCat.about}/>

            <TouchableOpacity style={styles.button} onPress={()=>{alert("thêm thành công"); navigation.navigate("ListCat")}}><Text style={styles.textButton}>Lưu</Text></TouchableOpacity>

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
    paddingLeft: 10,
  },
  
  titleTitle: {
    paddingVertical: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
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
    justifyContent: 'center',
    marginTop: -50,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    height: 450,
    borderRadius: 10,
  },
  divinfo:{
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray,
    borderColor: colors.dark_gray,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: colors.white,
    padding: 10,
    textAlignVertical: "top",
  },
  info:{
    borderBottomColor: colors.dark_gray,
    borderBottomWidth: 1.5,
    marginBottom: 10,
    width: "30%",
  },
  
  info_tt:{
    borderBottomColor: colors.dark_gray,
    borderBottomWidth: 1.5,
    marginBottom: 10,
    width: 150,
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.downy,
    borderColor: colors.downy,
    borderWidth: 1.5,
    marginTop: 20,
  },
  textButton:{
    fontWeight: "700",
    fontSize: 16,
    color: colors.white,
  },
});

export default AddCat;
