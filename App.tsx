import React from "react";
import { RecipesProvider } from "./src/context/RecipesContext";
import Routes from "./src/screens/Routes";
import { StatusBar } from "expo-status-bar";
import { ShoppingListProvider } from "./src/context/ShoppingListContext";

const App: React.FC = () => {
  return (
    <RecipesProvider>
      <ShoppingListProvider>
        <StatusBar style="dark" />
        <Routes />
      </ShoppingListProvider>
    </RecipesProvider>
  );
};
export default App;
