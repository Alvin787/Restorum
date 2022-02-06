import { React, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
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
      <Text>{description}</Text>
      <TouchableHighlight
        style={styles.button}
        activeOpacity='0.85'
        underlayColor={Colors.primaryLight}
        onPress={() => {
          props.routeToPostBody(postData);
        }}
        title={"Read more"}
      >
        <Text style={styles.text}>
          Read More
        </Text>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    marginTop: 15,
    paddingHorizontal: 1,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.secondary,
    fontSize: 15,
  }
});


export default ContentCard;
