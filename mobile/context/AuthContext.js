import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

const BASE_URL="https://meowthy-project.herokuapp.com";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  //const [userInfo, setUserInfo] = useState({});
  //const [isLoading, setIsLoading] = useState(false);
  //const [onboardLoading, setonboardLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const register = (username, password) => {
  }
  const login = (username, password) => {
    let body = {
      "username": username, 
      "password": password
    }
    axios.post(`${BASE_URL}/user/signin`, body)
    .then(res => {
      alert(JSON.parse(res));
      setIsLoggedIn(true);
    })
    .catch(e=>{
      console.log(`login error ${e}`);
    })
  };

  const LoggedIn = async () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    LoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};