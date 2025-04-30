export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: {
    heading: string;
    body: string;
  };
  buttonStyle: string;
}

export const themes: Theme[] = [
  {
    id: 'bubblegum-pop',
    name: 'Bubblegum Pop',
    description: 'Fun, bold, Gen Z aesthetic',
    primaryColor: '#FF5DA2',
    backgroundColor: 'bg-gradient-to-b from-pink-50 to-pink-100',
    textColor: 'text-gray-900',
    accentColor: 'hover:bg-yellow-400',
    fontFamily: {
      heading: 'font-poppins',
      body: 'font-quicksand',
    },
    buttonStyle: 'rounded-full px-6 py-2 font-bold shadow-lg hover:scale-105 transition-transform',
  },
  {
    id: 'sleek-chic',
    name: 'Sleek & Chic',
    description: 'Minimalist beauty/lifestyle influencers',
    primaryColor: '#1A1A1A',
    backgroundColor: 'bg-ivory',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-pink-100',
    fontFamily: {
      heading: 'font-playfair',
      body: 'font-inter',
    },
    buttonStyle: 'rounded-md px-4 py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'sunset-luxe',
    name: 'Sunset Luxe',
    description: 'Travel, sunset tones, warm & luxurious',
    primaryColor: '#FF6D00',
    backgroundColor: 'bg-gradient-to-b from-cream to-apricot',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-gold-500',
    fontFamily: {
      heading: 'font-cormorant',
      body: 'font-lora',
    },
    buttonStyle: 'rounded-lg px-5 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
  },
  {
    id: 'dreamy-lilac',
    name: 'Dreamy Lilac',
    description: 'Pastel and soft, dreamy creators',
    primaryColor: '#B388EB',
    backgroundColor: 'bg-white shadow-soft-violet',
    textColor: 'text-gray-700',
    accentColor: 'hover:bg-periwinkle',
    fontFamily: {
      heading: 'font-dancing-script',
      body: 'font-quicksand',
    },
    buttonStyle: 'rounded-full px-5 py-2 font-medium hover:bg-opacity-80 transition-colors',
  },
  {
    id: 'midnight-mode',
    name: 'Midnight Mode',
    description: 'Edgy, fashion-forward, bold aesthetics',
    primaryColor: '#1D1E33',
    backgroundColor: 'bg-gray-900',
    textColor: 'text-gray-100',
    accentColor: 'hover:bg-blue-500',
    fontFamily: {
      heading: 'font-raleway',
      body: 'font-roboto',
    },
    buttonStyle: 'rounded-md px-4 py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'coastal-cool',
    name: 'Coastal Cool',
    description: 'Beachy, clean, lifestyle and surf creators',
    primaryColor: '#7FFFD4',
    backgroundColor: 'bg-sand',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-sky-blue',
    fontFamily: {
      heading: 'font-nunito',
      body: 'font-nunito',
    },
    buttonStyle: 'rounded-lg px-5 py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'digital-bold',
    name: 'Digital Bold',
    description: 'Tech-savvy, Gen Alpha, gadget and gear creators',
    primaryColor: '#8A2BE2',
    backgroundColor: 'bg-gray-100',
    textColor: 'text-gray-900',
    accentColor: 'hover:bg-neon-green',
    fontFamily: {
      heading: 'font-jetbrains-mono',
      body: 'font-jetbrains-mono',
    },
    buttonStyle: 'rounded-md px-4 py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'classic-editorial',
    name: 'Classic Editorial',
    description: 'Clean, magazine-style, product-heavy creators',
    primaryColor: '#000000',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: 'hover:underline',
    fontFamily: {
      heading: 'font-playfair',
      body: 'font-inter',
    },
    buttonStyle: 'rounded-none px-4 py-2 font-medium hover:bg-gray-100 transition-colors',
  },
];

export const defaultTheme = themes[0]; 