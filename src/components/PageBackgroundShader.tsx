'use client';

import { useState, useEffect } from 'react';
import { Dithering } from '@paper-design/shaders-react';
import { useShaderColors } from '@/lib/shader-color-context';

export default function PageBackgroundShader() {
  const { colors } = useShaderColors();
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setMounted(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Dithering
        width={dimensions.width}
        height={dimensions.height}
        colorBack={colors.back}
        colorFront={colors.front}
        shape="dots"
        type="2x2"
        size={2}
        speed={0.25}
      />
    </div>
  );
}
