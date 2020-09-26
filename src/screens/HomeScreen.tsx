import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { StyleSheet, Text, View, FlatList } from 'react-native';
const HomeScreen = () => {
  const { state, dispatch } = useContext(RecipesContext);
  return (
    <View>
      <Text>Home screen</Text>
      <FlatList
        data={state.recipes}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
