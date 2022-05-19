import * as React from "react";
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  TextInput,  TouchableOpacity,  ScrollView, Dimensions,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors/colors";

const image = require("../../../assets/image/bgpurple.png");

function LoginChange({navigation}) {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
          </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.titleTitle}> Đổi mật khẩu </Text>
        <Text style={styles.subtt}> Vui lòng nhập mật khẩu mới </Text>

      </View>
      <View style={styles.footer}>
        <Text style={styles.ttinfo}> Mật khẩu </Text>
        <View style={styles.inputInfo}> 
          <FontAwesome5 name="lock"  color={colors.yellow} size={16}/>
          <TextInput
              style={styles.textInput}
              placeholder=""
            />
          
        </View>
        <Text style={styles.ttinfo}> Nhập lại mật khẩu </Text>
        <View style={styles.inputInfo}> 
          <FontAwesome5 name="lock"  color={colors.yellow} size={16}/>
          <TextInput
              style={styles.textInput}
              placeholder=""
            />
          
        </View>
        <TouchableOpacity style={styles.button} onPress={()=> { alert("Đổi mật khẩu thành công"); navigation.navigate("Login")}}><Text style={styles.textButton}>Nhập</Text></TouchableOpacity>
        

      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  header:{
    flex: 1,   
  },
  
  titleTitle: {
    paddingTop: 50,
    paddingLeft: 30, 
    paddingVertical: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  subtt:{
    paddingLeft: 30, 
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },
  footer:{
    flex:1,
    padding: 30,
  },
  ttinfo:{
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: "400",
    fontSize: 16
  },  
  inputInfo:{
    alignItems:'center',
    flexDirection: "row",
    borderRadius: 10,
    borderColor: colors.yellow,
    borderWidth: 1.5,
    paddingLeft:5,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  textInput:{
    padding: 5
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
    borderWidth: 1.5
  },
  textButton:{
    fontWeight: "700",
    fontSize: 16,
    color: colors.white,
  },
});


export default LoginChange
