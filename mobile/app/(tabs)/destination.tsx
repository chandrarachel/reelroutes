import React from 'react';
import { useRouter, Link } from "expo-router";
import { Image } from 'expo-image'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Funnel } from 'lucide-react-native';
import { VerticalCard } from '../../components/VerticalCardProp';
import { Destination } from '../../types/destination';
import { useDestinations } from '../../hooks/useDestinations';
import { useDestinationStore } from '../../stores/destinationStore';

export default function Dashboard() {
    const router = useRouter();
    const { setSelectedDestination } = useDestinationStore();
    const { destinations, loading, error } = useDestinations();

    const handlePress = (destination: Destination) => {
        setSelectedDestination(destination);
        console.log(destination.name);
        router.push('/');
      };

  return (
    <SafeAreaView style={styles.container}>
      {/* Absolute Title */}
      <View style={styles.headerContainer}>
        <Image
            style={{width:26, height:26, alignSelf:'center'}}
            source={require('@/assets/reelroutes-stroke-symbol.svg')}
            contentFit='contain'
        />
        <Text style={styles.title}>Saved</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.search}>
            <Search size={20} color="#666" />
            <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#999"
            />
        </View>
        <View style={styles.filterButton}>
                <Funnel size={20}/>
        </View>
      </View>

      <FlatList
        data={destinations}
        renderItem={({ item }) => (
          <VerticalCard
            imageUrl={item.image}
            title={item.name}
            description={item.description}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={(item) => item.user_id}
        showsVerticalScrollIndicator={false}
      />

      {/* Your content below */}
      <View style={styles.content}>
        {/* Your cards or other content */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    color: 'black',
  },
  image: {
    width: '100%',
    height: 100,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    width: '80%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingTop: 10,
    width: '20%',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
  }
});