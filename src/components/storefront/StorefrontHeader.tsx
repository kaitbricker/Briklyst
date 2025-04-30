import Image from 'next/image';
import Link from 'next/link';

interface StorefrontHeaderProps {
  storefront: {
    title: string;
    description?: string | null;
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
}

export default function StorefrontHeader({ storefront, user }: StorefrontHeaderProps) {
  return (
    <header 
      className="w-full"
      style={{
        backgroundColor: storefront.backgroundColor,
        color: storefront.textColor,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {storefront.logoUrl && (
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={storefront.logoUrl}
                alt={`${user.name}'s logo`}
                fill
                className="rounded-full object-cover"
              />
            </div>
          )}
          
          {storefront.bannerUrl && (
            <div className="relative w-full h-48 mb-8">
              <Image
                src={storefront.bannerUrl}
                alt={`${user.name}'s banner`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{storefront.title}</h1>
          
          {storefront.description && (
            <p className="text-center mb-4 max-w-xl">{storefront.description}</p>
          )}

          <div className="flex gap-4 mt-2">
            {user.twitter && (
              <Link
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                Twitter
              </Link>
            )}
            {user.instagram && (
              <Link
                href={`https://instagram.com/${user.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors"
              >
                Instagram
              </Link>
            )}
            {user.linkedin && (
              <Link
                href={`https://linkedin.com/in/${user.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 