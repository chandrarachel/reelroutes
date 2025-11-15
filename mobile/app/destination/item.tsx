import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Star, Users } from 'lucide-react-native';
import { Destination } from '../../types/destination';

interface ItemScreenProps {
  destination: Destination;
}

export default function ItemScreen({ destination }: ItemScreenProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Image */}
      <Image source={{ uri: destination.image }} style={styles.heroImage} />
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>🏛️ {destination.name}</Text>
        <Text style={styles.subtitle}>Iconic Landmark</Text>
        
        {/* Quick Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <MapPin size={20} color="#666" />
            <Text style={styles.infoText}>{destination.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={20} color="#666" />
            <Text style={styles.infoText}>{destination.hour}</Text>
          </View>
        </View>
        
        {/* Description */}
        <Text style={styles.description}>{destination.description}</Text>
        
        {/* Features */}
        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Landmark Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Observation decks</Text>
            <Text style={styles.featureItem}>• Photo opportunities</Text>
            <Text style={styles.featureItem}>• Guided tours available</Text>
            <Text style={styles.featureItem}>• Souvenir shops</Text>
          </View>
        </View>
        
        {/* Visitor Tips */}
        <View style={styles.tips}>
          <Text style={styles.sectionTitle}>Visitor Tips</Text>
          <Text style={styles.tipText}>Best visited in the morning to avoid crowds. Don't forget your camera for stunning city views!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 25,
  },
  features: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  tips: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 20,
  },
});