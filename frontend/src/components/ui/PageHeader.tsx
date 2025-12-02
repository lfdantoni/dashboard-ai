import { ReactNode } from 'react';
import './PageHeader.css';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, subtitle, action, className = '' }: PageHeaderProps) => {
  return (
    <div className={`page-header ${className}`.trim()}>
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
};

