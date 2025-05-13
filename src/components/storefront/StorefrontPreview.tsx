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
  console.log('StorefrontPreview theme:', storefront.theme);
  // Theme styles
  const theme = storefront.theme || {};
  const containerStyle = {
    background: theme.backgroundColor || '#fff',
    color: theme.textColor || '#111827',
    fontFamily: theme.fontFamily || 'inherit',
  };
  const headingStyle = {
    color: theme.textColor || '#111827',
    fontFamily: theme.fontFamily || 'inherit',
  };
  const cardStyle = {
    background: theme.accentColor || '#f9fafb',
    color: theme.textColor || '#111827',
    fontFamily: theme.fontFamily || 'inherit',
  };
  const buttonStyle = {
    background: theme.primaryColor || '#2563eb',
    color: '#fff',
    border: 'none',
    fontFamily: theme.fontFamily || 'inherit',
  };

  if (!storefront) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={containerStyle}
      className="w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden transition-colors duration-300"
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
            <h1 className="text-2xl font-bold" style={headingStyle}>
              {storefront.name}
            </h1>
            {storefront.tagline && (
              <p style={{ color: theme.textColor, opacity: 0.7 }}>{storefront.tagline}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {storefront.description && (
          <p style={{ color: theme.textColor, opacity: 0.7 }} className="mt-4">{storefront.description}</p>
        )}

        {/* Social Links */}
        {storefront.socials && (
          <div className="flex gap-4 mt-4">
            {storefront.socials.instagram && (
              <a href={storefront.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: theme.textColor, opacity: 0.8 }}>
                Instagram
              </a>
            )}
            {storefront.socials.twitter && (
              <a href={storefront.socials.twitter} target="_blank" rel="noopener noreferrer" style={{ color: theme.textColor, opacity: 0.8 }}>
                Twitter
              </a>
            )}
            {storefront.socials.tiktok && (
              <a href={storefront.socials.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: theme.textColor, opacity: 0.8 }}>
                TikTok
              </a>
            )}
            {storefront.socials.youtube && (
              <a href={storefront.socials.youtube} target="_blank" rel="noopener noreferrer" style={{ color: theme.textColor, opacity: 0.8 }}>
                YouTube
              </a>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button style={buttonStyle} className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors duration-200">
            <Heart className="w-4 h-4" />
            Follow
          </button>
          <button style={buttonStyle} className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors duration-200">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Products Preview */}
      {storefront.products && storefront.products.length > 0 && (
        <div className="p-6 border-t" style={{ borderColor: theme.accentColor || '#f9fafb' }}>
          <h2 className="text-xl font-semibold mb-4" style={headingStyle}>Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {storefront.products.slice(0, 6).map((product: any) => (
              <div key={product.id} className="overflow-hidden rounded-xl shadow" style={cardStyle}>
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium" style={headingStyle}>{product.title}</h3>
                  <p style={{ color: theme.textColor, opacity: 0.7 }} className="text-sm mt-1">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 