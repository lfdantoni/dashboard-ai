import { useState, useRef, useEffect } from 'react';
import { Mail, Bell } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import './UserMenu.css';

export interface UserMenuProps {
  userName: string;
  userRole?: string;
  userAvatar?: string;
  onLogout: () => void;
  className?: string;
}

export const UserMenu = ({ 
  userName, 
  userRole = 'Super Admin',
  userAvatar,
  onLogout,
  className = '' 
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
    <div className={`user-profile pos-relative ${className}`.trim()} ref={menuRef}>
      <Mail size={20} color="#888" />
      <Bell size={20} color="#888" />
      <div 
        className="user-profile-name" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-name">{userName}</div>
        <div className="user-role">{userRole}</div>
      </div>
      <Avatar
        src={userAvatar}
        alt={userName}
        size="medium"
        className="user-profile-avatar"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="user-menu">
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

