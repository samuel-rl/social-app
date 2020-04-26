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

export default class RegisterScreen extends React.Component {
    static navigationoptions = {
        header: null,
    };

    state = {
        name: "",
        firstname: "",
        email: "",
        password: "",
        errorMessage: null,
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then((userCredentials) => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name,
                });
            })
            .catch((error) => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <Text style={styles.title}>
                        {`Bienvenue ici\nInscris-toi`}
                    </Text>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View style={{ marginTop: 120 }}>
                        <Text style={styles.inputTitle}>nom :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Prénom :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(firstname) => this.setState({ firstname })}
                            value={this.state.firstname}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Adresse Mail :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={(password) =>
                                this.setState({ password })
                            }
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSignUp}
                >
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>
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
    title: {
        marginTop: 70,
        fontSize: 25,
        fontWeight: "400",
        textAlign: "center",
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
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
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});