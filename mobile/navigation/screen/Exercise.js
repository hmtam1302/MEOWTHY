import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import colors from "../../assets/colors/colors";
import RedButton from "../../components/button/redButton";
import BlueButton from "../../components/button/blueButton";

const image = require("../../assets/image/bgyl.png");
const URL = "http://10.0.2.2:3000/";

function Exercise({ route, navigation }) {
  const [value, onChangeText] = React.useState();
  const { diaryId } = route.params;
  console.log(diaryId);

  const putExercise = async (value) => {
    try {
      const res = await axios.put(`${URL}diary/exercise/${diaryId}`, {
        _id: diaryId,
        exercise: value,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            <Text style={styles.titleTitle}>Tập luyện</Text>
          </View>
          <TextInput
            style={styles.inputText}
            multiline
            value={value}
            onChangeText={(text) => onChangeText(text)}
            numberOfLines={11}
            placeholder={
              "Hôm nay bạn và bé đã tập được những gì? Mau ghi lại nào!"
            }
          />
          <View style={styles.buttonWrap}>
            <RedButton title="Hủy" onPress={() => navigation.goBack()} />
            <BlueButton
              title="Lưu"
              onPress={() => {
                putExercise(value);
                navigation.goBack();
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
    padding: 30,
  },

  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 30,
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  redButton: {
    backgroundColor: colors.red,
    borderRadius: 16,
    height: 50,
    width: 120,
  },
  blueButton: {},
  titleTitle: {
    // paddingVertical: 10,
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
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

  text_s13_w600: {
    fontSize: 13,
    fontWeight: "600",
  },
  text_s13_w400: {
    fontSize: 13,
    fontWeight: "400",
  },
  text_s32_w600: {
    fontSize: 32,
    fontWeight: "600",
  },
  text_s16_w600: { fontSize: 16, fontWeight: "bold" },
  text_s13_w600: { fontSize: 13, fontWeight: "bold" },
});

export default Exercise;
