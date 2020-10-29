import React, { useContext, useState, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Ingredient, Recipe } from "../constants/Types";
import { RecipesContext } from "../context/RecipesContext";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

import { ListItem, Text, Avatar } from "react-native-elements";
import { saveRecipeLocalStorage } from "../helpers/recipeLocalStorage";
import { TouchableOpacity } from "react-native-gesture-handler";
import ShoppingModal from "../components/ShoppingModal";
import Modal from "react-native-modal";
const ShopListScreen = () => {
  const { state, dispatch } = useContext(RecipesContext);
  const [shoppingList, setShoppingList] = useState<Recipe[]>([]);

  useEffect(() => {
    let recipeToShop = state.filter((recipe) => recipe.toShop);
    recipeToShop = recipeToShop.map((recipe) => {
      return { ...recipe, showIngredients: false };
    });
    setShoppingList(recipeToShop);
  }, [state]);

  const handleRemoveToShoppingList = async (shoppingItem: Recipe) => {
    const updatedRecipeIngredients = shoppingItem.ingredients.map(
      (ingerdient) => {
        return { ...ingerdient, toShop: false };
      }
    );
    let updatedRecipe = shoppingItem;
    updatedRecipe.toShop = false;
    updatedRecipe.ingredients = updatedRecipeIngredients;

    dispatch({
      type: "UPDATE_RECIPES",
      payload: updatedRecipe,
    });
    await saveRecipeLocalStorage(updatedRecipe);
  };

  const handleToggleRecipeIngredient = (recipe: Recipe) => {
    const recipeToShop = shoppingList.map((item) => {
      if (item.id === recipe.id) {
        return { ...item, showIngredients: !item.showIngredients };
      }
      return item;
    });
    setShoppingList(recipeToShop);
  };

  if (!shoppingList.length) {
    return (
      <View>
        <Text>No Shopping List for now add products in recipes </Text>
      </View>
    );
  }
  const renderRightActions = (recipe: Recipe) => {
    return (
      <RectButton
        style={styles.deleteButton}
        onPress={() => handleRemoveToShoppingList(recipe)}
      >
        <Animated.Text>Delete</Animated.Text>
      </RectButton>
    );
  };
  return (
    <View>
      {shoppingList.length &&
        shoppingList.map((recipe) => {
          return (
            <Swipeable
              key={recipe.id}
              renderRightActions={() => renderRightActions(recipe)}
            >
              <View>
                <TouchableOpacity
                  onPress={() => handleToggleRecipeIngredient(recipe)}
                >
                  <ListItem>
                    <Avatar
                      source={{ uri: recipe.imgUrl }}
                      size="large"
                      rounded
                    />
                    <ListItem.Content>
                      <ListItem.Title>{recipe.title}</ListItem.Title>
                      <ListItem.Subtitle style={styles.recipeSubtitle}>
                        {recipe.ingredients.length} Ingredients
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                </TouchableOpacity>
                <Modal
                  isVisible={recipe.showIngredients}
                  style={styles.shoppingModal}
                >
                  <ShoppingModal recipe={recipe} />
                </Modal>
              </View>
            </Swipeable>
          );
        })}
    </View>
  );
};

export default ShopListScreen;

const styles = StyleSheet.create({
  recipeSubtitle: {
    color: "grey",
    fontSize: 15,
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  shoppingModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  deleteButton: {
    backgroundColor: "red",
    alignSelf: "center",
    height: "100%",
  },
});
