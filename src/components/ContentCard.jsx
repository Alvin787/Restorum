import React from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { AuthContext, AuthProvider } from '../contexts/authContext';
import { Card } from 'react-native-elements';
import dateFormat from 'dateformat';


const ContentCard = (props) => {
    const user = useContext(AuthContext);
    const postData = props.data;

    postData = {
        category: "clothing",
        title: "post title",
        author: "Firstname Lastname",
        body: "thsi is the body of the post",
        description: "a short description",
        date: new Date(1644095338065),
        likes: 12,
    }

    const routeToPostBody = () => {
        console.log('route');
    }
    return (
        <Card>
            <Card.Title>{postData.title}</Card.Title>
            <Text>by {postData.author} | {dateFormat(postData.date, "mmmm dS, yyyy")}</Text>
            <Text>Posted in {postData.category}</Text>
            <Card.Divider />
            <Text>{postData.description}</Text>
            <Button onPress={routeToPostBody}>Read more</Button>
        </Card>
    )
};

export default ContentCard;
