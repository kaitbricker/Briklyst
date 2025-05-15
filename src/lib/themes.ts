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
    primaryColor: '#111112',
    backgroundColor: '#18181B',
    textColor: '#F5F5F7',
    accentColor: '#2D2D32',
    fontFamily: {
      heading: 'Inter',
      body: 'Inter',
    },
    buttonStyle: 'bg-[#111112] text-[#F5F5F7] rounded-full px-6 py-2 font-bold shadow hover:bg-[#2D2D32] transition-all',
    imageStyle: {
      border: '4px solid #fff',
      shadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
    },
    accentElements: {
      dividers: 'border-t border-[#2D2D32]',
      icons: 'text-[#2D2D32]',
      productCards: 'bg-white rounded-2xl shadow-xl',
    },
    bannerStyle: {
      overlay: 'bg-gradient-to-b from-[#18181B]/80 to-transparent',
      gradient: 'bg-gradient-to-r from-[#111112] via-[#18181B] to-[#2D2D32]',
    },
  },
];

export const defaultTheme = themes[0]; 