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
  RefreshControl,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";
import diaryData from "../../assets/data/diaryData";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const image = require("../../assets/image/bgpurple.png");

function Diary({ navigation }) {
  // ---------------const-----------------------
  const catId = "6295d99ed9e2de2d088600dc";
  const URL = "https://meowthy-project.herokuapp.com/";
  const day = new Date();
  const today =
    day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();

  // ------------------useState---------------------

  const [data, setData] = React.useState(diaryData);
  const [listDiary, setListDiary] = React.useState([]);
  const [diaryId, setDiaryId] = React.useState("");

  const [compare, setCompare] = React.useState(true);

  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [dayTitle, setDayTitle] = React.useState("Hôm nay");
  const [count, setCount] = React.useState(0);
  const [valueWater, onChangeValueWater] = React.useState(data.water_amount);

  const [refreshing, setRefreshing] = React.useState(false);

  // ------------------function-----------------------

  //pick day
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setDayTitle(fDate);
    compareDay(today, fDate);
  };

  //compare
  const compareDay = (today, pickerDay) => {
    if (today === pickerDay) setCompare(true);
    else setCompare(false);
  };

  // refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListDiary();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleAddDiary = (today) => {
    const todayDiary = listDiary.find((element) => element.date === today);
    if (count == 1) {
      if (todayDiary) {
        console.log("inside if set data && get diaryID", count);
        setCount(count + 1);
      } else {
        console.log("dont have diary today, add new");
        addDiary();
      }
    }
    if (count > 1) {
      setData(todayDiary);
      setDiaryId(todayDiary._id);
    }
  };

  // ----------------call API-----------------
  // get list food

  // get list diary
  const getListDiary = async () => {
    try {
      const resListDiary = await axios
        .get(`${URL}diary/list-diary/${catId}`)
        .then((res) => {
          setListDiary(res.data.data);
          setCount(count + 1);
        });
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  };

  // post diary
  const addDiary = async () => {
    try {
      const res = await axios
        .post(`${URL}diary/add-diary/${catId}`, {})
        .then(() => getListDiary());
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  };
  //  put water_amount
  const putWater = async (valueWater) => {
    try {
      const res = await axios.put(
        `${URL}diary/change-water-amount/${diaryId}`,
        {
          amount: valueWater,
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getListDiary();
  }, []);

  React.useEffect(() => {
    handleAddDiary(today);
  }, [count]);

  console.log(count, "data", data._id);

  // -------------------------
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleTitle}>Nhật ký</Text>
            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}
            >
              <Feather
                name="calendar"
                size={32}
                color={colors.white}
                paddingRight={5}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.date}>{dayTitle}</Text>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              display="default"
              onChange={onChange}
            />
          )}

          {/* wrapper 1 */}
          <View style={styles.boxWrapper}>
            {/* thức ăn */}

            <TouchableOpacity
              onPress={() => {
                compare
                  ? navigation.navigate("Food", {
                      diaryId: diaryId,
                    })
                  : false;
              }}
            >
              <View style={styles.boxtItem}>
                <View style={styles.boxWrapperLeft}>
                  <View style={styles.boxWrapperTop}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text_s16_w600}>Thức ăn </Text>
                      <Text style={styles.text_s13_w600}>(Kcal)</Text>
                    </View>

                    <Text style={styles.text_s32_w600}>200</Text>
                    <Text style={styles.text_s13_w400}>Cả ngày</Text>
                  </View>
                  <View style={styles.boxWrapperBottom}>
                    <Text style={styles.text_s13_600}>Mục tiêu </Text>
                    <Text style={styles.text_s16_w600}>300</Text>
                  </View>
                </View>
                <View style={styles.boxWrapperRight}>
                  <Feather
                    name="chevron-right"
                    size={32}
                    color={colors.black}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* cân nặng */}
            <View style={styles.boxtItem}>
              <View style={styles.boxWrapperLeft}>
                <View style={styles.boxWrapperTop}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text_s16_w600}>Cân nặng </Text>
                    <Text style={styles.text_s13_w600}>(Kg)</Text>
                  </View>

                  <Text style={styles.text_s32_w600}>X.XX</Text>
                  <Text style={styles.text_s13_w400}>XX tháng XX</Text>
                </View>
                <View style={styles.boxWrapperBottom}>
                  <Text style={styles.text_s13_600}>Mục tiêu </Text>
                  <Text style={styles.text_s16_w600}>X.XX</Text>
                </View>
              </View>
              <View style={styles.boxWrapperRight}>
                <Feather name="chevron-right" size={32} color={colors.black} />
              </View>
            </View>
          </View>
          {/* wrapper 2 */}
          <View style={styles.boxWrapperLine2}>
            {/* tập luyện */}
            <TouchableOpacity
              onPress={() => {
                compare
                  ? navigation.navigate("Exercise", {
                      diaryId: diaryId,
                    })
                  : false;
              }}
            >
              <View style={styles.boxtItem}>
                <View style={styles.boxWrapperLeftLine2}>
                  <View style={styles.boxWrapperTop}>
                    <Text style={styles.text_s16_w600}>Tập luyện </Text>
                  </View>
                  <View>
                    <Text style={[styles.text_s13_w400, styles.tapluyenNote]}>
                      {data.exercise}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxWrapperRight}>
                  <Feather
                    name="chevron-right"
                    size={32}
                    color={colors.black}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* nước */}
            <View style={styles.boxtItem}>
              <View style={styles.boxWrapperLeft}>
                <Text style={styles.text_s16_w600}>Nước</Text>
                <View style={[styles.boxWrapperTop, styles.circle]}>
                  <Text style={[styles.text_s16_w600, styles.center]}>
                    {data.water_amount / 2}%
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={styles.inputText}
                    editable={compare}
                    selectTextOnFocus={compare}
                    onChangeText={(text) => onChangeValueWater(text)}
                    value={valueWater}
                    onBlur={() => {
                      putWater(valueWater);
                      wait(5000).then(() => onRefresh());
                    }}
                    placeholder={`${data.water_amount}`}
                  />
                  <Text style={styles.text_s13_w400}>
                    {" "}
                    / {data.water_amount}
                  </Text>
                </View>
              </View>
              <View style={styles.boxWrapperRight}>
                <Feather name="chevron-right" size={32} color={colors.black} />
              </View>
            </View>
          </View>

          {/* về bé */}
          <TouchableOpacity
            onPress={() => {
              compare
                ? navigation.navigate("AboutCat", {
                    diaryId: diaryId,
                  })
                : false;
            }}
          >
            <View style={styles.boxtItemVeBe}>
              <View style={styles.boxWrapperLeft}>
                <View style={styles.boxWrapperTop}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text_s16_w600}>Về bé </Text>
                  </View>

                  <Text style={styles.text_s13_w400}>{data.about}</Text>
                </View>
              </View>
              <View style={styles.boxWrapperRight}>
                <Feather name="chevron-right" size={32} color={colors.black} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={[styles.text_s13_w600, styles.redTextsuggest]}>
            Tham khảo chế độ dinh dưỡng và bài tập cho bé
          </Text>
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
    marginTop: 30,
  },

  titleTitle: {
    paddingVertical: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  date: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
    marginBottom: 8,
  },

  boxtWhite: {},
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

  boxWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  boxWrapperLine2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  boxtItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 145,
    height: 145,
    borderRadius: 16,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  boxWrapperLeft: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxWrapperLeftLine2: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 10,
    flexDirection: "column",
  },

  boxWrapperTop: {},

  boxWrapperBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  boxWrapperRight: {
    alignSelf: "center",
  },
  tapluyenNote: {
    height: 80,
  },
  center: {
    alignSelf: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  circle: {
    alignContent: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 10,
    borderColor: "#70CCB8",
    marginBottom: 5,
    backgroundColor: null,
  },
  boxtItemVeBe: {
    marginTop: 15,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  redTextsuggest: {
    marginTop: 15,
    color: colors.dark_red,
  },
  inputText: {
    width: 40,
    height: 15,
    textAlignVertical: "center",
    alignContent: "flex-end",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 13,
    fontWeight: "400",
    color: colors.black,
    borderColor: colors.dark_gray,
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default Diary;
