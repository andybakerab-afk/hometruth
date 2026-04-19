import React from 'react';

interface BadgeProps {
  variant: 'good' | 'warn' | 'gold' | 'soft';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
