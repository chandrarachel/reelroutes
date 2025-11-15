import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface CardProps {
  imageUrl: string;
  title: string;
  description?: string;
  onPress?: () => void;
  cardWidth?: number; // Optional custom width
}

export const MediaCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  onPress,
  cardWidth,
}) => {
  return (
    <TouchableOpacity style={[styles.card, cardWidth ? { width: cardWidth } : {}]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 5) / 2; // For 2-column grid with proper spacing

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    width: CARD_WIDTH, // Fixed width for consistent sizing
  },
  imageContainer: {
    width: '100%',
    height: 160, // Fixed height for all images
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0', // Fallback color while loading
  },
  content: {
    paddingTop: 10,
    paddingLeft: 2,
    minHeight: 80, // Ensure consistent content area height
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});