import { ReactNode } from 'react';
import './Tabs.css';

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

export const Tabs = ({ items, activeTab, onTabChange, className = '' }: TabsProps) => {
  return (
    <div className={`tabs ${className}`.trim()}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`tab ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

