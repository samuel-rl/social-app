import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    StatusBar,
    SafeAreaView,
    FlatList,
    Image,
    Button
} from "react-native";
import moment from "moment";
import "moment/min/locales";
import { Ionicons } from "@expo/vector-icons";

import Fire from "../../config/Fire";
import * as firebase from "firebase";


const myList = [
];

export default class WallScreen extends React.Component {
    state = {
        data: myList,
        curTime : null
    };

    componentDidMount() {
        this.load();
        var that = this

        firebase.database().ref('/posts').on('child_added', function(dat){
            
            /*var newData = [...that.state.data]
            newData.push(dat)
            that.setState({data: newData})*/
            console.log("nouveau message")
        })
    }



    load = () => {
        Fire.shared.getPost().then((res) => {
            var newres = res.sort((a, b) => {
                return a.timestamp - b.timestamp
            })
            this.setState({
                data: newres.reverse(),
            });
        })
    }


    renderPost = (post) => {
        
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar ? {uri: post.avatar} : require("../../assets/avatar.png")} style={styles.avatar}></Image>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{post.firstname + " " + post.name}</Text>
                        </View>
                    </View>

                    <Text style={styles.post}>{post.message}</Text>
                    <Text style={styles.timestamp}>
                        {moment(post.timestamp).locale("fr").fromNow()}
                    </Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.feed}
                    data={this.state.data}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    feedItem: {
        backgroundColor: "#838899",
        borderRadius: 10,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 7,
    },
    name: {
        fontSize: 17,
        color: "#000",
    },
    timestamp: {
        fontSize: 11,
        color: "#c4c6ce",
        marginTop: 4,
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#FFF",
    },
    buttonChange: {
        backgroundColor: "#fcbf1e",
    },
});
