import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { Types } from '../context/RecipesReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppScreenParamList } from '../navigation/AppScreenParamList';
import HomeScreen from './HomeScreen';
import RecipeDetail from './RecipeDetail';
import FavoriteScreen from './FavoriteScreen';
import ShopListScreen from './ShopListScreen';
import { MaterialIcons } from '@expo/vector-icons';
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

  const getRecipes = () => {
    setTimeout(() => {
      const response: Recipe[] = [
        {
          id: 'recipe01',
          title: 'Sauté de veau à la pêche',
          time: 25,
          imgUrl:
            'https://s3.eu-central-1.amazonaws.com/media.quitoque.fr/recipe_w1536_h1024/recipes/images/saute-de-veau-aux-abricots/saute-de-veau-aux-abricots-1.jpg',
          ingredients: [
            { label: "Gousse d'ail", quantity: '4g' },
            { label: 'Peche jaune', quantity: '160g' },
            { label: 'Sauté de veau bio ', quantity: '280g' },
            { label: 'Tomate', quantity: '184g' },
            { label: 'Échalote', quantity: '15g' },
          ],
          instructions: [
            {
              step: 1,
              title: 'Avant de commencer',
              instruction: `
              Lisez toutes les étapes, sortez les ingrédients et ustensiles nécessaires et rincez les fruits et légumes !
              N'hésitez pas à utiliser une grande sauteuse ou deux (pour 4 et 5 personnes) pour cuire le sauté. 
              Il est préférable que les ingrédients ne se chevauchent pas trop. La chaleur sera ainsi mieux répartie et ils cuiront plus rapidement !`,
            },
            {
              step: 2,
              title: 'Le boulgour',
              instruction: `
             Portez à ébullition une casserole d’eau pour cuire le boulgour. Utilisez si nécessaire une bouilloire pour chauffer l’eau plus vite !
             Quand l'eau bout, faites cuire 10 min jusqu'à ce qu'il soit tendre (goûtez pour vérifier). Remuez de temps en temps.
             Une fois cuit, égouttez-le et remettez-le dans la casserole. Salez, poivrez. Couvrez pour le maintenir au  chaud.`,
            },
            {
              step: 3,
              title: 'Le sauté de veau',
              instruction: `
               Dans une sauteuse, faites chauffer un filet d'huile d'olive à feu moyen à vif. 
               Coupez en deux, pelez et émincez (coupez en fines lanières) l'échalote. 
               Faites revenir l'échalote et le veau 2 à 4 min pour les dorer. 
               Coupez les tomates en dés. 
               Pressez l'ail en entier avec la peau ou hachez-le. 
               Ajoutez l'ail et les tomates à la sauteuse et faites cuire 15 min environ. Salez, poivrez. 
               Coupez la pêche&nbsp;en fins quartiers. Lorsqu'il reste 5 min de cuisson, ajoutez-la à la sauteuse. Goûtez et rectifiez l'assaisonnement si nécessaire`,
            },
            {
              step: 4,
              title: '',
              instruction: `Dégustez sans attendre votre sauté de veau à la pêche accompagné du boulgour`,
            },
          ],
        },
      ];
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
