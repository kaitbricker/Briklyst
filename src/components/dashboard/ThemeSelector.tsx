'use client';

import { useState } from 'react';
import { themes } from '@/lib/themes';
import { useRouter } from 'next/navigation';

interface ThemeSelectorProps {
  currentThemeId: string;
  storefrontId: string;
}

export default function ThemeSelector({
  currentThemeId,
  storefrontId,
}: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentThemeId);
  const router = useRouter();

  const handleThemeChange = async (themeId: string) => {
    setSelectedTheme(themeId);
    
    try {
      const response = await fetch('/api/storefront/theme', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storefrontId,
          themeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating theme:', error);
      // Revert selection on error
      setSelectedTheme(currentThemeId);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Choose Your Theme</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTheme === theme.id
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div
              className={`h-32 rounded-t-lg ${theme.backgroundColor}`}
              style={{
                backgroundColor: theme.primaryColor,
              }}
            />
            <div className="mt-4">
              <h3 className="font-medium">{theme.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 