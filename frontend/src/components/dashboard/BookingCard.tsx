import { Edit2, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '../ui/Card';
import { AvatarGroup } from '../ui/AvatarGroup';
import { Badge } from '../ui/Badge';

export interface BookingCardProps {
  title: string;
  time: string;
  status?: 'active' | 'pending' | 'completed';
  tags?: Array<{ label: string; variant?: 'default' | 'yellow' | 'pink' | 'green' | 'blue' }>;
  participants?: Array<{ src?: string; alt?: string }>;
  onEdit?: () => void;
  onView?: () => void;
  className?: string;
}

const BOOKING_CARD_BASE_CLASSES = 'rounded-2xl p-5 flex flex-col gap-4';

export const BookingCard = ({ 
  title, 
  time, 
  status = 'active',
  tags = [],
  participants = [],
  onEdit,
  onView,
  className 
}: BookingCardProps) => {
  return (
    <Card className={clsx(BOOKING_CARD_BASE_CLASSES, className)}>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-base">{title}</span>
        {status === 'active' && (
          <div className="w-2.5 h-2.5 bg-[#A7F3D0] rounded-full" />
        )}
      </div>
      <div className="text-sm text-gray-500">{time}</div>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} variant={tag.variant || 'default'}>
              {tag.label}
            </Badge>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-2">
        {participants.length > 0 && (
          <AvatarGroup 
            avatars={participants} 
            maxVisible={2}
            size="medium"
          />
        )}
        <div className="flex gap-2">
          {onEdit && (
            <button 
              className="p-1.5 rounded-full border border-gray-200 bg-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
              onClick={onEdit}
              aria-label="Edit booking"
            >
              <Edit2 size={14} color="#888" />
            </button>
          )}
          {onView && (
            <button 
              className="p-1.5 rounded-full bg-primary border-none cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#005a63]"
              onClick={onView}
              aria-label="View booking"
            >
              <ArrowUpRight size={14} color="white" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

