export interface StorefrontTemplate {
  id: string
  name: string
  description: string
  previewImage: string
  features: string[]
  defaultColors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  defaultFonts: {
    heading: string
    body: string
  }
  defaultLayout: {
    spacing: string
    containerWidth: string
    borderRadius: string
  }
}

export const templates: StorefrontTemplate[] = [
  {
    id: 'sleek-noir',
    name: 'Sleek Noir',
    description: 'A modern, editorial storefront with a premium, high-contrast noir aesthetic. Bold typography, seamless product displays, and a cinematic, minimalist layout.',
    previewImage: '/templates/sleek-noir.jpg',
    features: [
      'Cinematic, high-contrast black & white design',
      'Bold, wide sans-serif typography',
      'Seamless, layered background with image blending',
      'Sticky, collapsible sidebar navigation',
      'Premium product card displays with micro-interactions',
      'Responsive and touch-friendly for all devices',
    ],
    defaultColors: {
      primary: '#111112', // Deep black
      secondary: '#ffffff', // White
      accent: '#2D2D32', // Cool gray for cards/sidebar
      background: '#18181B', // Slightly lighter black for main bg
      text: '#F5F5F7', // Off-white for text
    },
    defaultFonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    defaultLayout: {
      spacing: '1.75rem',
      containerWidth: '1200px',
      borderRadius: '1.25rem',
    },
  },
] 