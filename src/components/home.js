import { StyleSheet, Text, View, Button, TextInput, Pressable  } from 'react-native';
import { auth, signInWithGoogle, logOut } from '../../src/firebase';
import { AuthContext, AuthProvider } from '../contexts/authContext';
import React, { useState, useEffect } from 'react';
import ContentCard from './UI/ContentCard';;
import { db } from '../firebase';
import { collection, doc, query, where, getDocs } from 'firebase/firestore';
import {Colors} from './UI/colors';

import { useContext } from 'react';

export default function Home({navigation}) {
  const user = useContext(AuthContext);

  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    'clothing': true,
    'appliances': true,
    'furniture': true,
    'bathroom': true,
    'house': true,
    'kitchen': true,
    "automotives": true, 
  });
  const [posts, setPosts] = useState([]);
  const [postsJSX, setPostsJSX] = useState(null);

  // get posts based on tags selected
  const getPosts = async () => {
    let postSearchResults = [];
    for (const tag of Object.entries(filters)) {
      if(tag[1]){
        const tagDocRef = collection(db, 'categories', tag[0], 'posts');
        // const q = query(tagDocRef, where())

        const response = await getDocs(tagDocRef);
        response.forEach((doc) => {
          let currentPost = doc.data();
          currentPost.category = tag[0];
          currentPost.date = new Date(currentPost.date);
          postSearchResults.push(currentPost);
        })
      }
    }
    setPosts(postSearchResults);
  }

  useEffect(() => {
    getPosts();
  }, [filters]);

  // update post jsx when post data changes
  useEffect(() => {
    // console.log(posts);
    // console.log(posts.length);
    let postsJSXList = [];
    posts.forEach((post) => {
      console.log(post);
      postsJSXList.push(<ContentCard data={post} routeToPostBody={routeToCard}/>);
    });
    setPostsJSX(postsJSXList);
    
  }, [posts]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getPosts();
  }

  const handlePress = (tag) => {
    console.log(tag)
    setFilters({
      ...filters,
      [tag]: !filters[tag]
    })
    console.log(filters)
  }

  const routeToCard = (post) => {
    navigation.navigate('Post Page', post);  
  }

  return (
    <AuthProvider>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Restorum</Text>
          </View>
          <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={newText => setSearch(newText)}
              onSubmitEditing={handleSubmit}
              value={search}
          />
          <View style={styles.filterList}>
              {Object.entries(filters).map((tag) => (
              <Pressable
                  style={
                  tag[1] ? [{ borderColor: Colors.primary, backgroundColor: Colors.primary }, styles.button] : styles.button
                  }
                  onPress={() => handlePress(tag[0])}
              >
                  <Text style={tag[1] ? { color: Colors.secondary } : { color: Colors.dark }}>{tag[0]}</Text>
              </Pressable>
              ))}
          </View>
          <View>
              {postsJSX ? postsJSX : null}
          </View>
        </View>
        <Text>Sign in screen</Text>
        <Button
          color={Colors.primary}
          onPress={routeToCard}
          title="Sign in with Google"
        />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    marginVertical: 40,
  },
  input: {
    height: 40,
    width: '90%',
    color: 'black',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
  },
  filterList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
  },
  navButton: {
    textAlign: "center",
    fontSize: 24,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
