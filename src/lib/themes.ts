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
    primaryColor: '#FF5DA2',
    backgroundColor: '#FFF0F6',
    textColor: '#111827',
    accentColor: '#FFD700',
    fontFamily: {
      heading: 'font-poppins',
      body: 'font-nunito',
    },
    buttonStyle: 'bg-pink-500 text-white rounded-full px-6 py-2 font-bold shadow-lg hover:scale-105 transition-transform hover:bg-pink-600',
    imageStyle: {
      border: '2px solid #FFD6E7',
      shadow: '0 4px 24px 0 #FFD6E7',
    },
    accentElements: {
      dividers: '2px solid #FFD6E7',
      icons: 'color: #FF5DA2',
      productCards: 'background: #fff; border-radius: 1rem; box-shadow: 0 2px 8px 0 #FFD6E7;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #FF5DA2 20%, transparent)',
      gradient: 'linear-gradient(to right, #FF5DA2 30%, #B388EB 30%, #00BFFF 30%)',
    },
  },
  {
    id: 'sleek-chic',
    name: 'Sleek & Chic',
    description: 'Minimalist beauty/lifestyle influencers',
    vibe: '',
    primaryColor: '#222',
    backgroundColor: '#FAFAFA',
    textColor: '#1A202C',
    accentColor: '#FFE4EC',
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
    backgroundColor: '#FFF8E1',
    textColor: '#3D2C00',
    accentColor: '#FFB74D',
    fontFamily: {
      heading: 'font-cormorant',
      body: 'font-alegreya',
    },
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
    imageStyle: {
      border: '0',
      shadow: '0 4px 24px 0 #FFE0B2',
    },
    accentElements: {
      dividers: '1px solid #FFE0B2',
      icons: 'color: #FF6D00',
      productCards: 'background: #fff; border-radius: 0.75rem; box-shadow: 0 2px 8px 0 #FFE0B2;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #FF6D00 20%, transparent)',
      gradient: 'linear-gradient(to right, #FF6D00 30%, #FFB74D 30%, #FFD700 30%)',
    },
  },
  {
    id: 'dreamy-lilac',
    name: '🕊️ Dreamy Lilac',
    description: 'Soft, pastel, and whimsical. Ideal for creators with a gentle, artistic aesthetic.',
    vibe: 'Soft, pastel, and whimsical',
    primaryColor: '#B388EB',
    backgroundColor: '#F3E8FF',
    textColor: '#4B3869',
    accentColor: '#E1BEE7',
    fontFamily: {
      heading: 'font-abril-fatface',
      body: 'font-quicksand',
    },
    buttonStyle: 'bg-purple-400 text-white rounded-full px-6 py-2 font-medium shadow-sm hover:shadow-md transition-shadow hover:bg-purple-500',
    imageStyle: {
      border: '1px solid #E1BEE7',
      shadow: '0 2px 12px 0 #E1BEE7',
    },
    accentElements: {
      dividers: '1px solid #E1BEE7',
      icons: 'color: #B388EB',
      productCards: 'background: #fff; border-radius: 1rem; box-shadow: 0 2px 8px 0 #E1BEE7;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #B388EB 10%, transparent)',
      gradient: 'linear-gradient(to right, #B388EB 20%, #F3E8FF 20%, #B388EB 20%)',
    },
  },
  {
    id: 'midnight-mode',
    name: '🖤 Midnight Mode',
    description: 'Edgy, bold, and fashion-forward. Great for high-contrast photography and bold brands.',
    vibe: 'Edgy, bold, and fashion-forward',
    primaryColor: '#1D1E33',
    backgroundColor: '#18181B',
    textColor: '#F3F4F6',
    accentColor: '#4A90E2',
    fontFamily: {
      heading: 'font-playfair-display uppercase',
      body: 'font-inter',
    },
    buttonStyle: 'bg-gray-800 text-white rounded-none px-6 py-2 font-medium border border-gray-700 hover:bg-gray-700 transition-colors',
    imageStyle: {
      border: '0',
      shadow: '0 8px 32px 0 #000',
    },
    accentElements: {
      dividers: '1px solid #27272A',
      icons: 'color: #F3F4F6',
      productCards: 'background: #18181B; border-radius: 0; box-shadow: 0 8px 32px 0 #000;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #000 60%, transparent)',
      gradient: 'linear-gradient(to right, #18181B 80%, #27272A 80%, #18181B 80%)',
    },
  },
  {
    id: 'coastal-cool',
    name: '🌊 Coastal Cool',
    description: 'Clean, beachy, and laid-back. Ideal for surf, outdoor, and lifestyle creators.',
    vibe: 'Clean, beachy, and laid-back',
    primaryColor: '#2EC4B6',
    backgroundColor: '#E0FCFF',
    textColor: '#17494D',
    accentColor: '#FFBF69',
    fontFamily: {
      heading: 'font-montserrat',
      body: 'font-work-sans',
    },
    buttonStyle: 'bg-teal-400 text-white rounded-lg px-6 py-2 font-medium shadow-sm hover:shadow-md transition-shadow hover:bg-teal-500',
    imageStyle: {
      border: '0',
      shadow: '0 4px 24px 0 #E0FCFF',
    },
    accentElements: {
      dividers: '1px solid #E0FCFF',
      icons: 'color: #2EC4B6',
      productCards: 'background: #fff; border-radius: 0.75rem; box-shadow: 0 2px 8px 0 #E0FCFF;',
    },
    bannerStyle: {
      overlay: 'linear-gradient(to bottom, #2EC4B6 10%, transparent)',
      gradient: 'linear-gradient(to right, #2EC4B6 20%, #E0FCFF 20%, #2EC4B6 20%)',
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