import { ReactNode } from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'yellow' | 'pink' | 'green' | 'blue';
  size?: 'small' | 'medium';
  className?: string;
}

const BASE_CLASSES = 'inline-block rounded font-medium text-center';

const VARIANT_CLASSES = {
  default: 'bg-[#E0F2F1] text-primary',
  yellow: 'bg-[#FFF8E1] text-[#F57F17]',
  pink: 'bg-[#FFEBEE] text-[#C2185B]',
  green: 'bg-[#A7F3D0] text-[#065F46]',
  blue: 'bg-[#E0F2F1] text-primary',
} as const;

const SIZE_CLASSES = {
  small: 'px-2 py-0.5 text-[0.7rem]',
  medium: 'px-3 py-1 text-sm',
} as const;

export const Badge = ({ children, variant = 'default', size = 'small', className }: BadgeProps) => {
  return (
    <span 
      className={clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </span>
  );
};

