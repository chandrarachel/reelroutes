import { useState, useEffect } from 'react';
import { Destination } from '../types/destination';
import { DestinationService } from '../services/destinationService';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await DestinationService.getDestinations();
        setDestinations(data);
      } catch (err) {
        setError('Failed to fetch destinations');
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};