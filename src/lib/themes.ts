export interface Theme {
  id: string;
  name: string;
  description: string;
  vibe: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: {
    heading: string;
    body: string;
  };
  buttonStyle: string;
  imageStyle: {
    border: string;
    shadow: string;
  };
  accentElements: {
    dividers: string;
    icons: string;
    productCards: string;
  };
  bannerStyle: {
    overlay: string;
    gradient: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'bubblegum-pop',
    name: '🎨 Bubblegum Pop',
    description: 'Fun, bold, and energetic. Perfect for Gen Z creators who love bright, poppy colors.',
    vibe: 'Fun, bold, and energetic',
    primaryColor: 'bg-pink-500',
    backgroundColor: 'bg-pink-100',
    textColor: 'text-gray-900',
    accentColor: 'bg-yellow-300',
    fontFamily: {
      heading: 'font-poppins',
      body: 'font-nunito',
    },
    buttonStyle: 'bg-pink-500 text-white rounded-full px-6 py-2 font-bold shadow-lg hover:scale-105 transition-transform hover:bg-pink-600',
    imageStyle: {
      border: 'border-2 border-pink-200',
      shadow: 'shadow-lg shadow-pink-100/50',
    },
    accentElements: {
      dividers: 'border-pink-200 border-2',
      icons: 'text-pink-500',
      productCards: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-pink-500/20 to-transparent',
      gradient: 'bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30',
    },
  },
  {
    id: 'sleek-chic',
    name: 'Sleek & Chic',
    description: 'Minimalist beauty/lifestyle influencers',
    vibe: '',
    primaryColor: 'bg-neutral-900',
    backgroundColor: 'bg-neutral-50',
    textColor: 'text-gray-800',
    accentColor: 'bg-pink-100',
    fontFamily: {
      heading: 'font-serif',
      body: 'font-inter',
    },
    buttonStyle: 'bg-black text-white rounded px-4 py-2 font-medium hover:bg-opacity-90 transition-colors',
    imageStyle: {
      border: '',
      shadow: '',
    },
    accentElements: {
      dividers: '',
      icons: '',
      productCards: '',
    },
    bannerStyle: {
      overlay: '',
      gradient: '',
    },
  },
  {
    id: 'sunset-luxe',
    name: '🌅 Sunset Luxe',
    description: 'Warm, luxurious tones inspired by sunsets and wanderlust. Ideal for travel influencers.',
    vibe: 'Warm, luxurious, and immersive',
    primaryColor: 'bg-orange-500',
    backgroundColor: 'bg-orange-50',
    textColor: 'text-gray-800',
    accentColor: 'bg-amber-300',
    fontFamily: {
      heading: 'font-cormorant',
      body: 'font-alegreya',
    },
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
    imageStyle: {
      border: 'border-0',
      shadow: 'shadow-xl shadow-orange-200/50',
    },
    accentElements: {
      dividers: 'border-orange-200 border',
      icons: 'text-orange-500',
      productCards: 'bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-orange-500/20 to-transparent backdrop-blur-sm',
      gradient: 'bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30',
    },
  },
  {
    id: 'dreamy-lilac',
    name: '🕊️ Dreamy Lilac',
    description: 'Soft, pastel, and whimsical. Ideal for creators with a gentle, artistic aesthetic.',
    vibe: 'Soft, pastel, and whimsical',
    primaryColor: 'bg-purple-400',
    backgroundColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    accentColor: 'bg-purple-200',
    fontFamily: {
      heading: 'font-abril-fatface',
      body: 'font-quicksand',
    },
    buttonStyle: 'bg-purple-400 text-white rounded-full px-6 py-2 font-medium shadow-sm hover:shadow-md transition-shadow hover:bg-purple-500',
    imageStyle: {
      border: 'border border-purple-100',
      shadow: 'shadow-md shadow-purple-100/50',
    },
    accentElements: {
      dividers: 'border-purple-100 border',
      icons: 'text-purple-400',
      productCards: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-sm',
      gradient: 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20',
    },
  },
  {
    id: 'midnight-mode',
    name: '🖤 Midnight Mode',
    description: 'Edgy, bold, and fashion-forward. Great for high-contrast photography and bold brands.',
    vibe: 'Edgy, bold, and fashion-forward',
    primaryColor: 'bg-gray-900',
    backgroundColor: 'bg-gray-900',
    textColor: 'text-gray-100',
    accentColor: 'bg-blue-400',
    fontFamily: {
      heading: 'font-playfair-display uppercase',
      body: 'font-inter',
    },
    buttonStyle: 'bg-gray-800 text-white rounded-none px-6 py-2 font-medium border border-gray-700 hover:bg-gray-700 transition-colors',
    imageStyle: {
      border: 'border-0',
      shadow: 'shadow-2xl shadow-black/50',
    },
    accentElements: {
      dividers: 'border-gray-800 border',
      icons: 'text-gray-400',
      productCards: 'bg-gray-800 rounded-none shadow-2xl hover:shadow-gray-900/50 transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-black/60 to-transparent',
      gradient: 'bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80',
    },
  },
  {
    id: 'coastal-cool',
    name: '🌊 Coastal Cool',
    description: 'Clean, beachy, and laid-back. Ideal for surf, outdoor, and lifestyle creators.',
    vibe: 'Clean, beachy, and laid-back',
    primaryColor: 'bg-teal-400',
    backgroundColor: 'bg-cyan-50',
    textColor: 'text-cyan-900',
    accentColor: 'bg-orange-200',
    fontFamily: {
      heading: 'font-montserrat',
      body: 'font-work-sans',
    },
    buttonStyle: 'bg-teal-400 text-white rounded-lg px-6 py-2 font-medium shadow-sm hover:shadow-md transition-shadow hover:bg-teal-500',
    imageStyle: {
      border: 'border-0',
      shadow: 'shadow-lg shadow-blue-100/50',
    },
    accentElements: {
      dividers: 'border-blue-100 border',
      icons: 'text-teal-500',
      productCards: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-blue-500/10 to-transparent backdrop-blur-sm',
      gradient: 'bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20',
    },
  },
  {
    id: 'digital-bold',
    name: '🪄 Digital Bold',
    description: 'Tech-savvy, bold, and futuristic. Ideal for gadget, gaming, and digital creators.',
    vibe: 'Tech-savvy, bold, and futuristic',
    primaryColor: '#8F00FF',
    backgroundColor: '#18181B',
    textColor: '#F3F4F6',
    accentColor: '#00FF00',
    fontFamily: {
      heading: 'font-space-grotesk',
      body: 'font-inter',
    },
    buttonStyle: 'bg-purple-700 text-white rounded-none px-6 py-2 font-medium border border-purple-500 hover:bg-purple-600 transition-colors',
    imageStyle: {
      border: '1px solid #8F00FF',
      shadow: '0 4px 24px 0 #8F00FF',
    },
    accentElements: {
      dividers: '1px solid #8F00FF',
      icons: 'color: #8F00FF',
      productCards: 'background: #18181B; border-radius: 0; box-shadow: 0 2px 8px 0 #8F00FF;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #8F00FF 20%, transparent)',
      gradient: 'linear-gradient(to right, #8F00FF 30%, #00FF00 30%, #8F00FF 30%)',
    },
  },
  {
    id: 'classic-editorial',
    name: '📰 Classic Editorial',
    description: 'Clean, sophisticated, and product-focused. Perfect for polished, high-end brands.',
    vibe: 'Clean, sophisticated, and product-focused',
    primaryColor: '#111111',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    accentColor: '#666666',
    fontFamily: {
      heading: 'font-baskerville',
      body: 'font-inter',
    },
    buttonStyle: 'bg-black text-white rounded-none px-6 py-2 font-medium hover:bg-gray-800 transition-colors',
    imageStyle: {
      border: '1px solid #E5E7EB',
      shadow: '0 2px 12px 0 #E5E7EB',
    },
    accentElements: {
      dividers: '1px solid #E5E7EB',
      icons: 'color: #6B7280',
      productCards: 'background: #fff; border-radius: 0; box-shadow: 0 2px 8px 0 #E5E7EB;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #000 20%, transparent)',
      gradient: 'linear-gradient(to right, #111111 20%, #666666 20%, #111111 20%)',
    },
  },
  {
    id: 'elevate',
    name: '🌟 Elevate',
    description: 'The signature theme for Briklyst, designed to capture the entrepreneurial spirit and ambition of creators building their digital empires.',
    vibe: 'Sleek, professional, and impactful',
    primaryColor: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    accentColor: '#F5A623',
    fontFamily: {
      heading: 'font-montserrat',
      body: 'font-inter',
    },
    buttonStyle: 'bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
    imageStyle: {
      border: '1px solid #F3F4F6',
      shadow: '0 4px 24px 0 #F3F4F6',
    },
    accentElements: {
      dividers: '1px solid #F3F4F6',
      icons: 'color: #6B7280',
      productCards: 'background: #fff; border-radius: 0.75rem; box-shadow: 0 2px 8px 0 #F3F4F6;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #1A1A1A 30%, transparent)',
      gradient: 'linear-gradient(to right, #1A1A1A 40%, #F5A623 40%, #1A1A1A 40%)',
    },
  },
];

export const defaultTheme = themes[7]; 