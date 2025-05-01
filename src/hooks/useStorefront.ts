import { useState, useEffect } from 'react';

interface Storefront {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export function useStorefront() {
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/storefronts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch storefront');
        }

        const data = await response.json();
        setStorefront(data);
      } catch (err) {
        console.error('Error fetching storefront:', err);
        setError(err instanceof Error ? err.message : 'Failed to load storefront');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStorefront();
  }, []);

  return { storefront, isLoading, error };
} 