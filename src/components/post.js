import React from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";

const Post = (props) => {
  // get data from contentCard
  // display it
  const propData = props.data;

  return (
    <Card style={styles.card}>
      <Text style={styles.header}>Posted by: Username</Text>

      <Text style={styles.title}>How to fix your laptop</Text>

      <Image
        style={styles.image}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
      <View style={styles.icon}>
        <Icon
          raised
          name="favorite"
          type="material"
          onPress={() => console.log("hello")}
        />
        <Text style={{ textAlign: "center", marginTop: 25 }}>20 Likes</Text>
        <Icon
          style={{ alignContent: "right" }}
          raised
          name="share"
          type="material"
          onPress={() => console.log("hello")}
        />
      </View>

      <Card.Divider style={{ paddingBottom: 10 }} />

      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 300,
    borderRadius: 10,
    padding: 30,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
  },
  header: {
    fontWeight: 400,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default Post;
