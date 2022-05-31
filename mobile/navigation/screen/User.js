import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  RefreshControl,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

import colors from "../../assets/colors/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import userData from "../../assets/data/userData";
import Feather from "react-native-vector-icons/Feather";
import EditUserModal from "../../components/modal/EditUserModal.js";
import SelectBox from "react-native-multi-selectbox";
import axios from "axios";

import { AsyncStorage } from "react-native";

const image = require("../../assets/image/bgpurple.png");

const username = "synguyen";
const URL = "http://10.0.2.2:3000/";

function User({ navigation }) {
  const [dataUser, setDataUser] = React.useState({});
  const [count, setcount] = React.useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState({});

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // -----------------function------------------

  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  };

  const updateUser = (name, phone, email) => {
    updateDataUser(name, phone, email);
    setDataUser({ username: name, phone: phone, email: email });
  };

  const saveArticle = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataUser();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // ------------------change avatar-------------------
  const openGallary = async () => {
    const imageFromLib = await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    });

    dataUser.avatar = `data:image/png;base64,${imageFromLib.assets[0].base64}`;
    updateAvatar(dataUser.avatar);
    setcount(count + 1);
  };

  //------------call API ------------------------
  const getDataUser = async () => {
    try {
      const resDataUser = await axios
        .get(`${URL}user/${username}`)
        .then((res) => {
          setDataUser(res.data.data);
          console.log("error:request");
          saveArticle("userId", dataUser._id);
        });
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  };

  const updateDataUser = async (name, phone, email) => {
    try {
      const res = await axios
        .put(`${URL}user/update`, {
          username: name,
          email: email,
          phone: phone,
          avatar: dataUser.avatar,
        })
        .then((response) => console.log(response.data));
    } catch (error) {
      console.log("error:", error);
      alert(error);
    }
  };

  const updateAvatar = async (avatar) => {
    try {
      const res = await axios.put(`${URL}user/update`, {
        username: username,
        avatar: avatar,
      });
    } catch (error) {
      alert(error);
    }
  };

  // --------------useEffect---------------------
  React.useEffect(() => {
    getDataUser();
  }, []);

  React.useEffect(() => {}, [count]);
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
          {/* top info*/}
          <View style={styles.wrapTopInfo}>
            <View style={styles.rowSp}>
              <View style={styles.infoWrap}>
                <TouchableOpacity onPress={() => openGallary()}>
                  <Image
                    style={styles.avatar}
                    source={
                      dataUser.avatar === ""
                        ? require("../../assets/image/cat.png")
                        : { uri: dataUser.avatar }
                    }
                  />
                </TouchableOpacity>
                <View style={styles.info}>
                  <Text style={styles.infoUserName}>{dataUser.username}</Text>
                  <Text style={styles.infoPhone}>{dataUser.phone}</Text>
                  <Text style={styles.infoEmail}>{dataUser.email}</Text>
                </View>
              </View>

              {/* edit */}
              <TouchableOpacity
                onPress={() =>
                  EditUserModal ? changeModalVisible(true) : alert("loi")
                }
              >
                <FontAwesome5
                  name="pen"
                  size={24}
                  color={colors.white}
                  style={styles.editInfo}
                />
              </TouchableOpacity>

              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                nRequestClose={() => {
                  changeModalVisible;
                }}
              >
                <EditUserModal
                  changeModalVisible={changeModalVisible}
                  updateUser={updateUser}
                  dataUser={dataUser}
                  onRefresh={onRefresh}
                />
              </Modal>
            </View>
          </View>

          {/* ve cac be */}
          <View style={styles.wrapComponent}>
            <View style={styles.topComponent}>
              <Text style={styles.title}>Về các bé</Text>
              <Feather name="chevron-right" size={24} color={colors.black} />
            </View>

            <View style={styles.bottomComponent_PdR20}>
              <View style={[styles.rowSp, { paddingBottom: 3 }]}>
                <Text style={styles.subtitle}>Số lượng mèo</Text>
                <Text style={styles.subtitle}>3</Text>
              </View>
              <View style={styles.rowSp}>
                <Text style={styles.subtitle}>Mèo mặc định</Text>
                <View style={{ marginBottom: 5 }}>
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
                    // options={options}
                    value={selectedTeam}
                    label=""
                    onChange={(val) => setSelectedTeam(val)}
                    hideInputFilter={true}
                  />
                </View>
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
