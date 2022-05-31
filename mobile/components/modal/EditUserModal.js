import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import BlueButton from "../button/blueButton";
import RedButton from "../button/redButton";

import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

const WIDTH = Dimensions.get("window").width;

function EditUserModal(props) {
  const dataUser = props.dataUser;
  const [phone, setPhone] = useState(dataUser.phone);
  const [email, setEmail] = useState(dataUser.email);
  console.log(props.dataUser.username);
  const cancel = () => {
    props.changeModalVisible(false);
  };

  const save = (name, phone, email) => {
    props.updateUser(name, phone, email);
    props.changeModalVisible(false);
    props.onRefresh();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa</Text>
        <Text style={styles.lable}>Tên đăng Nhập</Text>
        <View style={styles.inputWrapper}>
          <Feather name="user" color={colors.yellow} size={16} />
          {/* <TextInput style={{ paddingLeft: 10, flex: 1 }} value={username} />
           */}
          <Text style={{ paddingLeft: 10, flex: 1 }}>{dataUser.username}</Text>
        </View>
        <Text style={styles.lable}>Số điện thoại</Text>
        <View style={styles.inputWrapper}>
          <Feather name="phone" color={colors.yellow} size={16} />
          <TextInput
            value={phone}
            style={{ paddingLeft: 10, flex: 1 }}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <Text style={styles.lable}>EmailText</Text>
        <View style={styles.inputWrapper}>
          <Feather name="mail" color={colors.yellow} size={16} />
          <TextInput
            value={email}
            style={{ paddingLeft: 10, flex: 1 }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <RedButton title="Hủy" onPress={() => cancel()} />
          <BlueButton
            title="Lưu"
            onPress={() => {
              save(dataUser.username, phone, email);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: colors.white,
    width: WIDTH - 80,
    height: 450,
    padding: 15,
    alignSelf: "center",
    justifyContent: "space-between",
    borderColor: colors.dark_yellow,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 15,
  },

  inputWrapper: {
    flexDirection: "row",
    borderColor: colors.dark_yellow,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    marginBottom: 10,
    padding: 8,
  },

  text: {
    fontSize: 13,
    fontWeight: "400",
  },
  lable: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 5,
  },

  buttonWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditUserModal;
