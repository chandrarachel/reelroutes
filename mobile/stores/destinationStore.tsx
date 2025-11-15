// stores/destinationStore.ts
import { create } from 'zustand';
import { Destination } from '../types/destination';

interface DestinationStore {
  selectedDestination: Destination | null;
  setSelectedDestination: (destination: Destination) => void;
}

export const useDestinationStore = create<DestinationStore>((set) => ({
  selectedDestination: null,
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
}));