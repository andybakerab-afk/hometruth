import React from 'react';
import { Badge } from '../ui/Badge';

interface SignalBadgeProps {
  label: string;
  value: string;
  type: 'good' | 'warn' | 'gold';
}

const icons: Record<'good' | 'warn' | 'gold', string> = {
  good: '✓',
  warn: '⚠',
  gold: '★',
};

export function SignalBadge({ label, value, type }: SignalBadgeProps) {
  return (
    <div className="signal-item">
      <Badge variant={type}>
        {icons[type]}
      </Badge>
      <span className="signal-label">
        <strong>{label}</strong>{value ? ` — ${value}` : ''}
      </span>
    </div>
  );
}
