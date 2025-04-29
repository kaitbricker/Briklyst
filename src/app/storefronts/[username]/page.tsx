import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
}

interface Storefront {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  products: Product[];
}

async function getStorefront(username: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/storefronts?username=${username}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch storefront');
  }
  
  return response.json();
}

export default async function Page({
  params,
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let storefront: Storefront;
  try {
    storefront = await getStorefront(params.username);
  } catch (err) {
    console.error('Error fetching storefront:', err);
    return (
      <div className="p-8 text-center text-red-600">
        Storefront not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: storefront.primaryColor,
        color: storefront.accentColor,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          {storefront.logoUrl && (
            <div className="relative mx-auto mb-4 h-32 w-32">
              <Image
                src={storefront.logoUrl}
                alt={storefront.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold">{storefront.title}</h1>
          {storefront.description && (
            <p className="mt-2 text-gray-600">{storefront.description}</p>
          )}
        </div>

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
            style={{ color: storefront.accentColor }}
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storefront.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              primaryColor={storefront.primaryColor}
              accentColor={storefront.accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
