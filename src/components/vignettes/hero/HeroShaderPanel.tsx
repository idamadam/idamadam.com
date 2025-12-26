'use client';

import { useState, useEffect, useRef } from 'react';
import { Dithering } from '@paper-design/shaders-react';

export default function HeroShaderPanel() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[4/3] rounded-xl overflow-hidden"
    >
      {mounted && (
        <Dithering
          width={dimensions.width || 400}
          height={dimensions.height || 300}
          colorBack="#f5f5f5"
          colorFront="#e8e8e8"
          shape="diamond"
          type="2x2"
          size={2}
          speed={0.25}
        />
      )}
    </div>
  );
}
