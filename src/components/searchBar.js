import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { ContentCard } from './ContentCard';;
import { db } from '../firebase';
import { collection, doc, query, where, getDocs } from 'firebase/firestore';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    'clothing': true,
    'technology/appliances': false,
    'furniture': false,
    'bathroom': false,
    'house': false,
    'kitchen': false,
  });
  const [posts, setPosts] = useState();

  const handleSubmit = (event) => {
    console.log(search);
    event.preventDefault();
    Object.entries(filters).map((tag) => {
      console.log(tag[1]);
      if(tag[1]){
        const tagDocRef = collection(db, 'categories', tag[0], 'posts');
        // const q = query(tagDocRef, where())
        getDocs(tagDocRef)
        .then((response) => {
          response.forEach((doc) => {
            console.log(doc);
          })
        });
      }
    });
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

    </View>  
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

