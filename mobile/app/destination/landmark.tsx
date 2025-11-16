import React from 'react';
import { router } from 'expo-router';

import { ScrollView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { 
    MapPin,
    CarTaxiFront,
    ChevronLeft,
  } from 'lucide-react-native';

import { Destination } from '../../types/destination';

import { CircleActionButton } from '../../components/CircleActionButton'; 
import { MediaCard } from '../../components/MediaCard';


interface LandmarkScreenProps {
  destination: Destination;
}

interface OpenMapsParams {
    latitude: number;
    longitude: number;
    placeName: string;
  }
  
  export const openGoogleMaps = async ({ latitude, longitude, placeName }: OpenMapsParams) => {
    try {
      // Encode the place name for URL
      const encodedPlaceName = encodeURIComponent(placeName);
      
      const urls = {
        ios: `maps://?q=${encodedPlaceName}&ll=${latitude},${longitude}`,
        android: `geo:${latitude},${longitude}?q=${encodedPlaceName}`,
        web: `https://www.google.com/maps?q=${latitude},${longitude}&q=${encodedPlaceName}`
      };
  
      const url = Platform.OS === 'ios' ? urls.ios : 
                  Platform.OS === 'android' ? urls.android : urls.web;
  
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback to web version
        await Linking.openURL(urls.web);
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert('Error', 'Could not open Google Maps');
    }
  };

const horizontalData = [
  {
    destination_id: '1',
    image: 'https://360nomad.org/walking-to-victoria-peak/hong-kong-harbour-from-victoria-peak-360nomad-org/',
    name: 'Featured Destination',
    description: 'Top pick for this week',
  },
  {
    destination_id: '2',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
    name: 'Popular Spot',
    description: 'Most visited location',
  },
  {
    destination_id: '3',
    image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
    name: 'Hidden Gem',
    description: 'Less crowded, amazing views',
  },
  {
    destination_id: '4',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    name: 'Cultural Site',
    description: 'Rich history and tradition',
  },
];

export default function LandmarkScreen({ destination }: LandmarkScreenProps) {
    const handleOpenMaps = () => {
        openGoogleMaps({
          latitude: destination.latitude,
          longitude: destination.longitude,
          placeName: destination.name
        });
    };

    const openUber = (latitude: number, longitude: number, placeName: string) => {
        const url = `uber://?action=setDropoff&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[nickname]=${encodeURIComponent(placeName)}`;
        
        Linking.openURL(url).catch(() => {
          Alert.alert('Uber not installed', 'Please install Uber app');
        });
      };
      
    // Usage in your Uber button
    const handleUberPress = () => {
        openUber(destination.latitude, destination.longitude, destination.name);
    };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.backOverlay, { zIndex: 999 }]}
            activeOpacity={0.7} // Optional: control press feedback
            >
            <View style={styles.backOverlayButton}>
                <ChevronLeft size={22} />
            </View>
        </TouchableOpacity>

          <View style={styles.imageOverlay}>
            <View style={styles.imageOverlayText}>
              <Text style={styles.sectionTitle}>{destination.name}</Text>
              <Text style={styles.location}>{destination.hour}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionContainer}>
          <CircleActionButton
            onPress={handleOpenMaps} 
            icon={MapPin}
            title="Direction"
          />
          <CircleActionButton
            icon={CarTaxiFront}
            title="Order Uber Taxi"
            onPress={handleUberPress}
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionContent}>{destination.location}</Text>
          </View>

          <View style={styles.movieSection}>
            <Text style={styles.sectionTitle}>In Media</Text>
            <FlatList
              data={horizontalData}
              overScrollMode='never'
              renderItem={({ item }) => (
                <MediaCard
                  imageUrl={item.image}
                  title={item.name}
                  description={item.description}
                  onPress={() => console.log('Pressed:', item.name)}
                />
              )}
              keyExtractor={(item) => item.destination_id}
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
  backOverlay: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 50,
  },
  backOverlayButton: {
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
    marginBottom: 8,
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
    gap: 12, // Add gap between cards
  },
  horizontalFlatList: {
    height: 200, // Fixed height for horizontal FlatList
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