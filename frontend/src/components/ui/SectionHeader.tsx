import { ReactNode } from 'react';
import './SectionHeader.css';

export interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, action, className = '' }: SectionHeaderProps) => {
  return (
    <div className={`section-header ${className}`.trim()}>
      <h2>{title}</h2>
      {action && <div className="section-header-action">{action}</div>}
    </div>
  );
};

