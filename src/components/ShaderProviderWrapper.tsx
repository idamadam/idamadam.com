'use client';

import { ReactNode } from 'react';
import { ShaderColorProvider } from '@/lib/shader-color-context';
import PageBackgroundShader from '@/components/PageBackgroundShader';

interface Props {
  children: ReactNode;
}

export default function ShaderProviderWrapper({ children }: Props) {
  return (
    <ShaderColorProvider>
      <PageBackgroundShader />
      {children}
    </ShaderColorProvider>
  );
}
