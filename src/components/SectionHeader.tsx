import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  children: ReactNode;
}

export default function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-10 lg:pt-12 space-y-3">
        <h2 className="type-h2">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
