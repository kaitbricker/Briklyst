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
    primaryColor: '#FF2D7A',
    backgroundColor: 'bg-gradient-to-br from-[#FFD1E3] to-[#FFF0F6]',
    textColor: 'text-white',
    accentColor: '#FFD600',
    fontFamily: {
      heading: 'font-playfair-display',
      body: 'font-nunito',
    },
    buttonStyle: 'bg-[#FF2D7A] text-white rounded-full px-6 py-2 font-bold shadow-lg hover:scale-105 transition-transform hover:bg-[#E6005C]',
    imageStyle: {
      border: 'border-4 border-[#FFD1E3]',
      shadow: 'shadow-lg shadow-[#FFD1E3]/50',
    },
    accentElements: {
      dividers: 'border-[#FFD1E3] border-2',
      icons: 'text-[#FF2D7A] transform hover:scale-110 transition-transform',
      productCards: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-[#FF2D7A]/20 to-transparent',
      gradient: 'bg-gradient-to-r from-[#FF2D7A]/30 via-[#FFD1E3]/30 to-[#FFD600]/30',
    },
  },
  {
    id: 'sleek-chic',
    name: 'Sleek & Chic',
    description: 'Minimalist beauty/lifestyle influencers',
    vibe: '',
    primaryColor: '#222',
    backgroundColor: 'bg-neutral-50',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-pink-100',
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
    primaryColor: '#FF6D00',
    backgroundColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
    textColor: 'text-gray-800',
    accentColor: '#FFB74D',
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
      icons: 'text-orange-500 hover:text-amber-600 transition-colors',
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
    primaryColor: '#B388EB',
    backgroundColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    textColor: 'text-gray-700',
    accentColor: '#E1BEE7',
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
      icons: 'text-purple-400 hover:text-purple-500 transition-colors',
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
    primaryColor: '#1D1E33',
    backgroundColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
    textColor: 'text-gray-100',
    accentColor: '#4A90E2',
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
      icons: 'text-gray-400 hover:text-white transition-colors',
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
    primaryColor: '#2EC4B6',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    textColor: 'text-gray-800',
    accentColor: '#FFBF69',
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
      icons: 'text-teal-500 hover:text-teal-600 transition-colors',
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
    backgroundColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
    textColor: 'text-gray-100',
    accentColor: '#00FF00',
    fontFamily: {
      heading: 'font-space-grotesk',
      body: 'font-inter',
    },
    buttonStyle: 'bg-purple-700 text-white rounded-none px-6 py-2 font-medium border border-purple-500 hover:bg-purple-600 transition-colors',
    imageStyle: {
      border: 'border border-purple-500',
      shadow: 'shadow-lg shadow-purple-500/20',
    },
    accentElements: {
      dividers: 'border-purple-500 border',
      icons: 'text-purple-500 hover:text-green-400 transition-colors',
      productCards: 'bg-gray-800 rounded-none shadow-lg hover:shadow-purple-500/20 transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-purple-500/20 to-transparent',
      gradient: 'bg-gradient-to-r from-purple-500/30 via-green-500/30 to-purple-500/30',
    },
  },
  {
    id: 'classic-editorial',
    name: '📰 Classic Editorial',
    description: 'Clean, sophisticated, and product-focused. Perfect for polished, high-end brands.',
    vibe: 'Clean, sophisticated, and product-focused',
    primaryColor: '#111111',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: '#666666',
    fontFamily: {
      heading: 'font-baskerville',
      body: 'font-inter',
    },
    buttonStyle: 'bg-black text-white rounded-none px-6 py-2 font-medium hover:bg-gray-800 transition-colors',
    imageStyle: {
      border: 'border border-gray-200',
      shadow: 'shadow-md shadow-gray-200/50',
    },
    accentElements: {
      dividers: 'border-gray-200 border',
      icons: 'text-gray-600 hover:text-gray-900 transition-colors',
      productCards: 'bg-white rounded-none shadow-md hover:shadow-lg transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-black/20 to-transparent',
      gradient: 'bg-gradient-to-r from-gray-900/20 via-gray-800/20 to-gray-900/20',
    },
  },
  {
    id: 'elevate',
    name: '🌟 Elevate',
    description: 'The signature theme for Briklyst, designed to capture the entrepreneurial spirit and ambition of creators building their digital empires.',
    vibe: 'Sleek, professional, and impactful',
    primaryColor: '#1A1A1A',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: '#F5A623',
    fontFamily: {
      heading: 'font-montserrat',
      body: 'font-inter',
    },
    buttonStyle: 'bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
    imageStyle: {
      border: 'border border-gray-100',
      shadow: 'shadow-lg shadow-gray-200/50',
    },
    accentElements: {
      dividers: 'border-gray-100 border',
      icons: 'text-gray-600 hover:text-gray-900 transition-colors',
      productCards: 'bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-gray-900/30 to-transparent',
      gradient: 'bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40',
    },
  },
];

export const defaultTheme = themes[7]; 