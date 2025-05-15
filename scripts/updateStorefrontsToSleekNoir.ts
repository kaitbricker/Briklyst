import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLEEK_NOIR_DEFAULTS = {
  templateId: 'sleek-noir',
  templateOverrides: {
    colors: {
      primary: '#111112',
      secondary: '#ffffff',
      accent: '#2D2D32',
      background: '#18181B',
      text: '#F5F5F7'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      spacing: '1.75rem',
      containerWidth: '1200px',
      borderRadius: '1.25rem'
    }
  }
};

async function main() {
  try {
    // Update all storefronts to use Sleek Noir theme
    const updatedStorefronts = await prisma.storefront.updateMany({
      data: SLEEK_NOIR_DEFAULTS
    });

    console.log(`Successfully updated ${updatedStorefronts.count} storefronts to Sleek Noir theme`);
  } catch (error) {
    console.error('Error updating storefronts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 