import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

const BASE_CLASSES = 'border-none rounded-lg cursor-pointer font-medium transition-all duration-200 inline-flex items-center justify-center';

const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-[#005a63]',
  secondary: 'bg-secondary text-white hover:bg-[#d63a5a]',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
} as const;

const SIZE_CLASSES = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-5 py-2.5 text-base',
  large: 'px-6 py-3.5 text-lg',
} as const;

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};

