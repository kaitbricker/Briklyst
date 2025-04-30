import Image from 'next/image';
import Link from 'next/link';

interface StorefrontHeaderProps {
  storefront: {
    title: string;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
  };
  user: {
    name: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
  isOwner: boolean;
}

export default function StorefrontHeader({ storefront, user, isOwner }: StorefrontHeaderProps) {
  return (
    <header className="w-full flex flex-col items-center relative mb-8">
      {/* Banner */}
      {storefront.bannerUrl && (
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden relative">
          <Image
            src={storefront.bannerUrl}
            alt={`${user.name || 'Store'} banner`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {/* Avatar - overlap banner */}
      {storefront.logoUrl && (
        <div className="absolute left-1/2 top-36 md:top-56 -translate-x-1/2 z-10">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <Image
              src={storefront.logoUrl}
              alt={`${user.name || 'Store'} logo`}
              width={112}
              height={112}
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
      {/* Store name, username, subscribe */}
      <div className="mt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-1">{storefront.title}</h1>
        {!isOwner && (
          <>
            <div className="text-gray-500 text-sm mb-2">@{user.name}</div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow transition">Subscribe</button>
          </>
        )}
      </div>
    </header>
  );
} 