import React, { Component } from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Fire from "../config/Fire";



class ProfileListItem extends Component {

    state={
        friend: false
    }

    add = async(uid) => {
        const friend = this.state.friend;
        if(friend === null){
            this.setState({
                friend: false
            })
            Fire.shared.addFriend(uid);
        }else if(friend === true){
            this.setState({
                friend: null
            })
            Fire.shared.deleteFriend(uid);
        }else{
            this.setState({
                friend: null
            })
            Fire.shared.deleteFriend(uid);
        }
    }

    componentDidMount(){
        Fire.shared.isFriend(this.props.uid).then(res => {
            this.setState({
                friend: res
            })
        })
    }



    renderFriend = () => {
        res = this.state.friend;
            if(res === true){
                return(
                    <Ionicons
                    name="ios-heart"
                    size={30}
                    color="#000"
                    style={styles.add}
                ></Ionicons>
                )
            }else if(res === false){
                return(
                    <Ionicons
                    name="md-infinite"
                    size={30}
                    color="#000"
                    style={styles.add}
                ></Ionicons>
                )
            }else{
                return(
                    <Ionicons
                    name="ios-person-add"
                    size={30}
                    color="#000"
                    style={styles.add}
                ></Ionicons>
                )
            }
        
        
    }

    
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.avatar}
                source={this.props.avatar ? {uri: this.props.avatar} : require("../assets/avatar.png")}></Image>
                <View style={styles.containerDescription}>
                    <Text style={styles.description} >{this.props.firstname + " "+ this.props.name}</Text>
                </View>
                <TouchableOpacity
                        style={styles.containerAdd}
                        onPress={() => this.add(this.props.uid)}
                    >
                        {this.renderFriend()}
                    </TouchableOpacity>
                <View
                    style={{
                        width: "90%",
                        position: "absolute",
                        bottom : 0,
                        height: 1,
                        backgroundColor: "#452263",
                        marginLeft: "5%",
                        marginRight: "5%",
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 150,
    },
    avatar:{
        width: 100,
        height: 100,
        marginVertical:25,
        marginLeft: 20
    },
    description:{
        fontSize: 15,
    },
    containerDescription:{
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerAdd : {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
    }
});

export default ProfileListItem;
