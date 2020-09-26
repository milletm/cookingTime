import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppScreenParamList = {
  App: undefined;
  Default: undefined;
  Home: undefined;
  Favorite: undefined;
  ShoppingList: undefined;
  Detail: undefined;
};

export type AppNavProps<T extends keyof AppScreenParamList> = {
  navigation: StackNavigationProp<AppScreenParamList, T>;
  route: RouteProp<AppScreenParamList, T>;
};
