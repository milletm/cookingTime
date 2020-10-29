import React, {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ButtonGroup, ListItem, Button } from "react-native-elements";
import { Ingredient, Recipe } from "../constants/Types";
import { MaterialIcons } from "@expo/vector-icons";
import { RecipesContext } from "../context/RecipesContext";
import { saveRecipeLocalStorage } from "../helpers/recipeLocalStorage";

interface ShoppingModalProps {
  recipe: Recipe;
}
const ShoppingModal = ({ recipe }: ShoppingModalProps) => {
  const [shoppingItems, setShoppingItems] = useState<Array<Ingredient>>([]);
  const { state, dispatch } = useContext(RecipesContext);

  useEffect(() => {
    setShoppingItems(recipe.ingredients);
  }, []);

  const handleChooseShoppingItems = (ingredient: Ingredient) => {
    const updatedIngredientsList = shoppingItems.map((item) => {
      if (item.label === ingredient.label) {
        return { ...item, toShop: !item.toShop };
      }
      return item;
    });

    setShoppingItems(updatedIngredientsList);
  };
  const handleCloseModal = async () => {
    let updatedRecipe = recipe;
    updatedRecipe.ingredients = shoppingItems;
    recipe.showIngredients = false;
    dispatch({
      type: "UPDATE_RECIPES",
      payload: recipe,
    });
    await saveRecipeLocalStorage(updatedRecipe);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCloseModal}>
        <MaterialIcons
          name="clear"
          size={24}
          color="grey"
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <ScrollView style={styles.ingredientsListContainer}>
        {shoppingItems.map((ingredient: Ingredient) => (
          <TouchableOpacity
            onPress={() => handleChooseShoppingItems(ingredient)}
            key={ingredient.label}
          >
            <ListItem>
              <MaterialIcons
                name={ingredient.toShop ? "shopping-basket" : "check-circle"}
                size={24}
                color={ingredient.toShop ? "black" : "grey"}
              />
              <ListItem.Content style={styles.ingredientsList}>
                <ListItem.Title
                  numberOfLines={2}
                  style={styles.ingredientLabel}
                >
                  {ingredient.label}
                </ListItem.Title>
                <ListItem.Title>{ingredient.quantity}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShoppingModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10,
  },
  ingredientsListContainer: {
    marginTop: 10,
  },
  ingredientsList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredientLabel: {
    flex: 1,
    flexWrap: "wrap",
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  closeIcon: {
    margin: 5,
    alignSelf: "flex-end",
  },
});
