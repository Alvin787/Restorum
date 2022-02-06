import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'react-native-elements/dist/buttons/Button';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../contexts/authContext';
import { Colors } from './UI/colors';

import { db, logOut, signInWithGoogle } from '../firebase';
import { collection, setDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { withTheme } from 'react-native-elements';

export default function CreatePost({ navigation }) {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('nope');
  const [body, setBody] = React.useState('');
  const user = useContext(AuthContext);

  const [isError, setIsError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (category === 'nope' | title.length === 0 | body.length === 0) {
      setIsError(true)
    } else {
      setIsError(false)
      handlePost()
      navigation.push('Home');
    }
  }

  const handlePost = async () => {
    console.log('posted!')

    const postTime = Date.now()

    const obbyj = { title: title, category: category, body: body, author: user.currentUser.displayName, date: postTime, likes: 0 }

    console.log(obbyj)

    const tagDocRef = doc(db, 'categories', category, 'posts', title);

    await setDoc(tagDocRef, obbyj);
  }


  return (
    <View style={{ justifyContent: "center", padding: 20 }}>
      {user.currentUser !== null ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={(newValue) => setTitle(newValue)}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: "Clothing", value: "clothing" },
              { label: "Appliances", value: "appliances" },
              { label: "Furniture", value: "furniture" },
              { label: "Bathroom", value: "bathroom" },
              { label: "House", value: "house" },
              { label: "Kitchen", value: "kitchen" },
              { label: "Automotives", value: "automotives" },
            ]}
            placeholder={{ label: "Select a category...", value: "nope" }}
          />

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={8}
            placeholder="Share your knowledge!"
            value={body}
            onChangeText={(newValue) => setBody(newValue)}
          />
          <Button style={styles.button} title="Upload" onPress={handleSubmit} />

          <Text style={isError ? { color: "red" } : { visibility: "hidden" }}>
            * Error - Missing one or more fields
          </Text>

          <Pressable
            style={styles.buttonSignIn}
            onPress={() => {
              logOut();
              console.log(user);
            }}
          >
            <Text>Sign out</Text>
          </Pressable>
        </>
      ) : (
        <View>
          <Pressable
            style={styles.buttonSignIn}
            onPress={() => {
              signInWithGoogle();
              console.log(user);
            }}
          >
            <Text>Sign in with Google</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginVertical: 15,
  },
  button: {
    backgroundColor: Colors.primary,
  },
  buttonSignIn: {
    width: 170,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    margin: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    margin: 10,
  },
});

