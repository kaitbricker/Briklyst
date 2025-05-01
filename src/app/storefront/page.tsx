'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import StorefrontForm from '@/components/StorefrontForm';

export default function StorefrontPage() {
  const router = useRouter();
  const [storefront, setStorefront] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const response = await fetch('/api/storefront');
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/settings');
            return;
          }
          throw new Error('Failed to fetch storefront');
        }
        const data = await response.json();
        setStorefront(data);
      } catch (error) {
        console.error('Error fetching storefront:', error);
        toast.error('Failed to load storefront');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStorefront();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!storefront) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Storefront Settings</h1>
        <StorefrontForm initialData={storefront} />
      </div>
    </div>
  );
} 