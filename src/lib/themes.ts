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
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-pink-50',
    textColor: 'text-gray-900',
    accentColor: 'hover:bg-yellow-300',
    fontFamily: {
      heading: 'font-poppins',
      body: 'font-quicksand',
    },
    buttonStyle: 'bg-pink-500 text-white rounded-full px-6 py-2 font-bold shadow-lg hover:scale-105 transition-transform',
  },
  {
    id: 'sleek-chic',
    name: 'Sleek & Chic',
    description: 'Minimalist beauty/lifestyle influencers',
    primaryColor: '#222',
    backgroundColor: 'bg-neutral-50',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-pink-100',
    fontFamily: {
      heading: 'font-serif',
      body: 'font-inter',
    },
    buttonStyle: 'bg-black text-white rounded px-4 py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'sunset-luxe',
    name: 'Sunset Luxe',
    description: 'Travel, sunset tones, warm & luxurious',
    primaryColor: '#FF6D00',
    backgroundColor: 'bg-gradient-to-br from-orange-100 to-yellow-50',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-yellow-200',
    fontFamily: {
      heading: 'font-serif italic',
      body: 'font-lora',
    },
    buttonStyle: 'bg-orange-500 text-white rounded px-5 py-2 font-medium shadow-md hover:shadow-lg transition-shadow',
  },
  {
    id: 'dreamy-lilac',
    name: 'Dreamy Lilac',
    description: 'Pastel and soft, dreamy creators',
    primaryColor: '#B388EB',
    backgroundColor: 'bg-white shadow-violet-100',
    textColor: 'text-gray-700',
    accentColor: 'hover:bg-blue-200',
    fontFamily: {
      heading: 'font-light italic',
      body: 'font-quicksand',
    },
    buttonStyle: 'bg-purple-400 text-white rounded px-5 py-2 font-medium hover:bg-opacity-80 transition-colors',
  },
  {
    id: 'midnight-mode',
    name: 'Midnight Mode',
    description: 'Edgy, fashion-forward, bold aesthetics',
    primaryColor: '#1D1E33',
    backgroundColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
    textColor: 'text-gray-100',
    accentColor: 'hover:bg-blue-700',
    fontFamily: {
      heading: 'font-sans',
      body: 'font-roboto',
    },
    buttonStyle: 'bg-blue-900 text-white rounded md:px-4 md:py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'coastal-cool',
    name: 'Coastal Cool',
    description: 'Beachy, clean, lifestyle and surf creators',
    primaryColor: '#2EC4B6',
    backgroundColor: 'bg-gradient-to-br from-yellow-50 to-blue-50',
    textColor: 'text-gray-800',
    accentColor: 'hover:bg-blue-200',
    fontFamily: {
      heading: 'font-nunito',
      body: 'font-nunito',
    },
    buttonStyle: 'bg-teal-400 text-white rounded lg:px-5 lg:py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'digital-bold',
    name: 'Digital Bold',
    description: 'Tech-savvy, Gen Alpha, gadget and gear creators',
    primaryColor: '#8F00FF',
    backgroundColor: 'bg-gradient-to-br from-gray-100 to-gray-300',
    textColor: 'text-gray-900',
    accentColor: 'hover:bg-green-400',
    fontFamily: {
      heading: 'font-mono',
      body: 'font-jetbrains-mono',
    },
    buttonStyle: 'bg-purple-700 text-white rounded md:px-4 md:py-2 font-medium hover:bg-opacity-90 transition-colors',
  },
  {
    id: 'classic-editorial',
    name: 'Classic Editorial',
    description: 'Clean, magazine-style, product-heavy creators',
    primaryColor: '#111',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: 'hover:underline',
    fontFamily: {
      heading: 'font-serif',
      body: 'font-inter',
    },
    buttonStyle: 'bg-black text-white rounded none px-4 py-2 font-medium hover:bg-gray-100 transition-colors',
  },
];

export const defaultTheme = themes[0]; 