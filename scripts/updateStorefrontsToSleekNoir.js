const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SLEEK_NOIR_OVERRIDES = {
  templateId: 'sleek-noir',
  templateOverrides: {
    primaryColor: '#111112',
    backgroundColor: '#18181B',
    textColor: '#F5F5F7',
    accentColor: '#2D2D32',
    fontFamily: {
      heading: 'Inter',
      body: 'Inter',
    },
    buttonStyle: 'bg-[#111112] text-[#F5F5F7] rounded-full px-6 py-2 font-bold shadow hover:bg-[#2D2D32] transition-all',
    imageStyle: {
      border: '4px solid #fff',
      shadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
    },
    accentElements: {
      dividers: 'border-t border-[#2D2D32]',
      icons: 'text-[#2D2D32]',
      productCards: 'bg-white rounded-2xl shadow-xl',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-[#18181B]/80 to-transparent',
      gradient: 'bg-gradient-to-r from-[#111112] via-[#18181B] to-[#2D2D32]',
    },
    colors: {
      primary: '#111112',
      secondary: '#ffffff',
      accent: '#2D2D32',
      background: '#18181B',
      text: '#F5F5F7',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: {
      spacing: '1.75rem',
      containerWidth: '1200px',
      borderRadius: '1.25rem',
    },
  },
};

async function main() {
  try {
    // Update all storefronts to use Sleek Noir theme with full overrides
    const updatedStorefronts = await prisma.storefront.updateMany({
      data: SLEEK_NOIR_OVERRIDES
    });

    console.log(`Successfully updated ${updatedStorefronts.count} storefronts to Sleek Noir theme with full overrides`);
  } catch (error) {
    console.error('Error updating storefronts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 