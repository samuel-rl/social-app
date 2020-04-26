import React from 'react';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/login/RegisterScreen";

import MainScreen from './screens/app/MainScreen';



export default createAppContainer(
  createSwitchNavigator(
      {
          Splash: SplashScreen ,
          Login : LoginScreen,
          Register: RegisterScreen,
          Main : MainScreen
      },
      {
          initialRouteName: "Splash",
      }
  )
);