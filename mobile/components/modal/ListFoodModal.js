import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

const WIDTH = Dimensions.get("window").width;

function ListFoodModal(props) {
  const cancel = () => {
    props.changeModalVisible(false);
  };

  const choosedFood = (id) => {
    props.addFood(id);
    props.changeModalVisible(false);
    props.wait(2000).then(() => props.onRefresh());
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => cancel()}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            choosedFood(0);
          }}
          style={styles.FoodIteamWrapper}
        >
          <View style={styles.leftImage}>
            <Image
              source={require("../../assets/image/pate.png")}
              style={styles.imageFood}
            />
          </View>
          <View style={styles.rightWrapper}>
            <View>
              <Text style={styles.text_s16_w600}>Pate</Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                84 Kcal/100g
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            choosedFood(1);
          }}
          style={styles.FoodIteamWrapper}
        >
          <View style={styles.leftImage}>
            <Image
              source={require("../../assets/image/rice.png")}
              style={styles.imageFood}
            />
          </View>
          <View style={styles.rightWrapper}>
            <View>
              <Text style={styles.text_s16_w600}>Rice</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                130 Kcal/100g
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            choosedFood(2);
          }}
          style={styles.FoodIteamWrapper}
        >
          <View style={styles.leftImage}>
            <Image
              source={require("../../assets/image/fish.png")}
              style={styles.imageFood}
            />
          </View>
          <View style={styles.rightWrapper}>
            <View>
              <Text style={styles.text_s16_w600}>Fish</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                200 Kcal/100g
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            choosedFood(3);
          }}
          style={styles.FoodIteamWrapper}
        >
          <View style={styles.leftImage}>
            <Image
              source={require("../../assets/image/ct.png")}
              style={styles.imageFood}
            />
          </View>
          <View style={styles.rightWrapper}>
            <View>
              <Text style={styles.text_s16_w600}>Thức ăn cho mèo</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                280 Kcal/100g
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: colors.white,
    width: WIDTH - 80,
    height: 400,
    padding: 15,
    alignSelf: "center",
    justifyContent: "space-between",
    borderColor: colors.dark_yellow,
    borderRadius: 16,
    borderWidth: 1.5,
  },

  FoodIteamWrapper: {
    padding: 8,
    flex: 1,
    height: 100,
    flexDirection: "row",
    borderColor: colors.dark_yellow,

    borderBottomWidth: 1.5,
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
});

export default ListFoodModal;
