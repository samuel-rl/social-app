import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {

    state = {
        email: "",
        password: "",
        errorMessage: null,
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => this.setState({ errorMessage: error.message }));
    };

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {`Connexion`}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>
                <View style={styles.formulaire}>
                    <View>
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
                    onPress={this.handleLogin}>
                    <Text style={styles.textButton}>
                        Connexion
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 50 }}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#000", fontSize: 13 }}>
                        {"Pas encore inscrit? "}
                        <Text style={{ fontWeight: "600", color: "#fcbf1e" }}>
                            S'inscrire
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
        marginHorizontal: 30,
    },
    formulaire: {
        marginTop: 40,
        marginBottom: 40,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 12,
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
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: "#FFF",
        fontWeight: "500"
    },
    error: {
        color: "#fcbf1e",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
});