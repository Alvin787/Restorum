import { React, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { AuthContext, AuthProvider } from "../../contexts/authContext";
import { Card } from "react-native-elements";
import dateFormat from "dateformat";
import { Colors } from "./colors";

const ContentCard = (props) => {
  const user = useContext(AuthContext);

  const postData = props.data;
 
  const description = (postData.body.length>90) ? postData.body.substring(0, 90) + "...": postData.body;

  return (
    <Card>
      <Card.Title>{postData.title}</Card.Title>
      <Text>
        by {postData.author} | {dateFormat(postData.date, "mmmm dS, yyyy")}
      </Text>
      <Text>Posted in {postData.category}</Text>
      <Card.Divider />
      <Text style={{paddingBottom: 20}}>{description}</Text>
      <Button
        style={{ borderRadius: 80 }}
        color={Colors.primary}
        onPress={() => {
          props.routeToPostBody(postData);
        }}
        title={"Read more"}
      />
    </Card>
  );
};

export default ContentCard;
