import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase';

export default class MainScreen extends React.Component{
    state = {
        email: "",
        displayName: "",
        name: ""
    };

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render(){
        LayoutAnimation.easeInEaseOut();
        
        return(
            <View style={styles.container}>
                <Text>{this.state.email}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.signOutUser}>
                    <Text style={styles.textButton}>
                        Déconnexion
                    </Text>
                </TouchableOpacity>
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
    button: {
        width: 120,
        marginTop: 200,
        marginHorizontal: 30,
        backgroundColor: "#fcbf1e",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: "#FFF",
        fontWeight: "500"
    }
  });