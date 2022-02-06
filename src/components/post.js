import React from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native';


const Post = (props) => {
    // get data from contentCard
    // display it
    const propData = props.data;

    return(
        <View>
            <Text>How to fix your laptop</Text>
            <Image source={require('../../assets/Laptop.jpg')}/>
            <Text>Description</Text>
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