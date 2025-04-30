'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Theme, themes, defaultTheme } from '@/lib/themes';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
});

export function ThemeProvider({
  children,
  themeId,
}: {
  children: ReactNode;
  themeId: string;
}) {
  const theme = themes.find((t) => t.id === themeId) || defaultTheme;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div
        className={`min-h-screen ${theme.backgroundColor} ${theme.textColor}`}
        style={{
          '--primary-color': theme.primaryColor,
          '--accent-color': theme.accentColor,
        } as React.CSSProperties}
      >
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${theme.fontFamily.heading};
          }
          body {
            font-family: ${theme.fontFamily.body};
          }
          .theme-button {
            ${theme.buttonStyle}
            background-color: ${theme.primaryColor};
          }
          .theme-button:hover {
            ${theme.accentColor}
          }
        `}</style>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 