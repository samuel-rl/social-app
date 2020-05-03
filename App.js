import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/login/RegisterScreen";

import ProfileScreen from "./screens/app/ProfileScreen";
import WallScreen from "./screens/app/WallScreen";
import FriendsScreen from "./screens/app/FriendsScreen";
import SearchScreen from "./screens/app/SearchScreen";
import PostScreen from "./screens/app/PostScreen";

import Fire from './config/Fire';

import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="md-person"
                                size={24}
                                color={tintColor}
                            />
                        ),
                    },
                },
                Wall: {
                    screen: WallScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="ios-journal"
                                size={24}
                                color={tintColor}
                            />
						)
					},
					
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="ios-add-circle-outline"
                                size={50}
                                color="#fcbf1e"
                                style={{
                                    bottom:2,
                                    //backgroundColor: "#FFF",
                                    //borderRadius: 20
                                }}
                            />
                        ),
					},
					
                },
                Search: {
                    screen: SearchScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="ios-search"
                                size={24}
                                color={tintColor}
                            />
						)
					},
					
                },
				Friends: {
                    screen: FriendsScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="ios-chatboxes"
                                size={24}
                                color={tintColor}
                            />
						)
					},
					
                },
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                      if (navigation.state.key === 'Post') {
                        navigation.navigate('postModal');
                      } else {
                        defaultHandler();
                      }
                    }
                  },
				initialRouteName: "Wall",
                tabBarOptions: {
                    activeTintColor: "#7289da",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false,
                },
            }
        ),
        postModal: {
            screen: PostScreen
        }
    },
    {
        //mode: "modal",
        headerMode: "none",
    }
);

const Container = createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashScreen,
            Login: LoginScreen,
            Register: RegisterScreen,
            App: AppContainer,
        },
        {
            initialRouteName: "Splash",
        }
    )
);

export default class App extends React.Component{

    componentDidMount(){
        console.log("mount")
        this.registerForPushNotificationsAsync();
    }
    
    registerForPushNotificationsAsync = async () => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          if (status !== 'granted') {
            return;
          }
        }
      
        const token = await Notifications.getExpoPushTokenAsync();
      
        this.subscription = Notifications.addListener(this.handleNotification);
      

        console.log("token = " + token)


    }
    
    render(){
        return (<Container/>)
    }
}
