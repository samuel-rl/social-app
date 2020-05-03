import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    Image,
} from "react-native";

import * as firebase from "firebase";
import Fire from "../../config/Fire";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

export default class ProfileScreen extends React.Component {
    state = {
        user: {
            avatar: null,
            email: "",
            firstname: "",
            name: "",
        },
        oldAvatar: null,
        showing: false,
    };

    componentDidMount() {
        const user = Fire.shared.uid;
        Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot((doc) => {
                if(doc.data() != undefined){
                    this.setState({
                        user: doc.data(),
                        oldAvatar: doc.data().avatar,
                    });
                }else{
                    alert("Problème utilisateur...")
                    this.signOutUser();
                }
            });
    }

    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status != "granted") {
            alert("Il besoin de la camera");
        }
    };

    handlePickAvatar = async () => {
        this.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({
                user: { ...this.state.user, avatar: result.uri },
                showing: true,
            });
        }
    };

    changeAvatar = () => {
        this.setState({ showing: false });
        Fire.shared.updateUser(this.state.user);
    };

    reloadAvatar = () => {
        let old = this.state.oldAvatar;
        this.setState({
            user: { ...this.state.user, avatar: old },
            showing: false,
        });
    };

    signOutUser = () => {
        firebase.auth().signOut();
    };

    log = () => {
        Fire.shared.addFriend("bonjour");
    };

    renderAvatar = () => {
        if (this.state.user.avatar === null) {
            return (
                <TouchableOpacity onPress={this.handlePickAvatar}>
                    <Image
                        style={styles.avatar}
                        source={require("../../assets/avatar.png")}
                    ></Image>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.handlePickAvatar}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: this.state.user.avatar }}
                    ></Image>
                </TouchableOpacity>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderAvatar()}
                {this.state.showing ? (
                    <View>
                        <Button
                            style={styles.buttonChange}
                            onPress={this.changeAvatar}
                        >
                            {"Valider ?"}
                        </Button>
                        <Button
                            style={styles.buttonChange}
                            onPress={this.reloadAvatar}
                        >
                            {"Je regrette"}
                        </Button>
                    </View>
                ) : null}
                <Text style={styles.text}>
                    {"Salut "}
                    <Text style={{ textTransform: "uppercase" }}>
                        {this.state.user.firstname + " " + this.state.user.name}
                    </Text>
                </Text>

                <Text>{"Ton email = " + this.state.user.email}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.signOutUser}
                >
                    <Text style={styles.textButton}>Déconnexion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.log}>
                    <Text style={styles.textButton}>log</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 120,
        marginTop: 100,
        marginHorizontal: 30,
        backgroundColor: "#fcbf1e",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonChange: {
        backgroundColor: "#fcbf1e",
    },
    textButton: {
        color: "#FFF",
        fontWeight: "500",
    },
    text: {
        fontSize: 25,
    },
    avatar: {
        width: 100,
        height: 100,
    },
});
