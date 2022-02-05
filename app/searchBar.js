import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export default function SearchBar() {
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState(
    {
      'clothing': {
        name: "clothing",
        active: false
      },
      'technology/appliances': {
        name: "technology/appliances",
        active: false
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
  )

  const handleSubmit = event => {
    console.log(search)
    event.preventDefault()
  }

  const handlePress = (tag) => {
    console.log(tag)
    setFilters({
      ...filters,
      tag.active = true
    })
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
            style={styles.filterButton}
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
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
  },
  filterText: {
    color: 'black',
  }
});

