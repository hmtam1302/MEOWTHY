import * as React from "react";
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  FlatList,  TouchableOpacity,  ScrollView ,TextInput
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors/colors";

const image = require("../../../assets/image/bgyl.png");

function Signup({navigation}) {
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
        <View style={styles.header}>
            <View style={{flexDirection: 'row', paddingTop: 50}}> 
                <Text style={styles.titleTitle}>Meowthy </Text>
                <Image 
                    style={styles.logo} 
                    source={require("../../../assets/image/whitelogo.png")}  
                    resizeMode="contain"
                /> 
            </View>
            <Text style={styles.titleTitle_s}>Đăng ký </Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.ttinfo}> Tên đăng nhập </Text>
            <View style={styles.inputInfo}> 
        <FontAwesome5 name="user" color={colors.red} size={16}/>
        <TextInput
            style={styles.textInput}
            placeholder="Email/SĐT"
          />
        </View>
        
        <Text style={styles.ttinfo}> Mật khẩu </Text>
        <View style={styles.inputInfo}> 
        <FontAwesome5 name="lock" color={colors.red} size={16}/>
        <TextInput
            style={styles.textInput}
            placeholder="Mật khẩu"
        />
        </View>
        
        <Text style={styles.ttinfo}> Nhập lại mật khẩu </Text>
        <View style={styles.inputInfo}> 
        <FontAwesome5 name="lock" color={colors.red} size={16}/>
        <TextInput
            style={styles.textInput}
            placeholder="Nhập lại mật khẩu"
        />
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Signup2")}><Text style={styles.textButton}>Đăng ký</Text></TouchableOpacity>
        <Text style={styles.hasaccount}>Đã có tài khoản ? <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.login}>Đăng nhập</Text>
        </TouchableOpacity> </Text>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    imageBgContainer: {
      flex: 1,
    },
    header:{
        flex: 1,
        paddingTop: 0,    
      },

    titleTitle: {
        paddingLeft: 30,
        fontSize: 48,
        fontWeight: "400",
        color: colors.white,
      },
    titleTitle_s:{
      paddingLeft: 30,
      fontSize: 32,
      fontWeight: "600",
      color: colors.white,
    },
    logo:{
        justifyContent: 'center',
        alignSelf:'center',
        width: 90,
        height: 90,
      },
    footer:{
        flex:1,
        paddingLeft: 30,
        paddingRight: 30,

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
        borderColor: colors.red,
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
        marginTop: 20,
        justifyContent:'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 16,
        backgroundColor: colors.red,
        borderColor: colors.red,
        borderWidth: 1.5
      },
      textButton:{
        fontWeight: "700",
        fontSize: 16,
        color: colors.white,
      },
      hasaccount:{
        paddingTop: 10,
        fontWeight: "400",
        fontSize: 13,
        color: colors.black,
        alignSelf: 'center',
      },
      login:{
        fontWeight: "600",
        fontSize: 13,
        color: colors.red,
      }
  });
export default Signup


