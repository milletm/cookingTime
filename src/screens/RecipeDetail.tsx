import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Modal from "react-native-modal";
import { AppNavProps } from "../constants/AppScreenParamList";
import {
  Recipe,
  Ingredient,
  Instruction,
  ShoppingItem,
} from "../constants/Types";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonGroup, ListItem, Button } from "react-native-elements";
import { primary, lightgray, whitesmoke } from "../constants/Colors";
import ShoppingModal from "../components/ShoppingModal";
import { ShoppingListContext } from "../context/ShoppingListContext";

const RecipeDetail = ({ route, navigation }: AppNavProps<"Detail">) => {
  const { recipe } = route.params;
  const [currentTab, setCurrentTab] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shoppingItems, setShoppingItems] = useState<Array<Ingredient>>([]);
  const {
    state: shoppingListState,
    dispatch: shoppingListDispatch,
  } = useContext(ShoppingListContext);

  const buttons = ["Ingredients", "Instructions"];

  useEffect(() => {
    saveShoppingListToLocaleStorage();
  }, [shoppingListState]);

  const updateIndex = (selectedIndex: number) => {
    setCurrentTab(selectedIndex);
  };

  const handleSaveShoppingList = async (ingredients: Ingredient[]) => {
    const shoppingItemIndex = shoppingListState.findIndex(
      (item) => item.recipeId === recipe.id
    );
    if (
      shoppingListState.length &&
      shoppingItemIndex !== -1 &&
      ingredients.length
    ) {
      // Update
      shoppingListDispatch({
        type: "UPDATE",
        payload: {
          shoppingItem: {
            ingredients: ingredients,
            recipeId: recipe.id,
            recipeTitle: recipe.title,
          },
          index: shoppingItemIndex,
        },
      });
    } else if (ingredients.length) {
      // ADD
      shoppingListDispatch({
        type: "ADD",
        payload: {
          ingredients: ingredients,
          recipeId: recipe.id,
          recipeTitle: recipe.title,
        },
      });
    } else {
      // REMOVE
      shoppingListDispatch({
        type: "DELETE",
        payload: shoppingItemIndex,
      });
    }
    setModalVisible(false);
  };

  const saveShoppingListToLocaleStorage = async () => {
    await AsyncStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListState)
    );
    const savedShoppingItems = await AsyncStorage.getItem("shoppingList");
  };

  const handleChooseShoppingItems = (ingredient: Ingredient) => {
    const newItemsList = shoppingItems.find(
      (item) => item.label === ingredient.label
    )
      ? shoppingItems.filter((e) => e !== ingredient)
      : [...shoppingItems, ingredient];
    setShoppingItems(newItemsList);
  };

  const handleToogleFavorite = () => {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.image}
          source={{
            uri: recipe.imgUrl,
          }}
        >
          <SafeAreaView>
            <View style={styles.topButtonsContainer}>
              <View style={styles.topButton}>
                <TouchableOpacity onPress={navigation.goBack}>
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={38}
                    color={lightgray}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.topButton}>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                  <MaterialIcons
                    name={favorite ? "favorite" : "favorite-border"}
                    size={25}
                    color={favorite ? primary : lightgray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoContent}>
              <MaterialIcons name="timer" size={30} color={primary} />
              <Text style={styles.infoText}>{recipe.time}</Text>
            </View>
            <View style={styles.infoContent}>
              <MaterialIcons name="people-outline" size={30} color={primary} />
              <Text style={styles.infoText}>2</Text>
            </View>
          </View>
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={currentTab}
            buttons={buttons}
            buttonStyle={styles.buttonStyle}
            selectedButtonStyle={styles.selectedButtonStyle}
            buttonContainerStyle={styles.buttonContainerStyle}
            innerBorderStyle={styles.innerBorderStyle}
            containerStyle={styles.containerStyle}
          />
          {currentTab === 0 && (
            <View style={styles.ingredientsListContainer}>
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <TouchableOpacity
                  onPress={() => handleChooseShoppingItems(ingredient)}
                  key={ingredient.label}
                >
                  <ListItem>
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
              <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={styles.shoppingModal}
              >
                <ShoppingModal
                  ingredients={recipe.ingredients}
                  saveShoppingList={handleSaveShoppingList}
                  recipeId={recipe.id}
                />
              </Modal>
              <Button
                style={styles.shoppingButton}
                type="outline"
                title="Ajouter à la liste à faire"
                onPress={() => setModalVisible(true)}
              />
            </View>
          )}
          {currentTab === 1 &&
            recipe.instructions.map(
              (instruction: Instruction, index: number) => (
                <ListItem key={index} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Content style={styles.instructionHeader}>
                      <View style={styles.step}>
                        <Text style={styles.stepNumber}>
                          {instruction.step}
                        </Text>
                      </View>
                      <Text style={styles.stepText}>{instruction.title}</Text>
                    </ListItem.Content>
                    <ListItem.Subtitle>
                      {instruction.instruction}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  topButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoContent: {
    alignItems: "center",
  },
  infoText: {
    fontWeight: "bold",
  },
  selectedButtonStyle: {
    backgroundColor: primary,
    color: "#FFF",
  },
  buttonStyle: {
    borderRadius: 25,
  },
  buttonContainerStyle: {
    backgroundColor: whitesmoke,
  },
  innerBorderStyle: {
    width: 0,
  },
  containerStyle: {
    marginTop: 25,
    borderRadius: 25,
    height: 45,
  },
  ingredientsListContainer: {
    marginTop: 20,
    borderRadius: 150,
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
  },
  ingredientsList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shoppingButton: {
    marginTop: 20,
  },
  ingredientLabel: {
    flex: 1,
    flexWrap: "wrap",
  },
  instructionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumber: {
    color: whitesmoke,
  },
  stepText: {
    fontWeight: "bold",
  },
  shoppingModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
