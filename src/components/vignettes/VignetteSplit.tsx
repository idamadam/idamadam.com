'use client';

import { ReactNode } from 'react';

interface VignetteSplitProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'hero';
}

export default function VignetteSplit({
  title,
  description,
  actions,
  children,
  variant = 'default'
}: VignetteSplitProps) {
  const hasTitle = Boolean(title);
  const textStackClass = hasTitle ? 'space-y-4' : 'space-y-3';

  const titleClass = variant === 'hero' ? 'type-h1' : 'type-h2';
  const descriptionClass = variant === 'hero' ? 'type-body-medium' : 'type-body';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 lg:gap-12 lg:items-center">
      <div className={textStackClass}>
        {title && (
          <h3 className={titleClass}>
            {title}
          </h3>
        )}
        {description && (
          <p className={descriptionClass}>
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
