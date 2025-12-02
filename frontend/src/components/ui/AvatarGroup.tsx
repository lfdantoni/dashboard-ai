import clsx from 'clsx';
import { Avatar } from './Avatar';

export interface AvatarGroupProps {
  avatars: Array<{ src?: string; alt?: string }>;
  maxVisible?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  className?: string;
}

export const AvatarGroup = ({ 
  avatars, 
  maxVisible = 3, 
  size = 'medium',
  showCount = true,
  className 
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <div className={clsx('flex items-center', className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className={clsx(index > 0 && '-ml-2.5')}
        />
      ))}
      {remainingCount > 0 && showCount && (
        <Avatar size={size} className="-ml-2.5 bg-accent text-black font-semibold">
          +{remainingCount}
        </Avatar>
      )}
    </div>
  );
};

