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
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 lg:gap-12 lg:items-center">
      <div className={textStackClass}>
        {title && (
          <h3 className="type-h2">
            {title}
          </h3>
        )}
        {description && (
          <p className="type-body">
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
