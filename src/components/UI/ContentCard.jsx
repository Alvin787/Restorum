import { React, useContext } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { AuthContext, AuthProvider } from '../../contexts/authContext';
import { Card } from 'react-native-elements';
import dateFormat from 'dateformat';


const ContentCard = (props) => {
    const user = useContext(AuthContext);
    let postData = props.data;

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
            <Button onPress={routeToPostBody} title={"Read more"} />
        </Card>
    )
};

export default ContentCard;
