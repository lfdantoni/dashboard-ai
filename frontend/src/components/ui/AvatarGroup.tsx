import { Avatar } from './Avatar';
import './AvatarGroup.css';

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
  className = '' 
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <div className={`avatar-group ${className}`.trim()}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className={index > 0 ? 'avatar-overlap' : ''}
        />
      ))}
      {remainingCount > 0 && showCount && (
        <Avatar size={size} className="avatar-overlap avatar-count">
          +{remainingCount}
        </Avatar>
      )}
    </div>
  );
};

