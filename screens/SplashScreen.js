import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import firebase from "firebase";
import Fire from "../config/Fire";

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "Main" : "Login")
        });
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