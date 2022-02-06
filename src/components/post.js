import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";
import dateFormat from 'dateformat';
import {Colors} from './UI/colors';

const Post = ({route, navigation}) => {
  // get data from contentCard
  // display it
  const postData = route.params;
  // postData = {
  //   category: "clothing",
  //   title: "post title",
  //   author: "Firstname Lastname",
  //   body: "thsi is the body of the post",
  //   description: "a short description",
  //   date: new Date(1644095338065),
  //   likes: 12,
  // }
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(postData.likes);

  const handleLike = () => {
    console.log('liked');
    if(!liked){
      setLikes(likes+1);
      setLiked(true);
    }else{
      setLikes(likes-1);
      setLiked(false);
    }
  }

  

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
          color={liked? "red" : "black"}
          type="material"
          onPress={() => {handleLike()}}
        />
        <Text style={{ textAlign: "center", marginTop: 25 }}> {likes} Likes</Text>
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
      {postData.body}
      </Text>
      <Button color={Colors.primary} onPress={() => navigation.goBack()} title="GO BACK"></Button>
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
    fontSize: 15,
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
