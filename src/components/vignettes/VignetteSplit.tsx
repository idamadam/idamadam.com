'use client';

import { ReactNode } from 'react';

interface VignetteSplitProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export default function VignetteSplit({
  title,
  description,
  actions,
  children
}: VignetteSplitProps) {
  const hasTitle = Boolean(title);
  const textStackClass = hasTitle ? 'space-y-4' : 'space-y-3';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 lg:gap-12 items-start">
      <div className={textStackClass}>
        {title && (
          <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
            {description}
          </p>
        )}
        {actions}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
