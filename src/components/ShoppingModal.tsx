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
import { Ingredient } from "../constants/Types";
import { MaterialIcons } from "@expo/vector-icons";
import { ShoppingListContext } from "../context/ShoppingListContext";

interface ShoppingModalProps {
  ingredients: Array<Ingredient>;
  recipeId: string;
  saveShoppingList: (ingredients: Ingredient[]) => void;
}
const ShoppingModal = ({
  ingredients,
  saveShoppingList,
  recipeId,
}: ShoppingModalProps) => {
  const [shoppingItems, setShoppingItems] = useState<Array<Ingredient>>([]);
  const { state: shoppingListState } = useContext(ShoppingListContext);

  useEffect(() => {
    const currentShoppingItem = shoppingListState.find(
      (item) => item.recipeId === recipeId
    );

    if (shoppingListState.length && currentShoppingItem) {
      setShoppingItems(currentShoppingItem.ingredients);
    }
  }, []);

  const handleChooseShoppingItems = (ingredient: Ingredient) => {
    const newItemsList = shoppingItems.find(
      (item) => item.label === ingredient.label
    )
      ? shoppingItems.filter((e) => e.label !== ingredient.label)
      : [...shoppingItems, ingredient];

    setShoppingItems(newItemsList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ajouter les ingredients à la liste de course
      </Text>
      <ScrollView style={styles.ingredientsListContainer}>
        {ingredients.map((ingredient: Ingredient) => (
          <TouchableOpacity
            onPress={() => handleChooseShoppingItems(ingredient)}
            key={ingredient.label}
          >
            <ListItem>
              <MaterialIcons
                name={
                  shoppingItems.find((item) => item.label === ingredient.label)
                    ? "remove-circle"
                    : "add-circle-outline"
                }
                size={24}
                color="black"
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
      <Button
        style={styles.button}
        type="outline"
        title="Valider La liste"
        onPress={() => saveShoppingList(shoppingItems)}
      />
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
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
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
});
