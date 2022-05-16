import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import colors from "../../assets/colors/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import userData from "../../assets/data/userData";
import Feather from "react-native-vector-icons/Feather";

const image = require("../../assets/image/bgpurple.png");

function User({ navigation }) {
  const [dataUser, setDataUser] = React.useState(...userData);
  return (
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          {/* top info*/}
          <View style={styles.wrapTopInfo}>
            <View style={styles.rowSp}>
              <View style={styles.infoWrap}>
                <Image style={styles.avatar} source={dataUser.image} />
                <View style={styles.info}>
                  <Text style={styles.infoUserName}>{dataUser.username}</Text>
                  <Text style={styles.infoPhone}>{dataUser.phone}</Text>
                  <Text style={styles.infoEmail}>{dataUser.email}</Text>
                </View>
              </View>

              {/* edit */}
              <TouchableOpacity
                onPress={() => alert("chỉnh sửa thông tin cá nhân")}
              >
                <FontAwesome5
                  name="pen"
                  size={24}
                  color={colors.white}
                  style={styles.editInfo}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* ve cac be */}
          <View style={styles.wrapComponent}>
            <View style={styles.topComponent}>
              <Text style={styles.title}>Về các bé</Text>
              <Feather name="chevron-right" size={24} color={colors.black} />
            </View>

            <View style={styles.bottomComponent_PdR20}>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Số lượng mèo</Text>
                <Text style={styles.subtitle}>3</Text>
              </View>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Mèo mặc định</Text>
                <Text style={styles.subtitle}>3</Text>
              </View>
            </View>
          </View>

          {/* cai dat */}

          <View style={styles.wrapComponent}>
            <View style={styles.topComponent}>
              <Text style={styles.title}>cài đặt</Text>
              <Feather name="chevron-right" size={24} color={colors.black} />
            </View>
          </View>

          {/* ho tro */}

          {/* ve cac be */}
          <View style={styles.wrapComponent}>
            <View style={styles.topComponent}>
              <Text style={styles.title}>Hổ trợ chúng tôi</Text>
            </View>

            <View style={styles.bottomComponent}>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Cần giúp đỡ</Text>
                <Feather name="chevron-right" size={24} color={colors.black} />
              </View>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Feedback</Text>
                <Feather name="chevron-right" size={24} color={colors.black} />
              </View>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Về chúng tôi</Text>
                <Feather name="chevron-right" size={24} color={colors.black} />
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
    paddingTop: 60,
  },
  wrapTopInfo: { marginBottom: 30 },
  rowSp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoWrap: {
    flexDirection: "row",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.dark_purple,
    backgroundColor: colors.white,
    resizeMode: "cover",
  },
  info: {
    paddingLeft: 15,
  },
  editInfo: {
    alignSelf: "flex-end",
  },

  infoUserName: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.white,
  },
  infoPhone: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },
  infoEmail: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },

  wrapComponent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderColor: colors.dark_gray,
    borderWidth: 1.5,
    marginTop: 5,
  },
  topComponent: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },

  bottomComponent_PdR20: {
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 10,
  },
  bottomComponent: {
    paddingLeft: 15,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: colors.black,
  },
});

export default User;