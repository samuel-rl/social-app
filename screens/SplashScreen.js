import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import firebase from "firebase";

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        setTimeout(function(){
            this.props.navigation.navigate(1 ? "Login" : "App");
        }.bind(this),
            1000
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Chargement en cours...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });