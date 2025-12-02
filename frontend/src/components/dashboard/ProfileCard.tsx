import { RotateCw, Star, Users, CheckCircle, Trophy } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';

export interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  stats?: Array<{ icon: React.ReactNode; value: number; color?: string }>;
  onRefresh?: () => void;
  className?: string;
}

const DEFAULT_STATS = [
  { icon: <Users size={14} color="#FF6B6B" />, value: 11 },
  { icon: <CheckCircle size={14} color="#FF6B6B" />, value: 56 },
  { icon: <Trophy size={14} color="#FF6B6B" />, value: 12 },
] as const;

const PROFILE_CARD_BASE_CLASSES = 'flex flex-col items-center text-center row-span-2';

export const ProfileCard = ({ 
  name, 
  role, 
  avatar,
  stats = [],
  onRefresh,
  className 
}: ProfileCardProps) => {
  const displayStats = stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <Card className={clsx(PROFILE_CARD_BASE_CLASSES, className)}>
      <div className="w-full flex justify-between items-center mb-4">
        <span className="font-semibold">Profile</span>
        {onRefresh && (
          <button 
            className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center"
            onClick={onRefresh}
            aria-label="Refresh profile"
          >
            <RotateCw size={16} color="#888" />
          </button>
        )}
      </div>
      
      <div className="w-[100px] h-[100px] rounded-full border-4 border-gray-200 relative flex justify-center items-center mb-4">
        <div className="absolute top-[-4px] left-[-4px] w-[100px] h-[100px] rounded-full border-4 border-transparent border-t-[#FF6B6B] border-r-[#FF6B6B] rotate-[-45deg]"></div>
        <Avatar 
          src={avatar}
          alt={name}
          size="large"
          className="w-[84px] h-[84px] z-[1]"
        />
        <div className="absolute bottom-[5px] right-[5px] bg-gray-900 rounded-full p-1 flex z-[2]">
          <Star size={10} fill="white" color="white" />
        </div>
      </div>

      <div className="text-lg font-bold mt-2">{name}</div>
      <div className="text-sm text-gray-500 mb-8">{role}</div>

      <div className="flex gap-4 w-full justify-center">
        {displayStats.map((stat, index) => (
          <div key={index} className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-xl px-3 py-2 flex items-center gap-2 font-semibold text-sm">
            {stat.icon}
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

