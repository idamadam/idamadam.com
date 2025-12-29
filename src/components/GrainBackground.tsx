'use client';

import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';

const preset = grainGradientPresets[0];

export function GrainBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(-1 * env(safe-area-inset-top, 0px))',
        right: 'calc(-1 * env(safe-area-inset-right, 0px))',
        bottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
        left: 'calc(-1 * env(safe-area-inset-left, 0px))',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <GrainGradient
        {...preset.params}
        colorBack="#FAFAFA"
        colors={['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD']}
        noise={0.6}
        softness={0.7}
        intensity={0.25}
        shape="ripple"
        speed={0.5}
        width="100%"
        height="100%"
      />
    </div>
  );
}
