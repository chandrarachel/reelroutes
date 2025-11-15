import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, View, Image, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDestinations } from '../../hooks/useDestinations';
import { CircleActionButton } from '../../components/CircleActionButton'; 
import { MediaCard } from '../../components/MediaCard';
import { 
  MapPin,
  ShoppingBag,
} from 'lucide-react-native';


const horizontalData = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-0b10b2484a93',
    title: 'Featured Destination',
    description: 'Top pick for this week',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
    title: 'Popular Spot',
    description: 'Most visited location',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
    title: 'Hidden Gem',
    description: 'Less crowded, amazing views',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    title: 'Cultural Site',
    description: 'Rich history and tradition',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { destinations, loading, error } = useDestinations();

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
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <CircleActionButton
            icon={MapPin}
            title="Shop Location"
            onPress={() => console.log('Direction pressed')}
          />
          <CircleActionButton
            icon={ShoppingBag}
            title="Order Online"
            onPress={() => console.log('Order Uber Taxi pressed')}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          <View style={styles.movieSection}>
            <Text style={styles.sectionTitle}>In Media</Text>
            <FlatList
              data={horizontalData}
              overScrollMode='never'
              renderItem={({ item }) => (
                <MediaCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  onPress={() => console.log('Pressed:', item.title)}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.visitedContainer}>
            <Text style={styles.visitedText}>
              {destination.visited ? '✓ Visited' : 'Mark as visited'}
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
    marginTop: 15,
    gap: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  detailsContainer: {
    padding: 20,
  },
  movieSection: {},
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: 'black',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  visitedContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  visitedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#016564',
  },
});