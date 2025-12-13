import { ReactNode } from 'react';
import clsx from 'clsx';

export interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, action, className }: SectionHeaderProps) => {
  return (
    <div className={clsx('flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4', className)}>
      <h2 className="m-0 text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
      {action && <div className="text-primary cursor-pointer font-medium transition-colors duration-200 hover:text-[#005a63] text-sm sm:text-base">{action}</div>}
    </div>
  );
};

