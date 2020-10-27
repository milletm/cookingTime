import React, { useContext } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ShoppingListContext } from "../context/ShoppingListContext";

const ShopListScreen = () => {
  const { state, dispatch } = useContext(ShoppingListContext);

  useEffect(() => {
    console.log(state);
  }, []);

  if (!state.length) {
    return (
      <View>
        <Text>No Shopping List for now add products in recipes </Text>
      </View>
    );
  }
  return (
    <View>
      {state.length &&
        state.map((shoppingItem) => {
          return (
            <View key={shoppingItem.recipeId}>
              <Text>{shoppingItem.recipeTitle}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default ShopListScreen;

const styles = StyleSheet.create({});
