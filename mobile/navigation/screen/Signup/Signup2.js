import * as React from "react";
import {
  Text,  View,  StyleSheet,  SafeAreaView,  ImageBackground,
  Image,  FlatList,  TouchableOpacity,  ScrollView ,TextInput, Picker,
} from "react-native";
//import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors/colors";

const image = require("../../../assets/image/bgyl.png");

function Signup2({navigation}) {
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
            <View style={{flexDirection: 'row', paddingTop: 20}}> 
                <Text style={styles.titleTitle}> Meowthy </Text>
                <Image 
                    style={styles.logo} 
                    source={require("../../../assets/image/whitelogo.png")}  
                    resizeMode="stretch"
                /> 
            </View>
            <Text style={styles.titleTitle}> Đăng ký</Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.ttinfo}> Tên bé cưng </Text>
            <View style={styles.inputInfo}> 
        <TextInput
            style={styles.textInput}
            placeholder="Email/SĐT"
          />
        </View>
        <View style={{flexDirection:'row', paddingTop: 10, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.ttinfo}> Cân nặng </Text>
        <View style={styles.inputInfo}> 
        <TextInput
            style={styles.textInput}
            placeholder="5.00 (kg)"
        />
        </View>
        </View>
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.ttinfo}> Giới tính </Text>
        <View style={styles.inputInfo}> 
        <Picker style={{borderWidth: 0}}>
            <Picker.Item label="Cái" value="Female"/>
            <Picker.Item label="Đực" value="Male"/>
        </Picker>
        </View>
        </View>
        </View>
        <Text style={styles.ttinfo}> Giống </Text>
        <View style={styles.inputInfo}> 
        <Picker style={{borderWidth: 0}}>
            <Picker.Item label="A" value="A"/>
            <Picker.Item label="B" value="B"/>

        </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SignupGoal")}><Text style={styles.textButton}>Đăng ký</Text></TouchableOpacity>
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
      },

    titleTitle: {
        paddingLeft: 30,
        paddingVertical: 10,
        fontSize: 32,
        fontWeight: "bold",
        color: colors.white,
      },
    logo:{
        justifyContent: 'center',
        alignSelf:'center',
        width: 50,
        height: 50,
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
export default Signup2


