'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface Theme {
  id: string
  name: string
  description: string
  vibe: string
  typography: {
    header: string
    body: string
    button: string
  }
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  styles: {
    buttonShape: string
    buttonHover: string
    imageBorder: string
    imageShadow: string
    divider: string
    card: string
  }
}

const themes: Theme[] = [
  {
    id: 'bubblegum-pop',
    name: '🎨 Bubblegum Pop',
    description: 'Fun, bold, and energetic theme perfect for Gen Z creators',
    vibe: 'Fun, bold, and energetic',
    typography: {
      header: 'Poppins',
      body: 'Nunito',
      button: 'Nunito',
    },
    colors: {
      primary: '#FF69B4',
      secondary: '#FF1493',
      background: '#FFFFFF',
      text: '#333333',
      accent: '#FFB6C1',
    },
    styles: {
      buttonShape: 'border-radius: 9999px;',
      buttonHover: 'transform: scale(1.05); background: linear-gradient(45deg, #FF69B4, #FF1493);',
      imageBorder: 'border: 2px solid #FF69B4; border-radius: 16px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(255, 105, 180, 0.3);',
      divider: 'border-bottom: 2px solid #FFB6C1;',
      card: 'border-radius: 16px; box-shadow: 0 8px 16px rgba(255, 105, 180, 0.2); background: linear-gradient(135deg, #FFFFFF, #FFF0F5);',
    },
  },
  {
    id: 'midnight-mode',
    name: '🖤 Midnight Mode',
    description: 'Edgy, bold, and fashion-forward theme for high-contrast photography',
    vibe: 'Edgy, bold, and fashion-forward',
    typography: {
      header: 'Playfair Display',
      body: 'Inter',
      button: 'Inter',
    },
    colors: {
      primary: '#FFFFFF',
      secondary: '#000000',
      background: '#121212',
      text: '#FFFFFF',
      accent: '#333333',
    },
    styles: {
      buttonShape: 'border-radius: 4px; border: 1px solid #FFFFFF;',
      buttonHover: 'transform: translateY(-2px); background: #FFFFFF; color: #000000;',
      imageBorder: 'border: none;',
      imageShadow: 'box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);',
      divider: 'border-bottom: 1px solid #333333;',
      card: 'border-radius: 8px; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); background: #1A1A1A;',
    },
  },
  {
    id: 'sunset-luxe',
    name: '🌅 Sunset Luxe',
    description: 'Warm, luxurious tones inspired by sunsets and wanderlust',
    vibe: 'Warm, luxurious, and inspiring',
    typography: {
      header: 'Cormorant',
      body: 'Alegreya',
      button: 'Alegreya',
    },
    colors: {
      primary: '#FF6B35',
      secondary: '#FF9F1C',
      background: '#FFF5E6',
      text: '#2D3142',
      accent: '#FFB347',
    },
    styles: {
      buttonShape: 'border-radius: 8px; background: linear-gradient(45deg, #FF6B35, #FF9F1C);',
      buttonHover: 'transform: scale(1.02); box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);',
      imageBorder: 'border: 1px solid #FFB347; border-radius: 12px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(255, 107, 53, 0.25);',
      divider: 'border-bottom: 2px solid #FFB347;',
      card: 'border-radius: 12px; box-shadow: 0 8px 16px rgba(255, 107, 53, 0.15); background: linear-gradient(135deg, #FFF5E6, #FFE4CC);',
    },
  },
  {
    id: 'dreamy-lilac',
    name: '🕊️ Dreamy Lilac',
    description: 'Soft, pastel, and whimsical theme for gentle, artistic aesthetics',
    vibe: 'Soft, pastel, and whimsical',
    typography: {
      header: 'Abril Fatface',
      body: 'Gloock',
      button: 'Gloock',
    },
    colors: {
      primary: '#9B6B9E',
      secondary: '#C8A2C8',
      background: '#F8F0FF',
      text: '#4A4A4A',
      accent: '#E6D7FF',
    },
    styles: {
      buttonShape: 'border-radius: 9999px; background: linear-gradient(45deg, #9B6B9E, #C8A2C8);',
      buttonHover: 'transform: scale(1.03); box-shadow: 0 4px 12px rgba(155, 107, 158, 0.2);',
      imageBorder: 'border: 1px solid #C8A2C8; border-radius: 16px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(155, 107, 158, 0.15);',
      divider: 'border-bottom: 1px solid #E6D7FF;',
      card: 'border-radius: 16px; box-shadow: 0 8px 16px rgba(155, 107, 158, 0.1); background: linear-gradient(135deg, #F8F0FF, #F0E6FF);',
    },
  },
  {
    id: 'coastal-cool',
    name: '🌊 Coastal Cool',
    description: 'Clean, beachy, and laid-back theme for surf and outdoor creators',
    vibe: 'Clean, beachy, and laid-back',
    typography: {
      header: 'Montserrat',
      body: 'Work Sans',
      button: 'Work Sans',
    },
    colors: {
      primary: '#2C5282',
      secondary: '#4299E1',
      background: '#F7FAFC',
      text: '#2D3748',
      accent: '#BEE3F8',
    },
    styles: {
      buttonShape: 'border-radius: 6px; background: linear-gradient(45deg, #2C5282, #4299E1);',
      buttonHover: 'transform: translateY(-1px); box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);',
      imageBorder: 'border: none; border-radius: 8px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(66, 153, 225, 0.15);',
      divider: 'border-bottom: 1px solid #BEE3F8;',
      card: 'border-radius: 8px; box-shadow: 0 8px 16px rgba(66, 153, 225, 0.1); background: linear-gradient(135deg, #F7FAFC, #EBF8FF);',
    },
  },
  {
    id: 'digital-bold',
    name: '🪄 Digital Bold',
    description: 'Tech-savvy, bold, and futuristic theme for digital creators',
    vibe: 'Tech-savvy, bold, and futuristic',
    typography: {
      header: 'Space Grotesk',
      body: 'Inter',
      button: 'Inter',
    },
    colors: {
      primary: '#00FF00',
      secondary: '#000000',
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#00FF00',
    },
    styles: {
      buttonShape: 'border-radius: 4px; border: 1px solid #00FF00; background: transparent;',
      buttonHover: 'transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);',
      imageBorder: 'border: 1px solid #00FF00; border-radius: 8px;',
      imageShadow: 'box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);',
      divider: 'border-bottom: 1px solid #00FF00;',
      card: 'border-radius: 8px; box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); background: #1A1A1A;',
    },
  },
  {
    id: 'classic-editorial',
    name: '📰 Classic Editorial',
    description: 'Clean, sophisticated, and product-focused theme for high-end brands',
    vibe: 'Clean, sophisticated, and product-focused',
    typography: {
      header: 'Baskerville',
      body: 'Georgia',
      button: 'Georgia',
    },
    colors: {
      primary: '#000000',
      secondary: '#333333',
      background: '#FFFFFF',
      text: '#000000',
      accent: '#666666',
    },
    styles: {
      buttonShape: 'border-radius: 0; border: 1px solid #000000;',
      buttonHover: 'transform: translateY(-1px); background: #000000; color: #FFFFFF;',
      imageBorder: 'border: 1px solid #000000;',
      imageShadow: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);',
      divider: 'border-bottom: 1px solid #000000;',
      card: 'border-radius: 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background: #FFFFFF;',
    },
  },
  {
    id: 'elevate',
    name: '🌟 Briklyst Default: Elevate',
    description: 'The signature theme for Briklyst, designed for ambitious creators',
    vibe: 'Sleek, professional, and impactful',
    typography: {
      header: 'Poppins',
      body: 'Inter',
      button: 'Inter',
    },
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      background: '#FFFFFF',
      text: '#000000',
      accent: '#FFD700',
    },
    styles: {
      buttonShape: 'border-radius: 8px; background: linear-gradient(45deg, #000000, #333333); color: #FFFFFF;',
      buttonHover: 'transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);',
      imageBorder: 'border: 1px solid #000000; border-radius: 12px;',
      imageShadow: 'box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);',
      divider: 'border-bottom: 1px solid #000000;',
      card: 'border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); background: linear-gradient(135deg, #FFFFFF, #F8F9FA);',
    },
  },
]

interface ThemeSelectorProps {
  selectedTheme: Theme
  onSelectTheme: (theme: Theme) => void
}

export default function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Theme</h2>
        <p className="text-muted-foreground">Select a theme that matches your brand's personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                selectedTheme.id === theme.id
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => onSelectTheme(theme)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{theme.name}</h3>
                  {selectedTheme.id === theme.id && (
                    <Badge variant="secondary">Selected</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{theme.vibe}</Badge>
                </div>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 