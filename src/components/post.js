import React from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";
import dateFormat from 'dateformat';

const Post = ({route, navigation}) => {
  // get data from contentCard
  // display it
  const postData = route.params;

  return (
    <Card style={styles.card}>
      <Text style={styles.header}>Posted by: {postData.author} | {dateFormat(postData.date, "mmmm dS, yyyy")}</Text>

      <Text style={styles.title}>{postData.title}</Text>

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
        <Text style={{ textAlign: "center", marginTop: 25 }}>{postData.likes == undefined ? 0 : postData.likes} Likes</Text>
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
      {postData.description}
      </Text>
      <Button onPress={() => navigation.goBack()} title="GO BACK"></Button>
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
    fontWeight: '400',
  },
  icon: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default Post;
