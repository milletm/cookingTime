import React from 'react';
import { StyleSheet } from 'react-native';
import { RecipesProvider } from './src/context/RecipesContext';
import Routes from './src/screens/Routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <RecipesProvider>
      <StatusBar style="dark" />
      <Routes />
    </RecipesProvider>
  );
}
