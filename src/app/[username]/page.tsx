import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

interface StorefrontPageProps {
  params: { username: string }
}

interface Product {
  id: string
  title: string
  description?: string | null
  imageUrl?: string | null
  affiliateUrl: string
  price: number
}

interface Storefront {
  id: string
  title: string
  description: string | null
  logoUrl: string | null
  bannerUrl: string | null
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  products: Product[]
  layoutStyle?: string
  fontFamily?: string
}

interface User {
  id: string
  name: string | null
  email: string
  twitter: string | null
  instagram: string | null
  linkedin: string | null
  storefront: Storefront | null
}

interface ProductGridProps {
  products: Product[]
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  layoutStyle: string
}

function ProductGrid({ products, primaryColor, accentColor, backgroundColor, textColor, layoutStyle }: ProductGridProps & { layoutStyle: string }) {
  if (products.length === 0) {
    return <p>This user hasn&apos;t added any products yet.</p>
  }
  if (layoutStyle === 'list') {
    return (
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow flex items-center gap-6"
            style={{
              backgroundColor: accentColor,
              color: textColor,
            }}
          >
            {product.imageUrl && (
              <div className="relative h-32 w-32 flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }
  // Default to grid
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow"
          style={{
            backgroundColor: accentColor,
            color: textColor,
          }}
        >
          {product.imageUrl && (
            <div className="relative h-48 w-full mb-2">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price}</p>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Buy Now
          </a>
        </div>
      ))}
    </div>
  )
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  const { username } = params

  // Find user by name (case-insensitive, no spaces)
  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: username.replace(/\s+/g, '').toLowerCase(),
        mode: 'insensitive',
      },
    },
    include: {
      storefront: {
        include: { products: true },
      },
    },
  }) as User | null

  if (!user || !user.storefront) {
    notFound()
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: user.storefront.backgroundColor,
        color: user.storefront.textColor,
        fontFamily: user.storefront.fontFamily || 'sans-serif',
      }}
    >
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center mb-8">
          {user.storefront.logoUrl && (
            <Image
              src={user.storefront.logoUrl}
              alt={`${user.name}'s logo`}
              width={120}
              height={120}
              className="rounded-full mb-4 object-cover"
            />
          )}
          {user.storefront.bannerUrl && (
            <div className="relative w-full h-48 mb-8">
              <Image
                src={user.storefront.bannerUrl}
                alt={`${user.name}'s banner`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2">{user.storefront.title}</h1>
          {user.storefront.description && (
            <p className="text-center mb-4 max-w-xl">{user.storefront.description}</p>
          )}
          <div className="flex gap-4 mt-2">
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Twitter
              </a>
            )}
            {user.instagram && (
              <a
                href={`https://instagram.com/${user.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 underline"
              >
                Instagram
              </a>
            )}
            {user.linkedin && (
              <a
                href={`https://linkedin.com/in/${user.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <ProductGrid
          products={user.storefront.products}
          primaryColor={user.storefront.primaryColor}
          accentColor={user.storefront.accentColor}
          backgroundColor={user.storefront.backgroundColor}
          textColor={user.storefront.textColor}
          layoutStyle={user.storefront.layoutStyle || 'grid'}
        />
      </div>
    </div>
  )
} 