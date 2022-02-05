import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';


const Post = (props) => {
    // get data from contentCard
    // display it

    return(
        <View>
            <Text>How to fix your laptop</Text>
            <Image source={require('../assets/Laptop.jpg')}/>
            <Text></Text>
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default Post