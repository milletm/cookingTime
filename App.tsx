import React from "react";
import { RecipesProvider } from "./src/context/RecipesContext";
import Routes from "./src/screens/Routes";
import { StatusBar } from "expo-status-bar";

const App: React.FC = () => {
  return (
    <RecipesProvider>
      <StatusBar style="dark" />
      <Routes />
    </RecipesProvider>
  );
};
export default App;
