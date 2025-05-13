export interface StorefrontTemplate {
  id: string
  name: string
  description: string
  previewImage: string
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
    id: 'minimal',
    name: 'Minimal',
    description: 'A clean, minimalist design focused on your products',
    previewImage: '/templates/minimal.jpg',
    defaultColors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#666666',
      background: '#ffffff',
      text: '#000000',
    },
    defaultFonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    defaultLayout: {
      spacing: '1.5rem',
      containerWidth: '1200px',
      borderRadius: '0.5rem',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary design with bold typography and vibrant colors',
    previewImage: '/templates/modern.jpg',
    defaultColors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#f8fafc',
      text: '#1e293b',
    },
    defaultFonts: {
      heading: 'Poppins',
      body: 'Inter',
    },
    defaultLayout: {
      spacing: '2rem',
      containerWidth: '1280px',
      borderRadius: '1rem',
    },
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'A classic design with warm colors and traditional typography',
    previewImage: '/templates/vintage.jpg',
    defaultColors: {
      primary: '#854d0e',
      secondary: '#fef3c7',
      accent: '#d97706',
      background: '#fef3c7',
      text: '#78350f',
    },
    defaultFonts: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
    defaultLayout: {
      spacing: '2rem',
      containerWidth: '1200px',
      borderRadius: '0.25rem',
    },
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'A striking design with high contrast and dramatic elements',
    previewImage: '/templates/bold.jpg',
    defaultColors: {
      primary: '#dc2626',
      secondary: '#1f2937',
      accent: '#f97316',
      background: '#111827',
      text: '#ffffff',
    },
    defaultFonts: {
      heading: 'Montserrat',
      body: 'Open Sans',
    },
    defaultLayout: {
      spacing: '2.5rem',
      containerWidth: '1400px',
      borderRadius: '0.75rem',
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'A sophisticated design with refined typography and subtle colors',
    previewImage: '/templates/elegant.jpg',
    defaultColors: {
      primary: '#4b5563',
      secondary: '#f3f4f6',
      accent: '#9ca3af',
      background: '#ffffff',
      text: '#374151',
    },
    defaultFonts: {
      heading: 'Cormorant Garamond',
      body: 'Cormorant',
    },
    defaultLayout: {
      spacing: '2rem',
      containerWidth: '1200px',
      borderRadius: '0.375rem',
    },
  },
] 