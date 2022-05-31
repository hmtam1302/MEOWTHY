import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

const BASE_URL="https://meowthy-project.herokuapp.com";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [onboardLoading, setonboardLoading] = useState(false);
/*
  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/user/signup`, {
        name,
        password,
        
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };
*/
  const login = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/user/signin`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
/*
  const logout = () => {
  };
*/
  const isLoggedIn = async () => {
    try {
      setonboardLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setonboardLoading(false);
    } catch (e) {
      setonboardLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        onboardLoading,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};