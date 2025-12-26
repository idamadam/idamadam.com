'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Dithering } from '@paper-design/shaders-react';
import { useShaderColors } from '@/lib/shader-color-context';

// Color palette for interactive mode - vibrant colors that blend well
const colorPalette = [
  { back: '#fce7f3', front: '#ec4899' }, // Pink
  { back: '#dbeafe', front: '#3b82f6' }, // Blue
  { back: '#dcfce7', front: '#22c55e' }, // Green
  { back: '#fef3c7', front: '#f59e0b' }, // Amber
  { back: '#ede9fe', front: '#8b5cf6' }, // Purple
  { back: '#ccfbf1', front: '#14b8a6' }, // Teal
];

function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function HeroShaderPanel() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Use shared context for colors - syncs with page background
  const { colors, setColors, isInteractive, setIsInteractive, resetColors } = useShaderColors();

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

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !isInteractive) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    // Use position to pick and blend colors from palette
    const paletteIndex = Math.floor(x * colorPalette.length);
    const nextIndex = (paletteIndex + 1) % colorPalette.length;
    const blendFactor = (x * colorPalette.length) % 1;

    const currentPalette = colorPalette[Math.min(paletteIndex, colorPalette.length - 1)];
    const nextPalette = colorPalette[nextIndex];

    // Blend between adjacent palette colors based on x position
    const backColor = interpolateColor(currentPalette.back, nextPalette.back, blendFactor);

    // Use y position to influence front color intensity
    const frontIntensity = 0.3 + y * 0.7;
    const frontColor = interpolateColor(currentPalette.front, nextPalette.front, blendFactor);
    const finalFront = interpolateColor('#e8e8e8', frontColor, frontIntensity);

    setColors({ back: backColor, front: finalFront });
  }, [isInteractive]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleInteraction]);

  const handleToggleInteractive = () => {
    if (isInteractive) {
      resetColors();
    } else {
      setIsInteractive(true);
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full aspect-[4/3] rounded-xl overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {mounted && (
          <Dithering
            width={dimensions.width || 400}
            height={dimensions.height || 300}
            colorBack={colors.back}
            colorFront={colors.front}
            shape="dots"
            type="2x2"
            size={2}
            speed={0.25}
          />
        )}
      </div>

      {/* Interactive mode toggle button */}
      <div className="absolute bottom-4 right-4">
        <motion.button
          onClick={handleToggleInteractive}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-body-sm font-semibold transition-colors"
          style={{ backgroundColor: 'var(--accent-interactive-bg)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-interactive-bg-hover)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="material-icons-outlined text-h3"
            style={{ color: 'var(--accent-interactive)' }}
          >
            {isInteractive ? 'gesture' : 'palette'}
          </span>
          <span style={{ color: 'var(--accent-interactive)' }}>
            {isInteractive ? 'Move around...' : 'Add color'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
