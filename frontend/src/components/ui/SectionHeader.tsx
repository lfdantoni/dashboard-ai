import { ReactNode } from 'react';
import clsx from 'clsx';

export interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, action, className }: SectionHeaderProps) => {
  return (
    <div className={clsx('flex justify-between items-center mb-4', className)}>
      <h2 className="m-0 text-2xl font-semibold text-gray-900">{title}</h2>
      {action && <div className="text-primary cursor-pointer font-medium transition-colors duration-200 hover:text-[#005a63]">{action}</div>}
    </div>
  );
};

