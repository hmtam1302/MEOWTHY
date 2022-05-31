import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from "react-native";

import SelectBox from "react-native-multi-selectbox";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

const image = require("../../assets/image/bggreen.png");

const K_OPTIONS = [
  {
    item: "week1",
    id: 1,
  },
  {
    item: "week2",
    id: 2,
  },
  {
    item: "week3",
    id: 3,
  },
];

const data = [
  {
    week: 1,
    t2: 300,
    t3: 100,
    t4: 700,
    t5: 600,
    t6: 400,
    t7: 200,
    cn: 500,
    Lweight: 500,
    comment: "Tập luyện đều đặn, giảm cân đúng tiến độ",
  },
  {
    week: 2,
    t2: 300,
    t3: 1000,
    t4: 700,
    t5: 600,
    t6: 900,
    t7: 800,
    cn: 500,
    Lweight: 500,
    comment: "Tập luyện đều đặn, giảm cân đúng tiến độ",
  },
  {
    week: 3,
    t2: 300,
    t3: 1000,
    t4: 700,
    t5: 300,
    t6: 200,
    t7: 100,
    cn: 700,
    Lweight: 500,
    comment: "Tập luyện đều đặn, giảm cân đúng tiến độ",
  },
];
// const _retrieveData = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

// // _retrieveData("userId");
// console.log();
const HEIGHT_CHART = 300;
const MAX_KCAL = 1000;
const { week, t2, t3, t4, t5, t6, t7, cn, Lweight, comment } = data.find(
  (item) => item.week === 1
);

const HEIGHT_COLUMN = {
  t2: (t2 * HEIGHT_CHART) / MAX_KCAL,
  t3: (t3 * HEIGHT_CHART) / MAX_KCAL,
  t4: (t4 * HEIGHT_CHART) / MAX_KCAL,
  t5: (t5 * HEIGHT_CHART) / MAX_KCAL,
  t6: (t6 * HEIGHT_CHART) / MAX_KCAL,
  t7: (t7 * HEIGHT_CHART) / MAX_KCAL,
  cn: (cn * HEIGHT_CHART) / MAX_KCAL,
};

const SUM = t2 + t3 + t4 + t5 + t6 + t7 + cn;
const AVERAGE = Math.round(SUM / 7);

function Report({ navigation }) {
  const [selectedTeam, setSelectedTeam] = React.useState({});
  const today = new Date();
  const saveArticle = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };
  saveArticle("picked", selectedTeam);

  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleTitle}>Báo cáo</Text>
          </View>

          <View style={styles.body}>
            {/* header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text
                  style={{ fontSize: 16, fontWeight: "400", paddingBottom: 5 }}
                >
                  XX T3 - XX T3
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>Tuần </Text>

                  <View>
                    <SelectBox
                      containerStyle={{
                        marginTop: -25,
                        padding: 10,
                        borderRadius: 16,
                        borderWidth: 1.5,
                        borderColor: colors.gray,
                      }}
                      labelStyle={{ fontSize: 13 }}
                      selectedItemStyle={{ fontSize: 13 }}
                      optionsLabelStyle={{ fontSize: 13 }}
                      options={K_OPTIONS}
                      value={selectedTeam}
                      label=""
                      onChange={(val) => setSelectedTeam(val)}
                      hideInputFilter={true}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.headerRight}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "600",
                    color: colors.dark_yellow,
                  }}
                >
                  {Lweight}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                    name="chevron-down"
                    size={13}
                    color={colors.dark_red}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: colors.dark_red,
                    }}
                  >
                    giảm (g)
                  </Text>
                </View>
              </View>
            </View>

            {/* chart */}

            <View style={styles.chartWrapper}>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t2 }]}
                ></View>
                <Text style={styles.paddingTop6}>T2</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t3 }]}
                ></View>
                <Text style={styles.paddingTop6}>T3</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t4 }]}
                ></View>
                <Text style={styles.paddingTop6}>T4</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t5 }]}
                ></View>
                <Text style={styles.paddingTop6}>T5</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t6 }]}
                ></View>
                <Text style={styles.paddingTop6}>T6</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.t7 }]}
                ></View>
                <Text style={styles.paddingTop6}>T7</Text>
              </View>
              <View>
                <View
                  style={[styles.column, { height: HEIGHT_COLUMN.cn }]}
                ></View>
                <Text style={styles.paddingTop6}>CN</Text>
              </View>
            </View>

            <View style={styles.bottomWrapper}>
              <View style={styles.bottomHead}>
                <Text style={styles.text_s13_W600}>Tổng</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.dark_yellow,
                  }}
                >
                  {SUM} Kcal
                </Text>
              </View>
              <View style={styles.bottomHead}>
                <Text style={styles.text_s13_W600}>Trung bình</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.dark_yellow,
                  }}
                >
                  {AVERAGE} Kcal
                </Text>
              </View>
              <View style={styles.bottomFoot}>
                <Text style={styles.text_s16_Wb}>Nhận xét</Text>
                <Text style={styles.text_s16_W400}>{comment}</Text>
              </View>
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
  body: {
    borderRadius: 16,
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1.5,
    padding: 15,
    flex: 1,
    marginBottom: 16,
    marginTop: 8,
  },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerLeft: {},
  headerRight: {},
  chartWrapper: {
    height: 350,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  column: { backgroundColor: colors.purple, borderRadius: 50, width: 20 },
  bottomWrapper: {
    paddingVertical: 10,
  },
  bottomHead: { justifyContent: "space-between", flexDirection: "row" },
  bottomFoot: {},
  text_s13_W600: { fontSize: 13, fontWeight: "600", color: colors.black },
  text_s16_Wb: { fontSize: 16, fontWeight: "bold", color: colors.black },
  text_s16_W400: { fontSize: 16, fontWeight: "400", color: colors.black },

  paddingTop6: { paddingTop: 6 },
});

export default Report;
