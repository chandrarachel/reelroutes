import { useEffect } from 'react';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { useDestinationStore } from '../../../stores/destinationStore';
import { ArrowLeft } from 'lucide-react-native';

// Import all category screens
import LandmarkScreen from '../landmark';
import ItemScreen from '../item';

import { Destination } from '../../../types/destination';

export default function DynamicDestinationScreen() {
  const { category, id, image, location, lat, lng } = useLocalSearchParams();
  const { selectedDestination } = useDestinationStore();

  useEffect(() => {
    
  }, [category, id, selectedDestination]);

  if (!selectedDestination) {
    console.log('NO SELECTED DESTINATION IN STORE');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Destination not found</Text>
        <Text style={{ color: '#666', marginTop: 8 }}>Category: {category}, ID: {id}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#007AFF', marginTop: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderScreen = () => {
    console.log('SWITCHING ON CATEGORY:', category);
    
    switch (category) {
      case 'landmark':
        return <LandmarkScreen destination={selectedDestination} />;
      case 'item':
        return <ItemScreen destination={selectedDestination} />;
      default:
        return <DefaultScreen destination={selectedDestination} />;
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: selectedDestination.name,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          )
        }} 
      />
      {renderScreen()}
    </>
  );
}

// Fallback screen for unknown categories
const DefaultScreen = ({ destination }: { destination: Destination }) => (
  <View style={{ flex: 1, padding: 16 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Default Screen: {destination.name}</Text>
    <Text style={{ fontSize: 16, color: '#666', marginTop: 8 }}>{destination.description}</Text>
    <Text style={{ fontSize: 12, color: '#999', marginTop: 16 }}>
      Category from URL didn't match any known screens
    </Text>
  </View>
);