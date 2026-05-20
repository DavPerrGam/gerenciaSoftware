import type { EventCondition } from '../types/index.js';

import { getStatusColor, getStatusText } from '../utils/statusColors.js';

interface StatusBadgeProps {
  condition: EventCondition;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ condition, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-semibold',
    lg: 'px-4 py-2 text-base font-bold',
  };

  return (
    <span className={`${getStatusColor(condition)} text-white rounded-full inline-block ${sizeClasses[size]}`}>
      {getStatusText(condition)}
    </span>
  );
}