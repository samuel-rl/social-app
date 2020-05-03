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
    StatusBar,
    ActivityIndicator
} from "react-native";

import ProfileListItem from "../../components/ProfileListItem";

import Fire from "../../config/Fire";


const myList = [
];

export default class SearchScreen extends React.Component {
    state = {
        value: "",
        data: myList,
        loading: null,
    };


    search = async (text) => {
        if(text != ""){
            this.setState({
                value: text,
                loading: true
            });
    
            Fire.shared.searchUserByName(text).then((res) => {
                this.setState({
                    data: res,
                    loading: false
                });
            }).catch(() => {
                console.log("Promise Rejected");
            })
        }else{
            this.setState({
                value: text,
                loading: null
            });
        }

    }

    renderList = () => {
        if(this.state.loading === false){
            return (
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ProfileListItem uid={item.uid} name={item.name} firstname={item.firstname} avatar={item.avatar}></ProfileListItem>
                    )}
                ></FlatList>
            )
        }else if(this.state.loading === null){
            return(
                <View style={{backgroundColor:"#7289da", width: "100%", height: "100%"}}></View>
            )
        }else
            {
            return(
                <ActivityIndicator size="large" color="#000" />
            )
        }
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
                {this.renderList()}
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
    },
    containerInput: {
        width: "100%",
        backgroundColor: "#7289da",
    },
});
