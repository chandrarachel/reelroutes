import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SimpleSplashProps {
  onSplashComplete: () => void;
}

export default function SimpleSplash({ onSplashComplete }: SimpleSplashProps) {
  useEffect(() => {
    // Show splash for 2 seconds then proceed
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/SPLASH SCREEN 2K.png')} // Your full-screen splash image
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImage: {
    width: width,
    height: height,
  },
});