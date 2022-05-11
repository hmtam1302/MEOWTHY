import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/colors/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const image = require("../../assets/image/bgpurple.png");

function Calendar({ navigation }) {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("Empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate1 = new Date();
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    console.log(typeof fDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
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
            <Text style={styles.titleTitle}>Nhật ký</Text>
          </View>

          <View>
            <TouchableOpacity
              title="DatePicker"
              onPress={() => {
                showMode("date");
              }}
            >
              <Text>{text}</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
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
  titleTitle: {
    // paddingVertical: 10,
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default Calendar;
