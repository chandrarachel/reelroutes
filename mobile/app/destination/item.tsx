import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { Destination } from '../../types/destination';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { CircleActionButton } from '../../components/CircleActionButton'; 
import { MediaCard } from '../../components/MediaCard';
import { 
  MapPin,
  ShoppingBag,
  ChevronLeft,
} from 'lucide-react-native';

interface ItemScreenProps {
  destination: Destination;
}

interface OpenMapsParams {
  latitude: number;
  longitude: number;
  placeName: string;
}

export const openGoogleMaps = async ({ latitude, longitude, placeName }: OpenMapsParams) => {
  try {
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
      await Linking.openURL(urls.web);
    }
  } catch (error) {
    console.error('Error opening Google Maps:', error);
    Alert.alert('Error', 'Could not open Google Maps');
  }
};

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

const HEADER_HEIGHT = 300;

export default function ItemScreen({ destination }: ItemScreenProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const handleOpenMaps = () => {
    openGoogleMaps({
      latitude: destination.latitude,
      longitude: destination.longitude,
      placeName: destination.location
    });
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >
        {/* Parallax Image Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image 
            source={{ uri: destination.image }} 
            style={styles.image}
          />
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.captionContainer}>
            <Text style={styles.name}>{destination.name}</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          <View style={styles.actionContainer}>
            <CircleActionButton
              onPress={handleOpenMaps}
              icon={MapPin}
              title="Shop Location"
            />
            <CircleActionButton
              icon={ShoppingBag}
              title="Order Online"
              onPress={() => Linking.openURL('https://lifestyle.asiamiles.com/en/HK/p/DEL_0055_70001/delsey-brochant-20-55cm-4-double-wheels-expandable-trolley-case')}
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
                {destination.visited ? '✓ Marked' : 'Mark this item'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Back Button - Positioned absolutely outside the scroll view */}
      <TouchableOpacity 
        onPress={() => router.back()}
        style={[styles.backOverlay, { zIndex: 999 }]}
        activeOpacity={0.7}
      >
        <View style={styles.backOverlayButton}>
          <ChevronLeft size={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backOverlay: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backOverlayButton: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionContainer: {
    padding: 20,
  },
  name: {
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: 'black',
    marginBottom: 8,
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