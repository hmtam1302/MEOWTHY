import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import colors from "../../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";

const URL = "http://10.0.2.2:3000/";

export default RenderListFood = ({ item, deleteFood, wait, onRefresh }) => {
  const [weight, setWeight] = React.useState(item.amount);
  const [calories, setCalories] = React.useState(item.calories);

  const imgSrc = [
    require("../../assets/image/pate.png"),
    require("../../assets/image/rice.png"),
    require("../../assets/image/fish.png"),
    require("../../assets/image/ct.png"),
  ];

  const updateFood = async (name, weight, foodId) => {
    switch (name) {
      case "Pate":
        try {
          console.log(weight);

          const res = await axios
            .put(`${URL}food/${foodId}`, {
              amount: weight,
              calories: (84 / 100) * weight,
            })
            .then(() => wait(2000).then(() => onRefresh()));
        } catch (error) {
          alert(error);
        }
        break;

      case "Cơm":
        try {
          console.log(weight);

          const res = await axios
            .put(`${URL}food/${foodId}`, {
              amount: weight,
              calories: (130 / 100) * weight,
            })
            .then(() => wait(2000).then(() => onRefresh()));
        } catch (error) {
          alert(error);
        }
        break;

      case "Cá":
        try {
          console.log(weight);
          const res = await axios
            .put(`${URL}food/${foodId}`, {
              amount: weight,
              calories: (200 / 100) * weight,
            })
            .then(() => wait(2000).then(() => onRefresh()));
        } catch (error) {
          alert(error);
        }
        break;

      case "Thức ăn cho mèo":
        try {
          console.log(weight);

          const res = await axios
            .put(`${URL}food/${foodId}`, {
              amount: weight,
              calories: (280 / 100) * weight,
            })
            .then(() => wait(2000).then(() => onRefresh()));
        } catch (error) {
          alert(error);
        }
        break;

      default:
        console.log("quit");
    }
  };

  const [image, setImage] = React.useState();

  const handleImage = (name) => {
    switch (name) {
      case "Pate":
        setImage(imgSrc[0]);
        break;

      case "Cơm":
        setImage(imgSrc[1]);
        break;

      case "Cá":
        setImage(imgSrc[2]);
        break;

      case "Thức ăn cho mèo":
        setImage(imgSrc[3]);
        break;
    }
  };

  React.useEffect(() => {
    handleImage(item.name);
  }, []);
  console.log(item.amount);
  return (
    <View key={item._id} style={styles.FoodIteamWrapper}>
      <View style={styles.leftImage}>
        <Image source={image} style={styles.imageFood} />
      </View>
      <View style={styles.rightWrapper}>
        <View>
          <Text style={styles.text_s16_w600}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.text_s16_w400}
            value={`${weight}`}
            onChangeText={(text) => setWeight(text)}
            onBlur={() => updateFood(item.name, weight, item._id)}
          />
          <Feather name="edit-2" size={16} color={colors.black} />
        </View>
        <View style={styles.kcalWrap}>
          <Text style={styles.text_s24_w600}>{item.calories} Kcal</Text>
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
};

const styles = StyleSheet.create({
  FoodIteamWrapper: {
    flex: 1,
    height: 100,
    width: "100%",
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
    color: colors.black,
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
