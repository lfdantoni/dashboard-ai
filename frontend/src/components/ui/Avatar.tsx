import { ReactNode, useState, useEffect } from 'react';
import clsx from 'clsx';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const BASE_CLASSES = 'rounded-full object-cover border-2 border-white flex items-center justify-center';
const DEFAULT_AVATAR = 'https://i.pravatar.cc/100?img=1';

const SIZE_CLASSES = {
  small: 'w-6 h-6 text-[0.7rem]',
  medium: 'w-8 h-8 text-sm',
  large: 'w-12 h-12 text-base',
} as const;

export const Avatar = ({ src, alt = 'avatar', size = 'medium', children, className, onClick }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Resetear el error cuando cambia el src
  useEffect(() => {
    setHasError(false);
  }, [src]);
  
  const avatarClasses = clsx(
    BASE_CLASSES,
    SIZE_CLASSES[size],
    className
  );

  const handleImageError = () => {
    // Solo activar error si había un src válido
    if (src && src.trim()) {
      setHasError(true);
    }
  };

  if (children) {
    return (
      <div className={clsx(avatarClasses, onClick && 'cursor-pointer')} onClick={onClick}>
        {children}
      </div>
    );
  }

  // Determinar qué imagen mostrar:
  // 1. Si hay src válido y no hay error → usar src del usuario
  // 2. Si no hay src o hay error → usar imagen por defecto
  const hasValidSrc = src && src.trim();
  const imageSrc = (hasValidSrc && !hasError) ? src : DEFAULT_AVATAR;

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={clsx(avatarClasses, onClick && 'cursor-pointer')}
      onError={handleImageError}
      onClick={onClick}
      loading={hasValidSrc ? "eager" : "lazy"}
    />
  );
};

