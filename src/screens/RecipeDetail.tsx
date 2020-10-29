import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { AppNavProps } from "../constants/AppScreenParamList";
import { Ingredient, Instruction } from "../constants/Types";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonGroup, ListItem, Button } from "react-native-elements";
import { primary, lightgray, whitesmoke } from "../constants/Colors";
import { useIsMount } from "../helpers/useIsMount";
import { RecipesContext } from "../context/RecipesContext";
import { saveRecipeLocalStorage } from "../helpers/recipeLocalStorage";

const RecipeDetail = ({ route, navigation }: AppNavProps<"Detail">) => {
  const { recipe } = route.params;
  const defaultHeaderStyle = {
    backgroundColor: "transparent",
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [headerStyle, setHeaderStyle] = useState(defaultHeaderStyle);
  const [favorite, setFavorite] = useState(recipe.isFavorite);
  const [toShop, setToShop] = useState(!recipe.toShop);

  const { dispatch: recipeDispatch } = useContext(RecipesContext);
  const isMount = useIsMount();

  const buttons = ["Ingredients", "Instructions"];

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const headerColor =
      e.nativeEvent.contentOffset.y > 240
        ? "rgba(255,255,255,1)"
        : "transparent";
    setHeaderStyle({
      backgroundColor: headerColor,
    });
  };

  const handleChangeTab = (tabNumber: number) => {
    setCurrentTab(tabNumber);
  };

  const handleAddToShoppingList = async () => {
    let updatedRecipe = recipe;

    const shoppingIngredients: Ingredient[] = recipe.ingredients.map((item) => {
      return { ...item, toShop: true };
    });
    updatedRecipe.ingredients = shoppingIngredients;
    updatedRecipe.toShop = true;

    recipeDispatch({
      type: "UPDATE_RECIPES",
      payload: updatedRecipe,
    });
    await saveRecipeLocalStorage(updatedRecipe);
    setToShop(false);
  };

  const handleToogleFavorite = async () => {
    let updatedRecipe = recipe;
    recipe.isFavorite = !favorite;
    recipeDispatch({
      type: "UPDATE_RECIPES",
      payload: updatedRecipe,
    });

    await saveRecipeLocalStorage(updatedRecipe);
    setFavorite(!favorite);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.headerContainer, headerStyle]}>
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
            <TouchableOpacity onPress={handleToogleFavorite}>
              <MaterialIcons
                name={favorite ? "favorite" : "favorite-border"}
                size={25}
                color={favorite ? primary : lightgray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <ScrollView
          contentInset={{ bottom: 30 }}
          onScroll={handleScroll}
          scrollEventThrottle={30}
        >
          <ImageBackground
            style={styles.image}
            source={{
              uri: recipe.imgUrl,
            }}
          ></ImageBackground>
          <View style={styles.content}>
            <Text style={styles.title}>{recipe.title}</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoContent}>
                <MaterialIcons name="timer" size={30} color={primary} />
                <Text style={styles.infoText}>{recipe.time}</Text>
              </View>
              <View style={styles.infoContent}>
                <MaterialIcons
                  name="people-outline"
                  size={30}
                  color={primary}
                />
                <Text style={styles.infoText}>2</Text>
              </View>
            </View>
            <ButtonGroup
              onPress={handleChangeTab}
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
                  <ListItem key={ingredient.label}>
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
                ))}
                <Button
                  style={styles.shoppingButton}
                  titleStyle={{
                    color: toShop ? "#2088dc" : "grey",
                    opacity: 1,
                  }}
                  type={toShop ? "outline" : "clear"}
                  disabled={!toShop}
                  title={
                    toShop
                      ? "Ajouter à la liste de course"
                      : "Ingredients ajouté à la liste"
                  }
                  onPress={handleAddToShoppingList}
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
      </SafeAreaView>
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
  headerContainer: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    width: "100%",
  },
  topButtonsContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
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
});
