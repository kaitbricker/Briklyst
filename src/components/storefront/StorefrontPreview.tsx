import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useStorefrontUpdate } from '@/context/StorefrontUpdateContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Heart } from 'lucide-react';

interface StorefrontPreviewProps {
  storefront: any;
  isEditing?: boolean;
}

export default function StorefrontPreview({ storefront, isEditing = false }: StorefrontPreviewProps) {
  const [previewData, setPreviewData] = useState(storefront);
  const { lastUpdated, pendingUpdates } = useStorefrontUpdate();

  useEffect(() => {
    if (isEditing) {
      // Merge pending updates with the current storefront data
      setPreviewData(prev => ({
        ...prev,
        ...storefront,
        ...pendingUpdates
      }));
    } else {
      setPreviewData(storefront);
    }
  }, [storefront, lastUpdated, pendingUpdates, isEditing]);

  if (!previewData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Banner */}
      {previewData.bannerUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={previewData.bannerUrl}
            alt="Storefront banner"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={previewData.logoUrl || '/placeholder-logo.png'}
              alt="Storefront logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: previewData.theme?.textColor }}>
              {previewData.name}
            </h1>
            {previewData.tagline && (
              <p className="text-gray-600 mt-1">{previewData.tagline}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {previewData.description && (
          <p className="mt-4 text-gray-600">{previewData.description}</p>
        )}

        {/* Social Links */}
        {previewData.socials && (
          <div className="flex gap-4 mt-4">
            {previewData.socials.instagram && (
              <a href={previewData.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
            )}
            {previewData.socials.twitter && (
              <a href={previewData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
            )}
            {previewData.socials.tiktok && (
              <a href={previewData.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                TikTok
              </a>
            )}
            {previewData.socials.youtube && (
              <a href={previewData.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                YouTube
              </a>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Follow
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Products Preview */}
      {previewData.products && previewData.products.length > 0 && (
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewData.products.slice(0, 6).map((product: any) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">${product.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 