'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ImageUpload from './ImageUpload';

interface StorefrontFormProps {
  initialData: {
    name: string;
    description: string;
    logoUrl?: string;
    bannerUrl?: string;
  };
}

export default function StorefrontForm({ initialData }: StorefrontFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/storefront', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update storefront');
      }

      toast.success('Storefront updated successfully');
    } catch (error) {
      console.error('Error updating storefront:', error);
      toast.error('Failed to update storefront');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Storefront Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo
        </label>
        <ImageUpload
          onUpload={(url) => setFormData((prev) => ({ ...prev, logoUrl: url }))}
          value={formData.logoUrl}
          label="Upload Logo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Banner Image
        </label>
        <ImageUpload
          onUpload={(url) => setFormData((prev) => ({ ...prev, bannerUrl: url }))}
          value={formData.bannerUrl}
          label="Upload Banner"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
} 