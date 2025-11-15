import { Destination } from '../types/destination';
import { mockDestinations } from '../data/mockDestination';

// Mock service that will be replaced with real API calls
export class DestinationService {
  // This will be replaced with real API call
  static async getDestinations(): Promise<Destination[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDestinations);
      }, 1000);
    });
  }

  // This will be replaced with real API call
  static async getDestinationById(id: string): Promise<Destination | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const destination = mockDestinations.find(dest => dest.id === id);
        resolve(destination || null);
      }, 500);
    });
  }
}