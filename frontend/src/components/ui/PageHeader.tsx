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
    <div className={clsx('flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6', className)}>
      <div>
        <h1 className="m-0 text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 mb-0 text-sm sm:text-base text-gray-500">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2 w-full sm:w-auto">{action}</div>}
    </div>
  );
};

