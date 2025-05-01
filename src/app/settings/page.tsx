'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [storefront, setStorefront] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateStorefront = async () => {
    try {
      setIsCreating(true);
      const response = await fetch('/api/storefront', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My Storefront',
          description: 'Welcome to my storefront',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create storefront');
      }

      const data = await response.json();
      setStorefront(data);
      router.push('/storefront');
    } catch (error) {
      console.error('Error creating storefront:', error);
      toast.error('Failed to create storefront. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!storefront) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Briklyst</h1>
            <p className="text-lg text-gray-600 mb-8">
              Let&apos;s get your storefront set up. This will only take a moment.
            </p>
            <button
              onClick={handleCreateStorefront}
              disabled={isCreating}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                isCreating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your storefront...
                </>
              ) : (
                'Create My Storefront'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default SettingsPage; 