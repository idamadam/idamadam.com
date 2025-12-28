'use client';

import { useState, useEffect, useRef } from 'react';
import { ColorPanels } from '@paper-design/shaders-react';

// Vivid stained glass colors
const COLORS = [
  '#e63946dd', // Rich red
  '#457b9ddd', // Steel blue
  '#2a9d8fdd', // Teal
  '#f4a261dd', // Sandy orange
  '#9b5de5dd', // Purple
];
const SPEED = 1.5;

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
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-full aspect-[2/1] rounded-xl overflow-hidden"
      >
        {mounted && (
          <ColorPanels
            width={dimensions.width || 400}
            height={dimensions.height || 300}
            colors={COLORS}
            colorBack="#ffffff"
            density={1.39}
            angle1={0.22}
            angle2={0.32}
            length={0.62}
            edges={true}
            blur={0.5}
            fadeIn={0.89}
            fadeOut={0.4}
            gradient={0.53}
            speed={SPEED}
            scale={1.0}
            rotation={90}
          />
        )}
      </div>
    </div>
  );
}
