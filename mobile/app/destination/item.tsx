import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Destination } from '../../types/destination';
import { router } from 'expo-router';

import { SafeAreaView } from "react-native-safe-area-context";
import { useDestinations } from '../../hooks/useDestinations';
import { CircleActionButton } from '../../components/CircleActionButton'; 
import { MediaCard } from '../../components/MediaCard';
import { 
  MapPin,
  ShoppingBag,
  ChevronLeft,
} from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';

interface ItemScreenProps {
  destination: Destination;
}

const horizontalData = [
    {
      id: '1',
      imageUrl: 'https://lifestyle.asiamiles.com/medias/83b172194ed043fe90198676e2e6ffc1/1600x1600/Cathay%2BMove%2BIn%2BStyle_suitcase_Group_large.webp',
      title: 'Cathay',
      description: 'Cathay x Samsonite suitcase (second edition)',
    },
    {
      id: '2',
      imageUrl: 'https://lifestyle.asiamiles.com/medias/53e03c319aa94dcc94629cfc3763f55c/900x900/DEL-citadel-00400580103%255B00%255D-02.webp',
      title: 'Delsey',
      description: 'DELSEY CITADEL 54CM 4 DOUBLE WHEELS EXPANDABLE TROLLEY CASE',
    },
    {
      id: '3',
      imageUrl: 'https://lifestyle.asiamiles.com/medias/8282e38a5d254bc9924878a15e6fed92/900x900/SAL_SQUASEM_Spinner_V2_Cover_Photo_1.webp',
      title: 'American Tourister',
      description: 'SQUASEM SPINNER',
    },
    {
      id: '4',
      imageUrl: 'https://lifestyle.asiamiles.com/medias/702468be58444d0baddb85c68521eaee/900x900/SAL_MINTER_Spinner_Cover_Photo_1.webp',
      title: 'Samsonite',
      description: 'MINTER Spinner',
    },
  ];

export default function ItemScreen({ destination }: ItemScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
        </View>

        <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.backOverlay, { zIndex: 999 }]}
            activeOpacity={0.7} // Optional: control press feedback
            >
            <View style={styles.backOverlayButton}>
                <ChevronLeft size={22} />
            </View>
        </TouchableOpacity>

        <View style={styles.captionContainer}>
            <Text style={styles.name}>{destination.name}</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
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
          <View style={styles.movieSection}>
            <Text style={styles.sectionTitle}>Similar Products by Cathay</Text>
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
    captionContainer: {
        padding: 20,
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