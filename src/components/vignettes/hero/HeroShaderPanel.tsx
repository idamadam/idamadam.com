'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ColorPanels } from '@paper-design/shaders-react';

// Calm state - monochrome grays with depth
const CALM_COLORS = [
  '#d4d4d4cc', // Light gray
  '#a3a3a3bb', // Mid gray
  '#737373aa', // Dark gray
  '#c0c0c0bb', // Silver
  '#8a8a8acc', // Charcoal tint
];
const CALM_SPEED = 0.3;

// Active state - vivid stained glass
const ACTIVE_COLORS = [
  '#e63946dd', // Rich red
  '#457b9ddd', // Steel blue
  '#2a9d8fdd', // Teal
  '#f4a261dd', // Sandy orange
  '#9b5de5dd', // Purple
];
const ACTIVE_SPEED = 1.5;

const TRANSITION_DURATION = 600; // ms

function parseColor(hex: string): [number, number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
    h.length >= 8 ? parseInt(h.substring(6, 8), 16) : 255,
  ];
}

function toHex(r: number, g: number, b: number, a: number): string {
  return `#${[r, g, b, a].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

function lerpColor(from: string, to: string, t: number): string {
  const [r1, g1, b1, a1] = parseColor(from);
  const [r2, g2, b2, a2] = parseColor(to);
  return toHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
    a1 + (a2 - a1) * t
  );
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Easing function for smooth animation
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroShaderPanel() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [currentColors, setCurrentColors] = useState(CALM_COLORS);
  const [currentSpeed, setCurrentSpeed] = useState(CALM_SPEED);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

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

  // Animate transition between states
  useEffect(() => {
    const targetColors = isActive ? ACTIVE_COLORS : CALM_COLORS;
    const targetSpeed = isActive ? ACTIVE_SPEED : CALM_SPEED;
    const startColors = [...currentColors];
    const startSpeed = currentSpeed;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / TRANSITION_DURATION, 1);
      const t = easeInOutCubic(rawT);

      const newColors = targetColors.map((target, i) =>
        lerpColor(startColors[i] || startColors[0], target, t)
      );
      const newSpeed = lerp(startSpeed, targetSpeed, t);

      setCurrentColors(newColors);
      setCurrentSpeed(newSpeed);

      if (rawT < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

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
            colors={currentColors}
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
            speed={currentSpeed}
            scale={1.0}
            rotation={90}
          />
        )}
      </div>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        className="btn-interactive btn-primary mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="material-icons-outlined">
          {isActive ? 'motion_photos_pause' : 'palette'}
        </span>
        {isActive ? 'Remove color' : 'Add color'}
      </motion.button>
    </div>
  );
}
