import React, {useContext, useState} from 'react';
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  TextInput,  TouchableOpacity,  ScrollView, Dimensions,
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors/colors";
import {AuthContext} from '../../../context/AuthContext';

const image = require("../../../assets/image/bgpurple.png");
const URL = "https://meowthy-project.herokuapp.com"
function Login({navigation}) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <View style={styles.header}>
        <Text style={styles.titleTitle}> Đăng nhập </Text>
        <Image 
        style={styles.logo} 
        source={require("../../../assets/image/whitelogo.png")}  
        resizeMode="contain"
        /> 
      </View>
      <View style={styles.footer}>
        <Text style={styles.ttinfo}> Tên đăng nhập </Text>
        <View style={styles.inputInfo}> 
        <FontAwesome5 name="user"  color={colors.yellow} size={16}/>
        <TextInput
            style={styles.textInput}
            placeholder="Email/SĐT"
            value={username}
            onChangeText={text => setUsername(text)}
            />
        </View>
        <Text style={styles.ttinfo}> Mật khẩu </Text>
        <View style={styles.inputInfo}> 
        <FontAwesome5 name="lock" color={colors.yellow} size={16}/>
        <TextInput
            style={styles.textInput}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
        />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("LoginForgot1")} >
          <Text style={styles.forgot}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={()=>login(user, password)}
        >
            <Text style={styles.textButton}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.noaccount}>Chưa có tài khoản ? <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
          <Text style={styles.register}>Đăng ký</Text>
        </TouchableOpacity> </Text>

      </View>
    </ImageBackground>
  );
}
//const {height} = Dimensions.get("window");
//const height_logo = height*0.1;
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
  logo:{
    justifyContent: 'center',
    alignSelf:'center',
    width: 150,
    height: 150,
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
    paddingLeft:10,
    backgroundColor: colors.white
  },
  textInput:{
    padding: 5
  },
  forgot:{
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: "600",
    fontSize: 13,
    color: colors.white,
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
  noaccount:{
    paddingTop: 10,
    fontWeight: "400",
    fontSize: 13,
    color: colors.black,
    alignSelf: 'center',
  },
  register:{
    fontWeight: "600",
    fontSize: 13,
    color: colors.yellow,
  }
});


export default Login
