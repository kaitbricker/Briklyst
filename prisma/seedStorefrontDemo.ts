import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'kaitlyn@briklyst.com';

  // 1. Find the user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  // 2. Find or create the storefront
  let storefront = await prisma.storefront.findUnique({ where: { userId: user.id } });
  if (!storefront) {
    storefront = await prisma.storefront.create({
      data: {
        userId: user.id,
        title: 'The Globetrotter',
        description: 'Your Ultimate Travel Guide',
        logoUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/adventure-1868817_1280.jpg',
        bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
        primaryColor: '#fff',
        accentColor: '#e76f51',
        backgroundColor: '#f9fafb',
        textColor: '#222',
        themeId: 'bubblegum-pop',
      },
    });
  } else {
    storefront = await prisma.storefront.update({
      where: { id: storefront.id },
      data: {
        title: 'The Globetrotter',
        description: 'Your Ultimate Travel Guide',
        logoUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/adventure-1868817_1280.jpg',
        bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
        primaryColor: '#fff',
        accentColor: '#e76f51',
        backgroundColor: '#f9fafb',
        textColor: '#222',
        themeId: 'bubblegum-pop',
      },
    });
  }

  // 3. Example products
  const products = [
    {
      title: 'Glow Tech LED Desk Lamp 3ft Rechargeable Battery',
      description: 'A modern, energy-efficient desk lamp with adjustable brightness to suit any workspace.',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      affiliateUrl: 'https://example.com/product/led-lamp',
      featured: true,
      tags: ['Travel Gear', 'Vacation'],
      order: 1,
    },
    {
      title: 'JetSet 20" Rolling Carry-On Multiple Colors Customizable',
      description: 'Compact and durable, designed for seamless travel with easy storage.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      affiliateUrl: 'https://example.com/product/jetset-carryon',
      featured: true,
      tags: ['Travel Gear'],
      order: 2,
    },
    {
      title: 'JBL Bluetooth Speaker Series 9 8 Hours Playtime',
      description: 'Enjoy high-quality sound wherever you go with this portable, waterproof speaker.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      affiliateUrl: 'https://example.com/product/jbl-speaker',
      featured: false,
      tags: ['Vacation'],
      order: 3,
    },
    {
      title: 'Fit Track Pro Smartwatch X9 V2.12 Dual Tone Wireless Charging',
      description: 'Track your fitness goals and monitor your health with this sleek fitness tracker.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      affiliateUrl: 'https://example.com/product/fit-track-pro',
      featured: false,
      tags: ['Travel Gear'],
      order: 4,
    },
    {
      title: 'Travel Sun Hat & Sunglasses Combo',
      description: 'Stay stylish and protected from the sun with this essential travel combo.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      affiliateUrl: 'https://example.com/product/sun-hat-sunglasses',
      featured: false,
      tags: ['Vacation'],
      order: 5,
    },
  ];

  // 4. Delete old products and add new ones
  await prisma.product.deleteMany({ where: { storefrontId: storefront.id } });
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        storefrontId: storefront.id,
      },
    });
  }

  console.log('Demo storefront and products seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 