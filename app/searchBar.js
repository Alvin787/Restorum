import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { ContentCard } from '../src/components/ContentCard';;
import { db } from '../src/firebase';
import { collection, doc, query, where } from 'firebase/firestore';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');
  const filters =
  {
    'clothing': {
      name: "clothing",
      active: true
    },
    'technology/appliances': {
      name: "technology/appliances",
      active: true
    },
    'furniture': {
      name: "furniture",
      active: false
    },
    'bathroom': {
      name: "bathroom",
      active: false
    },
    'house': {
      name: "house",
      active: false
    },
    'kitchen': {
      name: "kitchen",
      active: false
    },
  }

  const handleSubmit = event => {
    console.log(search);
    event.preventDefault();
    Object.entries(filters).map((tag) => {
      console.log(tag[1].active);
      if(tag[1].active){
        const tagDocRef = db.collection('categories').doc(tag[0]).collection('posts');
        // const q = query(tagDocRef, where())
      }
    });
  }

  const handlePress = (tag) => {
    filters[tag].active = !filters[tag].active
    // event.preventDefault()
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
            style={tag.active ? (styles.buttonPressed) : (styles.button)}
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
    backgroundColor: 'red',
  },
  filterText: {
    color: 'black',
  }
});

