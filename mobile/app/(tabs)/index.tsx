import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CircleActionButton } from './CircleActionButton'; 

export type Destination = {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  hour: string;
  direction: string;
  uber: string;
  visited?: boolean;
};

// Example mock data - using only one destination
const initialData: Destination[] = [
  {
    id: '1',
    name: 'Tokyo Tower',
    location: 'Tokyo, Japan',
    image: 'https://lansonplace.com/wp-content/uploads/shutterstock_1657814068.jpg.optimal.jpg',
    description: 'Experience the vibrant city of Tokyo from the iconic Tokyo Tower. This communications and observation tower offers breathtaking views of the city skyline.',
    hour: '9:00 AM - 10:00 PM',
    direction: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan',
    uber: 'uber://action?dropoff[latitude]=35.6586&dropoff[longitude]=139.7454',
    visited: false
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>(initialData);

  // Get the first (and only) destination
  const destination = destinations[0];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          <View style={styles.imageOverlay}>
            <View style={styles.imageOverlayText}>
              <Text style={styles.name}>{destination.name}</Text>
              <Text style={styles.location}>{destination.hour}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionContent}>{destination.direction}</Text>
          </View>

          <View style={styles.visitedContainer}>
            <Text style={styles.visitedText}>
              {destination.visited ? '✓ Visited' : 'Not visited yet'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 30,
    backgroundColor: 'white',
    padding: 16,
  },
  imageOverlayText: {
    paddingLeft: 10,
    gap: 6,
    paddingVertical: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "400",
    color: 'black',
  },
  location: {
    fontSize: 15,
    color: 'black',
    opacity: 0.9,
  },
  actionContainer: {

  },

  detailsContainer: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  visitedContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  visitedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2ecc71',
  },
});