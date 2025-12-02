import { ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'yellow' | 'pink' | 'green' | 'blue';
  size?: 'small' | 'medium';
  className?: string;
}

export const Badge = ({ children, variant = 'default', size = 'small', className = '' }: BadgeProps) => {
  const combinedClassName = `badge badge-${variant} badge-${size} ${className}`.trim();

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
};

