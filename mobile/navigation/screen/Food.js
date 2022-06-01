import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../assets/colors/colors";
import ListFoodModal from "../../components/modal/ListFoodModal";
import foodData from "../../assets/data/foodData";
import axios from "axios";

const image = require("../../assets/image/bgyl.png");
const URL = "http://10.0.2.2:3000/";

function Food({ route, navigation }) {
  const { diaryId } = route.params;

  const [dataFood, setDataFood] = React.useState([
    {
      id: "1",
      name: "Thức ăn cho mèo",
      amount: 0,
      calories: 0,
      image: require("../../assets/image/ct.png"),
    },
  ]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  // function
  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  // delete food

  const deleteFood = async (foodId) => {
    try {
      const res = await axios
        .delete(`${URL}food/${foodId}`)
        .then(() => wait(3000).then(() => onRefresh()));
    } catch (error) {
      alert(error);
    }
  };

  // post food

  const addFood = async (id) => {
    console.log("post food");
    switch (id) {
      case 0:
        console.log("post rice");
        try {
          const res = await axios.post(`${URL}diary/add-food/${diaryId}`, {
            name: "Cơm",
            amount: 100,
            calories: 84,
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 1:
        try {
          const res = await axios.post(`${URL}diary/add-food/${diaryId}`, {
            name: "Cơm",
            amount: 100,
            calories: 130,
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 2:
        try {
          const res = await axios.post(`${URL}diary/add-food/${diaryId}`, {
            name: "Cá",
            amount: 100,
            calories: 200,
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 3:
        try {
          const res = await axios.post(`${URL}diary/add-food/${diaryId}`, {
            name: "Thức ăn cho mèo",
            amount: 100,
            calories: 280,
          });
        } catch (error) {
          alert(error);
        }
        break;

      default:
        console.log("quit");
    }
  };

  // get list food

  const getListFood = async () => {
    try {
      const resListFood = await axios
        .get(`${URL}diary/${diaryId}/list-food`)
        .then((res) => {
          console.log(res.data.data);
          setDataFood(res.data.data);
        });
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  };

  // refresh
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListFood();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    getListFood();
  }, []);

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.white}
              style={{ marginTop: 6 }}
            />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            <Text style={styles.titleTitle}>Thức ăn</Text>
          </View>
          <Text style={styles.subTitle}>Bạn đã cho bé ăn gì hôm nay nào?</Text>

          <TouchableOpacity onPress={() => changeModalVisible(true)}>
            <View style={styles.selectWrap}>
              <Text style={styles.selectText}>Chọn</Text>
              <Feather
                name="chevron-down"
                size={16}
                color={colors.dark_yellow}
                style={{ position: "absolute", right: 10 }}
              />
            </View>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => {
              changeModalVisible;
            }}
          >
            <ListFoodModal
              changeModalVisible={changeModalVisible}
              addFood={addFood}
              onRefresh={onRefresh}
              wait={wait}
            />
          </Modal>

          <View style={styles.listFoodWrapper}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
            >
              {dataFood
                ? dataFood.map((item) => {
                    // const [weight, setWeight] = React.useState(item.weight);
                    return (
                      <View key={item._id} style={styles.FoodIteamWrapper}>
                        <View style={styles.leftImage}>
                          <Image source={item.image} style={styles.imageFood} />
                        </View>
                        <View style={styles.rightWrapper}>
                          <View>
                            <Text style={styles.text_s16_w600}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              style={styles.text_s16_w400}
                              value={`${item.amount}`}
                              // onChangeText={(text) => setWeight(text)}
                            />
                            <Feather
                              name="edit-2"
                              size={16}
                              color={colors.black}
                            />
                          </View>
                          <View style={styles.kcalWrap}>
                            <Text style={styles.text_s24_w600}>
                              {item.calories} Kcal
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: 5,
                            top: 5,
                            height: 20,
                            width: 20,
                          }}
                          onPress={() => {
                            deleteFood(item._id);
                          }}
                        >
                          <Feather name="x" color={colors.yellow} size={16} />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </View>

          <View style={styles.bottom}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500" }}>Tổng</Text>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: colors.dark_yellow,
                }}
              >
                ZZZ Kcal
              </Text>
            </View>
            <Text
              style={{ fontSize: 13, fontWeight: "400", color: colors.black }}
            >
              Lưu ý: Giá trị trên chỉ mang tính ước lượng, sẽ có chênh lệch tùy
              theo loại thức ăn.
            </Text>
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

  titleTitle: {
    // paddingVertical: 10,
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },

  selectWrap: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.dark_yellow,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  selectText: {
    color: colors.dark_yellow,
    alignItems: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  listFoodWrapper: {
    height: 380,
  },
  FoodIteamWrapper: {
    flex: 1,
    height: 100,
    padding: 8,
    flexDirection: "row",
    borderColor: colors.dark_yellow,
    marginBottom: 5,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: colors.white,
  },
  leftImage: {
    flex: 3,
    justifyContent: "center",
  },
  imageFood: {
    width: 75,
    height: 55,
    alignSelf: "center",
  },
  rightWrapper: {
    flex: 7,
  },
  text_s16_w600: { fontSize: 16, fontWeight: "600" },
  text_s24_w600: { fontSize: 24, fontWeight: "500" },
  text_s16_w400: {
    width: 50,
    fontSize: 16,
    fontWeight: "400",
    borderBottomWidth: 1.5,
    borderColor: colors.black,
  },
  kcalWrap: {
    alignItems: "flex-end",
  },
  bottom: {
    marginVertical: 16,
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

export default Food;
