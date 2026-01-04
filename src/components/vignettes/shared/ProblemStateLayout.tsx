'use client';

import { ReactNode } from 'react';

interface ProblemStateLayoutProps {
  children: ReactNode;  // The ProblemStack content
  button: ReactNode;    // The CTA button
}

export function ProblemStateLayout({ children, button }: ProblemStateLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[280px] lg:min-h-[320px] p-4 lg:p-6">
      {/* Stack container */}
      <div className="w-full mb-12">
        {children}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        {button}
      </div>
    </div>
  );
}
