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
  const theme = storefront.theme || {};

  if (!storefront) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${theme.backgroundColor} ${theme.textColor} ${theme.fontFamily?.body}`}
    >
      {/* Banner */}
      {storefront.bannerUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={storefront.bannerUrl}
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
              src={storefront.logoUrl || '/placeholder-logo.png'}
              alt="Storefront logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${theme.textColor} ${theme.fontFamily?.heading}`}>
              {storefront.name}
            </h1>
            {storefront.tagline && (
              <p className={`${theme.textColor} opacity-70`}>{storefront.tagline}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {storefront.description && (
          <p className={`${theme.textColor} opacity-70 mt-4`}>{storefront.description}</p>
        )}

        {/* Social Links */}
        {storefront.socials && (
          <div className="flex gap-4 mt-4">
            {storefront.socials.instagram && (
              <a href={storefront.socials.instagram} target="_blank" rel="noopener noreferrer" className={`${theme.textColor} opacity-80`}>
                Instagram
              </a>
            )}
            {storefront.socials.twitter && (
              <a href={storefront.socials.twitter} target="_blank" rel="noopener noreferrer" className={`${theme.textColor} opacity-80`}>
                Twitter
              </a>
            )}
            {storefront.socials.tiktok && (
              <a href={storefront.socials.tiktok} target="_blank" rel="noopener noreferrer" className={`${theme.textColor} opacity-80`}>
                TikTok
              </a>
            )}
            {storefront.socials.youtube && (
              <a href={storefront.socials.youtube} target="_blank" rel="noopener noreferrer" className={`${theme.textColor} opacity-80`}>
                YouTube
              </a>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button className={`flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors duration-200 ${theme.primaryColor} text-white`}>
            <Heart className="w-4 h-4" />
            Follow
          </button>
          <button className={`flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors duration-200 ${theme.primaryColor} text-white`}>
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Products Preview */}
      {storefront.products && storefront.products.length > 0 && (
        <div className={`p-6 border-t ${theme.accentColor}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.textColor} ${theme.fontFamily?.heading}`}>Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {storefront.products.slice(0, 6).map((product: any) => (
              <div key={product.id} className={`overflow-hidden rounded-xl shadow ${theme.accentColor}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className={`font-medium ${theme.textColor} ${theme.fontFamily?.heading}`}>{product.title}</h3>
                  <p className={`${theme.textColor} opacity-70 text-sm mt-1`}>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 