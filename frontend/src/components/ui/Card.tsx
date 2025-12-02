import { ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'yellow' | 'green' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

const BASE_CLASSES = 'rounded-[20px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between min-w-0';

const VARIANT_CLASSES = {
  default: 'bg-white text-gray-900',
  yellow: 'bg-accent text-gray-900',
  green: 'bg-primary text-white',
  dark: 'bg-dark text-white',
} as const;

export const Card = ({ children, variant = 'default', className, style }: CardProps) => {
  return (
    <div 
      className={clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className
      )} 
      style={style}
    >
      {children}
    </div>
  );
};

