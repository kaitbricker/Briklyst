import { useState, useEffect } from 'react';

export const useStorefront = () => {
  const [storefront, setStorefront] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefront');
        if (response.ok) {
          const data = await response.json();
          setStorefront(data);
        }
      } catch (error) {
        console.error('Error fetching storefront:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStorefront();
  }, []);

  return { storefront, isLoading };
}; 