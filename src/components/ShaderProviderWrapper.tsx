'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ShaderProviderWrapper({ children }: Props) {
  return <>{children}</>;
}
