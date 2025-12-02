import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';
import './Sidebar.css';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      <div className="logo">
        <div className="logo-icon"></div>
      </div>
      <div className="sidebar-icons">
        <LayoutDashboard size={24} color="#006D77" />
        <Users size={24} />
        <FileText size={24} />
        <Settings size={24} />
      </div>
    </aside>
  );
};

