"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface StorefrontUpdateContextType {
  lastUpdated: number;
  triggerUpdate: () => void;
  updateField: (field: string, value: any) => void;
  pendingUpdates: { [key: string]: any };
}

const StorefrontUpdateContext = createContext<StorefrontUpdateContextType | undefined>(undefined);

export const StorefrontUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [pendingUpdates, setPendingUpdates] = useState<{ [key: string]: any }>({});

  const triggerUpdate = useCallback(() => {
    setLastUpdated(Date.now());
  }, []);

  const updateField = useCallback((field: string, value: any) => {
    setPendingUpdates(prev => ({
      ...prev,
      [field]: value
    }));
    triggerUpdate();
  }, [triggerUpdate]);

  return (
    <StorefrontUpdateContext.Provider value={{ lastUpdated, triggerUpdate, updateField, pendingUpdates }}>
      {children}
    </StorefrontUpdateContext.Provider>
  );
};

export function useStorefrontUpdate() {
  const ctx = useContext(StorefrontUpdateContext);
  if (!ctx) throw new Error('useStorefrontUpdate must be used within StorefrontUpdateProvider');
  return ctx;
} 