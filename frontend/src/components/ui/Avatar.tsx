import { ReactNode } from 'react';
import clsx from 'clsx';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  className?: string;
}

const BASE_CLASSES = 'rounded-full object-cover border-2 border-white flex items-center justify-center';

const SIZE_CLASSES = {
  small: 'w-6 h-6 text-[0.7rem]',
  medium: 'w-8 h-8 text-sm',
  large: 'w-12 h-12 text-base',
} as const;

export const Avatar = ({ src, alt = 'avatar', size = 'medium', children, className }: AvatarProps) => {
  const avatarClasses = clsx(
    BASE_CLASSES,
    SIZE_CLASSES[size],
    className
  );

  if (children) {
    return (
      <div className={avatarClasses}>
        {children}
      </div>
    );
  }

  return (
    <img 
      src={src || 'https://i.pravatar.cc/100?img=1'} 
      alt={alt} 
      className={avatarClasses}
    />
  );
};

