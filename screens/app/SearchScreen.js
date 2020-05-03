import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    TextInput,
    ScrollView,
    FlatList,
    Platform,
    SafeAreaView,
    StatusBar
} from "react-native";

import ProfileListItem from "../../components/ProfileListItem";

require("firebase/firestore");
import Fire from "../../config/Fire";


const myList = [
];

export default class SearchScreen extends React.Component {
    state = {
        value: "",
        data: myList,
        loading: false,
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#452263",
                    marginLeft: "14%",
                }}
            />
        );
    };

    search = async (text) => {
    
       
        this.setState({
            value: text,
        });

        Fire.shared.searchUserByName(text).then((res) => {
            this.setState({
                data: res,
            });
        });

    }



    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        value={this.state.value}
                        placeholder="Rechercher quelqu'un..."
                        onChangeText={(text) => this.search(text)}
                    ></TextInput>
                </View>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    extraData={this.state}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ProfileListItem uid={item.uid} name={item.name} firstname={item.firstname} avatar={item.avatar}></ProfileListItem>
                    )}
                ></FlatList>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    input: {
        backgroundColor: "#fff",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        borderRadius: 3,
        borderColor: "gray",
        textAlign: "center",
    },
    containerInput: {
        width: "100%",
        backgroundColor: "#7289da",
    },
});
