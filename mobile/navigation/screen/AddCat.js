import React, {useContext, useState} from 'react';
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  FlatList,  TouchableOpacity,  ScrollView, TextInput, Picker
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import catData from "../../assets/data/catData";

import BlueButton from "../../components/button/blueButton";

const image = require("../../assets/image/bggreen.png");

function AddCat({ navigation }) {
const [name, setName] = useState(null);
const [age, setAge] = useState(null);
const [breed, setBreed] = useState(null);
const [weight, setWeight] = useState(null);
const [bio, setBio] = useState(null);
const [sex, setSex] = useState(null);

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
            
        <Text style={styles.titleTitle}>Thêm </Text>
          
        </View>
        <Image style={styles.avatar} source={require("../../assets/image/cat.png")} />
        
        <View style={styles.container}>
            <View style={{alignSelf: 'center'}}>
            <TextInput style={styles.info_tt}
            placeholder="Tên bé"
            value={name}
            onChangeText={text=>setName(text)}
            />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headertt}>Tuổi</Text>
              <TextInput style={styles.info}
              placeholder="tháng tuổi"
              value={age}
              onChangeText={text=>setAge(text)}

              />
              <Text style={styles.headertt}>Giới tính</Text>
              <Picker style={styles.infopicker}
              value={sex}
              onChangeText={(value) => setSex(value)}
                >
                  <Picker.Item label="Cái" value="Cái"/>
                  <Picker.Item label="Đực" value="Đực"/>
              </Picker>
            </View>
            <View style={styles.divinfo}>
              <Text style={styles.headertt}>Giống</Text>
              <TextInput style={styles.info}
              placeholder="Giống mèo"
              value={breed}
              onChangeText={text=>setBreed(text)}
              />
            </View>
            <View  style={styles.divinfo}>
              <Text style={styles.headertt}>Cân nặng</Text>
              <TextInput style={styles.info}
              placeholder="X.XX kg"
              value={weight}
              onChangeText={text=>setWeight(text)}
              />
            </View>
            <TextInput
            style={styles.inputText}
            multiline
            value={bio}
            onChangeText={text => setBio(text)}
            numberOfLines={3}
            placeholder="Viết gì đó về bé nào !"/>

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
    paddingLeft: 30,
    paddingTop: 30,
  },
  
  titleTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  avatar: {
    flex: 1,
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
    backgroundColor: colors.white,
    position: "relative",
    justifyContent: 'center',
    marginTop: -80,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    height: 500,
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
  infopicker:{
    borderColor: colors.white,
    backgroundColor: colors.white,
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
