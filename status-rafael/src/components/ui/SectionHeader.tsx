import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
}

export function SectionHeader({ title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-3xl font-bold text-gradient-brand">{title}</h2>
        {subtitle && <p className="mt-2 text-sm font-medium text-brand/80">{subtitle}</p>}
      </div>
      {badge}
    </div>
  );
}
