'use client';

import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';

const preset = grainGradientPresets[0];

export function GrainBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <GrainGradient
        {...preset.params}
        colorBack="#FAFAFA"
        colors={['#E5E5E7', '#F5F5F7', '#DBEAFE', '#EFF6FF']}
        noise={0.08}
        softness={0.7}
        intensity={0.25}
        shape="blob"
        speed={0.3}
        width="100%"
        height="100%"
      />
    </div>
  );
}
