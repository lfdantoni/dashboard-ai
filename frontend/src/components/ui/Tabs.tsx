import { ReactNode } from 'react';
import clsx from 'clsx';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TAB_BASE_CLASSES = 'text-gray-500 cursor-pointer pb-2 font-medium transition-colors duration-200 hover:text-primary';
const TAB_ACTIVE_CLASSES = 'text-primary border-b-2 border-primary mb-[-0.6rem]';

export const Tabs = ({ items, activeTab, onTabChange, className }: TabsProps) => {
  return (
    <div className={clsx('flex gap-6 mb-8 border-b border-gray-300 pb-2', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={clsx(
            TAB_BASE_CLASSES,
            activeTab === item.id && TAB_ACTIVE_CLASSES
          )}
          onClick={() => onTabChange(item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

