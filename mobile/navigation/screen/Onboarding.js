import React from 'react';
import {
  StyleSheet,
  Text,
  View, SafeAreaView,
  StatusBar ,
  Image,ImageBackground,
  TouchableOpacity,
  Dimensions 
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import colors from "../../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";


const slides = [
  {
    key: 1,
    title: 'Chào mừng đến với Meowthy!!!',
    description: 'Meowthy sẽ giúp bạn kiểm soát cân nặng của các bé, giúp các bé không chịu những vấn đề sức khỏe liên quan đến cân nặng để các bé được khỏe mạnh.\nHãy để chúng tôi giới thiệu các chức năng cho bạn nhé.',
    backgroundImage: require('../../assets/image/bgyl.png')
  },
  {
    key: 2,
    title: 'Cài đặt mục tiêu',
    description: 'Thay đổi cân nặng đột ngột không hề tốt cho các bé nên Meowthy đã tạo sẵn cho bạn khoảng thay đổi hợp lý và hiệu quả nè.',
    backgroundImage: require('../../assets/image/bgpurple.png'),
  },
  {
    key: 3,
    title: 'Nhật ký',
    description: 'Cập nhật nhật ký hằng ngày để Meowthy giúp bạn kiểm soát cân nặng các bé nhé!',
    backgroundImage: require('../../assets/image/bggreen.png')
  },
  {
    key: 4,
    title: 'Báo cáo',
    description: 'Hằng tuần Meowthy tạo báo cáo về cân nặng, lượng calo tiêu thụ của các bé và nhận xét giúp bạn có thể điều chỉnh kế hoạch cho các bé.',
    backgroundImage: require('../../assets/image/bgyl.png')
  }
];
const image = require("../../assets/image/whitelogo.png");

function Onboarding({navigation}) {
  
  StatusBar.setBarStyle('light-content', true);
  StatusBar.setBackgroundColor(colors.dark_purple);

  const buttonLabel = (label) => {
    let buttoncolor = colors.black;
    if(label == "Đăng ký"){
        buttoncolor = colors.red;
    };
    return(
      <View style={{
        padding: 12
      }}>
        <Text style={{
          color: buttoncolor,
          fontWeight: '600',
          fontSize: 24,
        }}>
          {label}
        </Text>
      </View>
    )
  }

    return(
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return(
            <ImageBackground source={item.backgroundImage} style={styles.imageBgContainer}>
            <SafeAreaView>
              <View style={{alignSelf: 'flex-end', padding: 10}}>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Feather name="x" size={24} color={colors.white} />

              </TouchableOpacity>
            </View>
              <Image
                source={image}
                style={{
                  marginTop: 50,
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <Text style={{
                marginTop: 20,
                textAlign: 'justify',
                color: colors.black,
                fontSize: 32,
                fontWeight: '400'
              }}>
                {item.title}
              </Text>
              <Text style={{
                textAlign: 'justify',
                paddingTop: 5,
                fontSize: 16,
                fontWeight: '400',
                color: colors.black,
              }}>
                {item.description}
              </Text>
            </SafeAreaView>
            </ImageBackground>
          )
        }}
        activeDotStyle={{
          backgroundColor: colors.dark_yellow,
          width: 30,
        }}
        showPrevButton
        renderNextButton={() => buttonLabel("Tiếp")}
        //renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Đăng ký")}
        renderPrevButton={() => buttonLabel("Trước")}
        onDone={() => {
          navigation.navigate("Signup");
        }}
      />
    )
}

export default Onboarding;

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
    padding: 30,
    height: ScreenHeight,
  },
})