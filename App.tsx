import React from 'react';
import { StyleSheet } from 'react-native';
import { RecipesProvider } from './src/context/RecipesContext';
import Routes from './src/screens/Routes';

export default function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
