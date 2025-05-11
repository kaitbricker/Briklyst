"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface StorefrontUpdateContextType {
  lastUpdated: number;
  triggerUpdate: () => void;
}

const StorefrontUpdateContext = createContext<StorefrontUpdateContextType | undefined>(undefined);

export const StorefrontUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const triggerUpdate = useCallback(() => setLastUpdated(Date.now()), []);

  return (
    <StorefrontUpdateContext.Provider value={{ lastUpdated, triggerUpdate }}>
      {children}
    </StorefrontUpdateContext.Provider>
  );
};

export function useStorefrontUpdate() {
  const ctx = useContext(StorefrontUpdateContext);
  if (!ctx) throw new Error('useStorefrontUpdate must be used within StorefrontUpdateProvider');
  return ctx;
} 