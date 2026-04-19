'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    gold: 'btn-gold',
    ghost: 'btn-ghost',
  }[variant];

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
