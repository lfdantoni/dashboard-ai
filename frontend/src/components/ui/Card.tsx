import { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'yellow' | 'green' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({ children, variant = 'default', className = '', style }: CardProps) => {
  const variantClass = variant !== 'default' ? `card-${variant}` : '';
  const combinedClassName = `card ${variantClass} ${className}`.trim();

  return (
    <div className={combinedClassName} style={style}>
      {children}
    </div>
  );
};

