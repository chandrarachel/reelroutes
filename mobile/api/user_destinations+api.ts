import { Destination } from '../types/destination';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

class LikesService {
    async getUserLikes(userId: string): Promise<Destination[]> {
      try {
        const response = await fetch(`${API_BASE_URL}/likes/user/${userId}/likes`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch likes: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('LikesService.getUserLikes error:', error);
        throw error;
      }
    }
  }
  
  export const likesService = new LikesService();