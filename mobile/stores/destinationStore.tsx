// stores/destinationStore.ts
import { create } from 'zustand';
import { Destination } from '../types/destination';
import { router } from 'expo-router';

interface DestinationStore {
  selectedDestination: Destination | null;
  setSelectedDestination: (destination: Destination) => void;
  navigateToDestination: (destination: Destination) => void;
}

export const useDestinationStore = create<DestinationStore>((set) => ({
  selectedDestination: null,
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
  navigateToDestination: (destination: Destination) => {
    // IMPORTANT: Set the destination FIRST
    set({ selectedDestination: destination });
    
    // Then navigate
    const categorySlug = destination.category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/destination/${categorySlug}/${destination.destination_id}`);
  },
}));