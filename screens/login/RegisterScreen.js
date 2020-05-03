import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

require("firebase/firestore");
import Fire from "../../config/Fire";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends React.Component {
    static navigationoptions = {
        header: null,
    };

    state = {
        user: {
            name: "",
            firstname: "",
            email: "",
            password: "",
            avatar: null,
        },
        errorMessage: null,
    };

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
    };

    getCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(status != "granted"){
            alert("Il besoin de la camera");
        }
    }

    handlePickAvatar = async () => {
        this.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1]
        });

        if(!result.cancelled) {
            this.setState({user : {...this.state.user, avatar: result.uri}})
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this.handlePickAvatar}
                >
                    <Image
                        style={styles.avatar}
                        //source={{ uri: this.state.user.avatar }}
                        source={this.state.user.avatar ? {uri: this.state.user.avatar} : require("../../assets/avatar.png")}
                    ></Image>
                </TouchableOpacity>

                <View style={styles.form}>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.inputTitle}>nom :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(name) =>
                                this.setState({
                                    user: { ...this.state.user, name },
                                })
                            }
                            value={this.state.user.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Prénom :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(firstname) =>
                                this.setState({
                                    user: { ...this.state.user, firstname },
                                })
                            }
                            value={this.state.user.firstname}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Adresse Mail :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(email) =>
                                this.setState({
                                    user: { ...this.state.user, email },
                                })
                            }
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={(password) =>
                                this.setState({
                                    user: { ...this.state.user, password },
                                })
                            }
                            value={this.state.user.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSignUp}
                >
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>
                        Inscription
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        {"Déja inscrit? "}
                        <Text style={{ fontWeight: "500", color: "#fcbf1e" }}>
                            Connexion
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorMessage: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase",
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#fcbf1e",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "#fcbf1e",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    avatar: {
        width: 100,
        height: 100,        
    },
    avatarContainer:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
    }
});
