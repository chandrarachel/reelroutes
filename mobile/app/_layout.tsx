import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import SimpleSplash from '../components/SimpleSplash';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const colorScheme = useColorScheme();

  const handleSplashComplete = async () => {
    setShowSplash(false);
    await SplashScreen.hideAsync();
  };

  // Show simple splash screen first
  if (showSplash) {
    return <SimpleSplash onSplashComplete={handleSplashComplete} />;
  }

  // Main app
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="destination/[category]/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar />
    </ThemeProvider>
  );
}