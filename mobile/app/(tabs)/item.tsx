import React from 'react';
import { Image } from 'expo-image'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
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