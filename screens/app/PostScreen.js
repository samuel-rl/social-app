import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

require("firebase/firestore");
import Fire from "../../config/Fire";


export default class PostScreen extends React.Component {
    state = {
        user: {
            avatar: null,
            email: "",
            firstname: "",
            name: "",
        },
        text: "",
    };


    componentDidMount() {
        const user = Fire.shared.uid;
        Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot((doc) => {
                if(doc.data() != undefined){
                    this.setState({
                        user: doc.data()
                    });
                }else{
                    alert("Problème utilisateur...")
                    this.signOutUser();
                }
            });
    }



    post = () => {
        var msg = this.state.text.trim();
        var user = this.state.user;
        if (msg === "") {
            alert("le message est vide");
        } else {
            Fire.shared
                .postMessage(msg, user)
                .then(() => {
                    this.props.navigation.goBack();
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };



    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons
                            name="md-arrow-back"
                            size={30}
                            color="#000"
                        ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.post}>
                        <Text style={{ fontSize: 20 }}>Poster le message</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Quelle est votre humeur aujourd'hui ?"
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 10,
        alignItems: "center",
    },
    inputContainer: {
        marginHorizontal: 20,
        alignSelf: "center",
        textAlign: "center",
    },
});
