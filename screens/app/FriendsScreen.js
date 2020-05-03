import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';


export default class FriendsScreen extends React.Component{
    render(){
        LayoutAnimation.easeInEaseOut();
        
        return(
            <View style={styles.container}>
                <Text>Fav</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });