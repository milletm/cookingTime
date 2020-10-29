import { AsyncStorage } from "react-native";
import { Recipe } from "../constants/Types";

export const saveRecipeLocalStorage = async (recipe: Recipe): Promise<void> => {
  const savedRecipes = await AsyncStorage.getItem("savedRecipes");
  let recipeToSave: Recipe[] = [];

  if (savedRecipes !== null) {
    recipeToSave = JSON.parse(savedRecipes);
    if (recipeToSave.find((item: Recipe) => item.id === recipe.id)) {
      recipeToSave = recipeToSave.map((item: Recipe) => {
        if (item.id === recipe.id) {
          return recipe;
        }
        return item;
      });
    } else {
      recipeToSave.push(recipe);
    }
  } else {
    recipeToSave.push(recipe);
  }
  await AsyncStorage.setItem("savedRecipes", JSON.stringify(recipeToSave));
};

export const getRecipeLocalStorage = async (): Promise<Recipe[]> => {
  const savedRecipes = await AsyncStorage.getItem("savedRecipes");
  return savedRecipes !== null ? JSON.parse(savedRecipes) : [];
};
