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
            
          <Text style={styles.titleTitle}>Thêm bé mèo </Text>
          
        </View>
        </View>
        <Image style={styles.avatar} source={require("../../assets/image/cat.png")} />
        
        <View style={styles.container}>
            <TextInput style={styles.info}
            placeholder={"Tên bé mèo"}
            />
            <Text style={styles.headertt}>Tuổi</Text>
            <TextInput style={styles.info}
            placeholder={"Tuổi"}
            />
            <Text style={styles.headertt}>Giới tính</Text>
            <TextInput style={styles.info}
            placeholder={"Tên bé mèo"}
            />
            <Text style={styles.headertt}>Giống</Text>
            <TextInput style={styles.info}
            placeholder={"Tên bé mèo"}
            />
            <Text style={styles.headertt}>Cân nặng</Text>
            <TextInput style={styles.info}
            placeholder={"Tên bé mèo"}
            />
            <TextInput
            style={styles.inputText}
            multiline
            value={value}
            onChangeText={(text) => onChangeText(text)}
            numberOfLines={3}
            placeholder={"Viết về bé cưng nào !"}/>

            <View style={styles.blueButton}>
                <BlueButton title="Lưu" onPress={()=>alert("lưu")} />
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
  
  inputText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray,
    borderColor: colors.dark_yellow,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10,
    textAlignVertical: "top",
  },
  info:{
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  blueButton:{
    alignItems: "center",
    paddingTop: 30
  }
});

export default AddCat;
