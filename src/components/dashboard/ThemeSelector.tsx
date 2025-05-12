'use client';

import { themes } from '@/lib/themes';

interface ThemeSelectorProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({ currentThemeId, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Choose Your Theme</h2>
      <select
        className="w-full p-3 rounded-lg border border-gray-300 bg-white text-lg"
        value={currentThemeId}
        onChange={e => onThemeChange(e.target.value)}
      >
        {themes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.name} — {theme.description}
          </option>
        ))}
      </select>
    </div>
  );
} 