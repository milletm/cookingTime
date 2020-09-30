import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { AppNavProps } from '../navigation/AppScreenParamList';
import { Recipe } from '../constants/Types';

const RecipeDetail = ({ route, navigation }: AppNavProps<'Home'>) => {
  const { recipe } = route.params;
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: recipe.imgUrl }} />
      <Text>{recipe.title}</Text>
    </ScrollView>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
});
