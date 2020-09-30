import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { Types } from '../context/RecipesReducer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppScreenParamList } from '../navigation/AppScreenParamList';
import HomeScreen from './HomeScreen';
import RecipeDetail from './RecipeDetail';
import FavoriteScreen from './FavoriteScreen';
import ShopListScreen from './ShopListScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import recipes from '../api/Recipes.json';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Recipe } from '../constants/Types';
const Routes = () => {
  const { state, dispatch } = useContext(RecipesContext);
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  const getRecipes = () => {
    setTimeout(() => {
      const response: Recipe[] = recipes.recipes;
      dispatch({
        type: Types.Fetch,
        payload: response,
      });
    }, 3000);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  if (!state.recipes.length) {
    return (
      <View>
        <StatusBar style="light" />
        <ImageBackground
          source={require('../../assets/defaultBackground.jpg')}
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
        <Stack.Screen name="App" options={{ headerTitle: 'Cooking Time' }}>
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = '';
                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'Favorite') {
                    iconName = focused ? 'favorite' : 'favorite-border';
                  } else if (route.name === 'ShoppingList') {
                    iconName = 'list';
                  }
                  // You can return any component that you like here!
                  return (
                    <MaterialIcons name={iconName} size={size} color={color} />
                  );
                },
                tabBarOptions: {
                  labelPosition: 'below-icon',
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Favorite" component={FavoriteScreen} />
              <Tab.Screen name="ShoppingList" component={ShopListScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={RecipeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  logoImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
