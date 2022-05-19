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
        <TouchableOpacity onPress={() => navigation.goBack()}  style={{paddingLeft: 30}}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
          </TouchableOpacity>

        <View style={styles.header}>
            <View style={{flexDirection: 'row', paddingTop: 20}}> 
                <Text style={styles.titleTitle}> Đặt mục tiêu </Text>
            </View>
        </View>

        <View style={styles.footer}>
            <Text style={{fontWeight: "400", fontSize: 16, color: colors.white}}> 
                Vui lòng đặt mục tiêu theo tháng cho bé
            </Text>
            <View style={styles.picker}>

            <Picker style={{borderWidth: 0}}>
                <Picker.Item label="--g/tháng--" value="none" enables="false" />
                <Picker.Item label="4" value="4"/>
                <Picker.Item label="5" value="5"/>
            </Picker>
            </View>
            <View style={styles.content}>
                <Text style={styles.textnormal}>Khoảng khuyến khích cho bé là</Text>
                <Text style={styles.texthigh}> 5 g/tháng </Text>
                <Text style={styles.textnormal}>Chúng tôi đã giới hạn mục tiêu sao cho có hiệu quả mà vẫn đảm bảo sức khỏe cho bé. </Text>
                <Text style={styles.texthigh}> Chúc bạn thành công !</Text>
            </View>
        <TouchableOpacity style={styles.button} onPress={()=>alert("Đăng ký thành công")}><Text style={styles.textButton}>Nhập</Text></TouchableOpacity>
        
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
    footer:{
        marginTop: -90,
        flex:1,
        paddingLeft: 30,
        paddingRight: 30,

      },
    picker:{
        borderWidth: 1.5,
        borderColor: colors.red,
        borderRadius: 10,
        padding: 5,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: colors.white,
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
      content:{
          justifyContent: "center",
          alignItems: 'center',
      },
      textnormal:{
        fontWeight: "600",
        fontSize: 16,
        color: colors.black,
      },
      texthigh:{
        fontWeight: "600",
        fontSize: 16,
        color: colors.red,
      }
  });
export default Signup2


