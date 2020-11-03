import React, { useEffect, useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import RecipeListItem from "../components/RecipesListItem";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { AppNavProps } from "../navigation/AppScreenParamList";

const HomeScreen = ({ route, navigation }: AppNavProps<"Home">) => {
  const { state } = useContext(RecipesContext);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.recipeList}
        data={state}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => (
          <RecipeListItem
            navigate={() => navigation.navigate("Detail", { recipe: item })}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  recipeList: {
    width: "100%",
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    fontFamily: "Damascus",
    fontWeight: "bold",
    fontSize: 25,
  },
});
