import React, { useEffect, useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppScreenParamList } from "../constants/AppScreenParamList";
import HomeScreen from "./HomeScreen";
import RecipeDetail from "./RecipeDetail";
import FavoriteScreen from "./FavoriteScreen";
import ShopListScreen from "./ShopListScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import recipes from "../api/Recipes.json";
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Recipe } from "../constants/Types";
import { ShoppingListContext } from "../context/ShoppingListContext";
const Routes = () => {
  const { state: recipeState, dispatch: recipeDispatch } = useContext(
    RecipesContext
  );
  const { dispatch: shoppingListDispatch } = useContext(ShoppingListContext);
  const navTheme = DefaultTheme;
  navTheme.colors.background = "#fff";

  const getRecipes = () => {
    setTimeout(() => {
      const response: Recipe[] = recipes.recipes;

      recipeDispatch({
        type: "FETCH",
        payload: response,
      });
    }, 3000);
  };

  const getShoppingList = async () => {
    const savedShoppingItems = await AsyncStorage.getItem("shoppingList");
    let shoppingItems = [];

    if (savedShoppingItems !== null) {
      shoppingItems = JSON.parse(savedShoppingItems);
    }
    shoppingListDispatch({
      type: "FETCH",
      payload: shoppingItems,
    });
  };

  useEffect(() => {
    getRecipes();
    getShoppingList();
  }, []);

  if (!recipeState.length) {
    return (
      <View>
        <StatusBar style="light" />
        <ImageBackground
          source={require("../../assets/defaultBackground.jpg")}
          style={styles.logoImageBackground}
          resizeMode="cover"
        >
          <ActivityIndicator animating={true} size="large" color="white" />
        </ImageBackground>
      </View>
    );
  }

  const Stack = createStackNavigator<AppScreenParamList>();
  const Tab = createBottomTabNavigator<AppScreenParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" options={{ headerTitle: "Cooking Time" }}>
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = "";
                  if (route.name === "Home") {
                    iconName = "home";
                  } else if (route.name === "Favorite") {
                    iconName = focused ? "favorite" : "favorite-border";
                  } else if (route.name === "ShoppingList") {
                    iconName = "list";
                  }
                  return (
                    <MaterialIcons name={iconName} size={size} color={color} />
                  );
                },
                tabBarOptions: {
                  labelPosition: "below-icon",
                },
              })}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: "Recettes" }}
              />
              <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{ tabBarLabel: "Favoris" }}
              />
              <Tab.Screen
                name="ShoppingList"
                component={ShopListScreen}
                options={{ tabBarLabel: "Liste de course" }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Detail"
          options={{
            headerShown: false,
          }}
          component={RecipeDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  logoImageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
