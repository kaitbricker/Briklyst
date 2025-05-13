'use client';

import { themes } from '@/lib/themes';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ThemeSelectorProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({ currentThemeId, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Choose Your Theme</h2>
        <p className="text-sm text-muted-foreground">
          Select a theme to customize your storefront&apos;s look and feel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={cn(
                'p-4 cursor-pointer transition-all duration-200',
                currentThemeId === theme.id && 'ring-2 ring-primary'
              )}
              onClick={() => onThemeChange(theme.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{theme.name}</h3>
                  {currentThemeId === theme.id && (
                    <span className="text-sm text-primary">Selected</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.backgroundColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.textColor }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: theme.primaryColor,
                      color: '#fff',
                    }}
                  >
                    Button
                  </button>
                  <div
                    className="px-4 py-2 rounded text-sm font-medium"
                    style={{
                      backgroundColor: theme.backgroundColor,
                      color: theme.textColor,
                    }}
                  >
                    Text
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 