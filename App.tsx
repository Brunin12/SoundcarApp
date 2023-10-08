import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './src/screens/Home';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6400FF', // Define a cor principal como #6400FF
      accent: '#FF6347', // Define uma cor complementar (pode ser ajustada conforme necessário)
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Home />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
