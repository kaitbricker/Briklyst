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
    id: 'sleek-noir',
    name: 'Sleek Noir',
    description: 'A modern, editorial storefront with a premium, high-contrast noir aesthetic. Bold typography, seamless product displays, and a cinematic, minimalist layout.',
    vibe: 'Editorial, premium, high-contrast',
    primaryColor: '#18181B',
    backgroundColor: '#fff',
    textColor: '#18181B',
    accentColor: '#E04FD4',
    fontFamily: {
      heading: 'Inter',
      body: 'Inter',
    },
    buttonStyle: 'bg-[#23232A] text-white rounded-full px-6 py-2 font-bold shadow hover:bg-[#2D2D32] transition-all',
    imageStyle: {
      border: 'border-0',
      shadow: 'shadow-xl',
    },
    accentElements: {
      dividers: 'border-gray-200',
      icons: 'text-[#E04FD4]',
      productCards: 'bg-[#FEC8E4] rounded-2xl shadow-xl',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-[#E04FD4]/10 to-transparent',
      gradient: 'bg-gradient-to-r from-[#E04FD4]/10 via-[#FEC8E4]/10 to-[#E04FD4]/10',
    },
  },
];

export const defaultTheme = themes[0]; 