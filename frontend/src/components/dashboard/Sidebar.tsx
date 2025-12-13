import clsx from 'clsx';
import { LayoutDashboard, Users, FileText, Settings, X } from 'lucide-react';

export interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const SIDEBAR_BASE_CLASSES = 'bg-white flex flex-col items-center pt-4 lg:pt-8 border-r border-[#eef2f6] z-10 h-full w-[80px]';

export const Sidebar = ({ className, onClose }: SidebarProps) => {
  return (
    <aside className={clsx(SIDEBAR_BASE_CLASSES, className)}>
      {/* Mobile Close Button */}
      {onClose && (
        <div className="flex justify-end w-full px-2 mb-4 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="w-10 h-10 bg-gray-900 rounded-full mb-8 flex items-center justify-center text-white">
        <div className="w-5 h-5 bg-white rounded-full" style={{ clipPath: 'circle(70% at 30% 30%)' }}></div>
      </div>
      <div className="flex flex-col gap-8 text-gray-500">
        <LayoutDashboard size={24} color="#006D77" />
        <Users size={24} />
        <FileText size={24} />
        <Settings size={24} />
      </div>
    </aside>
  );
};

