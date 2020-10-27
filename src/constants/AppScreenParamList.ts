import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Recipe, ShoppingItem } from "../constants/Types";

export type AppScreenParamList = {
  App: undefined;
  Default: undefined;
  Home: undefined;
  Favorite: undefined;
  ShoppingList: { shoppingList: ShoppingItem[] };
  Detail: { recipe: Recipe };
};

export type AppNavProps<T extends keyof AppScreenParamList> = {
  navigation: StackNavigationProp<AppScreenParamList, T>;
  route: RouteProp<AppScreenParamList, T>;
};
