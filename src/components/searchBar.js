import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import ContentCard from './UI/ContentCard';;
import { db } from '../firebase';
import { collection, doc, query, where, getDocs } from 'firebase/firestore';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    'clothing': false,
    'appliances': false,
    'furniture': false,
    'bathroom': false,
    'house': false,
    'kitchen': false,
    'automotives': false,
  });

//   const postData = {
//     category: "clothing",
//     title: "post title",
//     author: "Firstname Lastname",
//     body: "thsi is the body of the post",
//     description: "a short description",
//     date: new Date(1644095338065),
//     likes: 12,
// }
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
      postsJSXList.push(<ContentCard data={post}/>);
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

  return (
    <AuthProvider>
      <View style={styles.container}>
        <SearchBar />
        <Text>Sign in screen</Text>
        <Button
          onPress={routeToCard}
          title="Sign in with Google"
        />
      </View>
    
    <View style={styles.container}>
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
              tag[1] ? styles.buttonPressed : styles.button
            }
            onPress={() => handlePress(tag[0])}
          >
            <Text style={styles.filterText}>{tag[0]}</Text>
          </Pressable>
        ))}
      </View>


      <View>
        {postsJSX ? postsJSX : null}
      </View>

    </View>  
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '50%',
  },
  input: {
    height: 40,
    width: '100%',
    color: 'black',
    borderWidth: 1,
    padding: 10,
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
  buttonPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'lightblue',
  },
  filterText: {
    color: 'black',
  }
  
});

