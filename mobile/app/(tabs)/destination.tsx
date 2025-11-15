import React from 'react';
import { Image } from 'expo-image'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Funnel } from 'lucide-react-native';
import { VerticalCard } from '../../components/VerticalCardProp';
// import RRLogo from '../assets/reelroutes-stroke-symbol.svg';

const data = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-0b10b2484a93',
      title: 'Tokyo Tower',
      description: 'Experience breathtaking views of Tokyo from this iconic landmark. The tower offers observation decks and beautiful city vistas.',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      title: 'Mount Fuji',
      description: 'Climb or view the majestic Mount Fuji, Japan\'s highest mountain. A UNESCO World Heritage site with stunning natural beauty.',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
      title: 'Fushimi Inari Shrine',
      description: 'Famous for its thousands of vermilion torii gates that form beautiful pathways through the forest.',
    },
];

export default function Dashboard() {
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
        data={data}
        renderItem={({ item }) => (
          <VerticalCard
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            onPress={() => console.log('Pressed:', item.title)}
          />
        )}
        keyExtractor={(item) => item.id}
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