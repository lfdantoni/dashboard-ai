import { ReactNode } from 'react';
import clsx from 'clsx';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, subtitle, action, className }: PageHeaderProps) => {
  return (
    <div className={clsx('flex justify-between items-center mb-6', className)}>
      <div>
        <h1 className="m-0 text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 mb-0 text-base text-gray-500">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
};

