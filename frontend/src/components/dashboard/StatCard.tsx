import { ReactNode } from 'react';
import { Card } from '../ui/Card';
import './StatCard.css';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  variant?: 'default' | 'yellow' | 'green' | 'dark';
  children?: ReactNode;
  className?: string;
}

export const StatCard = ({ 
  label, 
  value, 
  icon, 
  trend, 
  variant = 'default',
  children,
  className = '' 
}: StatCardProps) => {
  return (
    <Card variant={variant} className={`stat-card ${className}`.trim()}>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {trend && (
          <div className="stat-trend">
            {trend}
          </div>
        )}
      </div>
      {icon && <div className="stat-icon">{icon}</div>}
      {children}
    </Card>
  );
};

