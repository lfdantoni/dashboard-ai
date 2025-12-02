import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Mail, Bell } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export interface UserMenuProps {
  userName: string;
  userRole?: string;
  userAvatar?: string;
  onLogout: () => void;
  className?: string;
}

const USER_MENU_BASE_CLASSES = 'flex items-center justify-end gap-4 mb-12 relative';

export const UserMenu = ({ 
  userName, 
  userRole = 'Super Admin',
  userAvatar,
  onLogout,
  className 
}: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={clsx(USER_MENU_BASE_CLASSES, className)} ref={menuRef}>
      <Mail size={20} color="#888" />
      <Bell size={20} color="#888" />
      <div 
        className="text-right cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-bold text-sm">{userName}</div>
        <div className="text-[0.7rem] text-gray-500">{userRole}</div>
      </div>
      <Avatar
        src={userAvatar}
        alt={userName}
        size="medium"
        className="w-10 h-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute top-10 right-0 bg-white shadow-[0_8px_16px_rgba(0,0,0,0.08)] rounded-xl p-2 min-w-[160px] z-20 border border-[#eef2f6]">
          <button 
            className="w-full text-left bg-transparent border-none px-3 py-2.5 rounded-lg cursor-pointer text-[#2c3e50] transition-colors duration-200 hover:bg-[#f8fafc]"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

