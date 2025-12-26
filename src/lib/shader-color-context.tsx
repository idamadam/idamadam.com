'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ShaderColors {
  back: string;
  front: string;
}

interface ShaderColorContextValue {
  colors: ShaderColors;
  setColors: (colors: ShaderColors) => void;
  isInteractive: boolean;
  setIsInteractive: (interactive: boolean) => void;
  resetColors: () => void;
}

const DEFAULT_COLORS: ShaderColors = { back: '#f5f5f5', front: '#e8e8e8' };

const ShaderColorContext = createContext<ShaderColorContextValue | null>(null);

interface ShaderColorProviderProps {
  children: ReactNode;
}

export function ShaderColorProvider({ children }: ShaderColorProviderProps) {
  const [colors, setColorsInternal] = useState<ShaderColors>(DEFAULT_COLORS);
  const [isInteractive, setIsInteractive] = useState(false);

  const setColors = useCallback((newColors: ShaderColors) => {
    setColorsInternal(newColors);
  }, []);

  const resetColors = useCallback(() => {
    setColorsInternal(DEFAULT_COLORS);
    setIsInteractive(false);
  }, []);

  return (
    <ShaderColorContext.Provider
      value={{
        colors,
        setColors,
        isInteractive,
        setIsInteractive,
        resetColors,
      }}
    >
      {children}
    </ShaderColorContext.Provider>
  );
}

export function useShaderColors() {
  const context = useContext(ShaderColorContext);
  if (!context) {
    throw new Error('useShaderColors must be used within a ShaderColorProvider');
  }
  return context;
}
