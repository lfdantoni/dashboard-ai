import { ReactNode } from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  className?: string;
}

export const Avatar = ({ src, alt = 'avatar', size = 'medium', children, className = '' }: AvatarProps) => {
  const sizeClass = `avatar-${size}`;
  const combinedClassName = `avatar ${sizeClass} ${className}`.trim();

  if (children) {
    return (
      <div className={combinedClassName}>
        {children}
      </div>
    );
  }

  return (
    <img 
      src={src || 'https://i.pravatar.cc/100?img=1'} 
      alt={alt} 
      className={combinedClassName}
    />
  );
};

