import { ReactNode } from 'react';
import clsx from 'clsx';
import { Card } from '../ui/Card';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  variant?: 'default' | 'yellow' | 'green' | 'dark';
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TEXT_COLOR_CLASSES = {
  default: 'text-gray-900',
  yellow: 'text-gray-900',
  green: 'text-white',
  dark: 'text-white',
} as const;

export const StatCard = ({ 
  label, 
  value, 
  icon, 
  trend, 
  variant = 'default',
  children,
  className,
  style
}: StatCardProps) => {
  const textColor = TEXT_COLOR_CLASSES[variant];
  
  return (
    <Card variant={variant} className={clsx('min-h-[190px]', className)} style={style}>
      <div>
        <div className={clsx('text-sm opacity-80', textColor)}>{label}</div>
        <div className={clsx('text-3xl font-bold my-2', textColor)}>{value}</div>
        {trend && (
          <div className="bg-[#E0F2F1] px-2 py-1 rounded-lg text-xs text-primary h-fit inline-block mt-2">
            {trend}
          </div>
        )}
      </div>
      {icon && <div className="absolute bottom-4 right-4 opacity-20">{icon}</div>}
      {children}
    </Card>
  );
};

